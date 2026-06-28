import WebSocket from "ws";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3999;
const TIMEOUT_MS = 3000;
let serverProcess;
let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.log(`  ✗ ${label}`);
    failed++;
  }
}

function isValidTimestamp(ts) {
  return typeof ts === "string" && !Number.isNaN(Date.parse(ts));
}

function withTimeout(promise, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout: ${label}`)), TIMEOUT_MS)
    ),
  ]);
}

function connectClient(name) {
  return withTimeout(
    new Promise((resolve, reject) => {
      const ws = new WebSocket(
        `ws://localhost:${PORT}?name=${encodeURIComponent(name)}`
      );
      ws.on("open", () => resolve(ws));
      ws.on("error", reject);
    }),
    `connect ${name}`
  );
}

function nextMessage(ws) {
  return withTimeout(
    new Promise((resolve) => {
      ws.once("message", (data) => resolve(JSON.parse(data)));
    }),
    "nextMessage"
  );
}

function waitForClose(ws) {
  return withTimeout(
    new Promise((resolve) => {
      if (ws.readyState === WebSocket.CLOSED) return resolve();
      ws.on("close", () => resolve());
    }),
    "waitForClose"
  );
}

/** Connect and drain the own-join event. */
async function connectAndJoin(name) {
  const ws = await connectClient(name);
  await nextMessage(ws); // own join
  return ws;
}

async function startServer() {
  return withTimeout(
    new Promise((resolve, reject) => {
      serverProcess = spawn("node", ["server.js"], {
        cwd: __dirname,
        env: { ...process.env, PORT: String(PORT) },
        stdio: "pipe",
      });
      serverProcess.stderr.on("data", (d) => process.stderr.write(d));
      serverProcess.stdout.on("data", (data) => {
        if (data.toString().includes("listening")) resolve();
      });
      serverProcess.on("error", reject);
    }),
    "startServer"
  );
}

async function stopServer() {
  if (serverProcess) {
    serverProcess.kill();
    await new Promise((r) => serverProcess.on("close", r));
  }
}

function closeAll(...clients) {
  for (const ws of clients) ws.close();
  return Promise.all(clients.map((ws) => waitForClose(ws)));
}

// ---- Tests ----

async function testJoinAndMessage() {
  console.log("\nTest: join and message");

  const alice = await connectClient("Alice");
  const joinMsg = await nextMessage(alice);
  assert(joinMsg.type === "join" && joinMsg.name === "Alice", "receives own join event");
  assert(isValidTimestamp(joinMsg.timestamp), "join has valid timestamp");

  // Register listener before Bob connects to avoid race
  const aliceSeeBobJoin = nextMessage(alice);
  const bob = await connectClient("Bob");
  await nextMessage(bob); // drain Bob's own join
  const bobJoin = await aliceSeeBobJoin;
  assert(bobJoin.type === "join" && bobJoin.name === "Bob", "Alice sees Bob join");

  // Register listeners before sending
  const aliceEchoP = nextMessage(alice);
  const bobReceivedP = nextMessage(bob);
  alice.send(JSON.stringify({ type: "message", text: "hello" }));
  const [aliceEcho, bobReceived] = await Promise.all([aliceEchoP, bobReceivedP]);
  assert(aliceEcho.type === "message" && aliceEcho.name === "Alice" && aliceEcho.text === "hello", "sender gets own message back");
  assert(bobReceived.type === "message" && bobReceived.name === "Alice" && bobReceived.text === "hello", "other client receives message");
  assert(isValidTimestamp(aliceEcho.timestamp), "message has valid timestamp");

  await closeAll(alice, bob);
}

async function testDuplicateName() {
  console.log("\nTest: duplicate name rejected");

  const alice = await connectAndJoin("Charlie");

  const dup = new WebSocket(`ws://localhost:${PORT}?name=Charlie`);
  const closeP = waitForClose(dup);
  const errorMsg = await nextMessage(dup);
  assert(errorMsg.type === "error" && errorMsg.message === "name already taken", "gets error for duplicate name");
  await closeP;
  assert(dup.readyState === WebSocket.CLOSED, "duplicate connection closed by server");

  // Verify existing client still works after duplicate rejection
  const listP = nextMessage(alice);
  alice.send(JSON.stringify({ type: "list" }));
  const list = await listP;
  assert(list.type === "list" && list.names.includes("Charlie"), "existing client unaffected by duplicate rejection");

  await closeAll(alice);
}

async function testNoName() {
  console.log("\nTest: no name rejected");

  const ws = new WebSocket(`ws://localhost:${PORT}`);
  const closeP = waitForClose(ws);
  const errorMsg = await nextMessage(ws);
  assert(errorMsg.type === "error" && errorMsg.message === "name is required", "gets error when no name");
  await closeP;
  assert(ws.readyState === WebSocket.CLOSED, "no-name connection closed by server");
}

async function testNick() {
  console.log("\nTest: nick change");

  const alice = await connectAndJoin("Dave");

  const aliceSeeEveJoin = nextMessage(alice);
  const bob = await connectAndJoin("Eve");
  await aliceSeeEveJoin;

  // Register listeners before sending nick
  const aliceNickP = nextMessage(alice);
  const bobNickP = nextMessage(bob);
  alice.send(JSON.stringify({ type: "nick", name: "DaveNew" }));
  const [aliceNick, bobNick] = await Promise.all([aliceNickP, bobNickP]);
  assert(aliceNick.type === "nick" && aliceNick.oldName === "Dave" && aliceNick.name === "DaveNew", "sender gets nick broadcast");
  assert(bobNick.type === "nick" && bobNick.oldName === "Dave" && bobNick.name === "DaveNew", "other client gets nick broadcast");

  bob.send(JSON.stringify({ type: "nick", name: "DaveNew" }));
  const nickError = await nextMessage(bob);
  assert(nickError.type === "error" && nickError.message === "name already taken", "nick to taken name returns error");

  // Verify nick change persists in server state
  const listP = nextMessage(alice);
  alice.send(JSON.stringify({ type: "list" }));
  const list = await listP;
  assert(
    list.names.includes("DaveNew") && !list.names.includes("Dave"),
    "list reflects new name after nick change"
  );

  // Verify failed nick didn't break the connection
  const listP2 = nextMessage(bob);
  bob.send(JSON.stringify({ type: "list" }));
  const list2 = await listP2;
  assert(list2.type === "list", "connection still works after failed nick");

  await closeAll(alice, bob);
}

async function testNickNoName() {
  console.log("\nTest: nick without name");

  const alice = await connectAndJoin("NickTest");

  alice.send(JSON.stringify({ type: "nick" }));
  const err = await nextMessage(alice);
  assert(err.type === "error" && err.message === "name is required", "nick without name returns error");

  await closeAll(alice);
}

async function testList() {
  console.log("\nTest: list users");

  const alice = await connectAndJoin("Frank");
  const aliceSeeGraceJoin = nextMessage(alice);
  const bob = await connectAndJoin("Grace");
  await aliceSeeGraceJoin;

  const listP = nextMessage(alice);
  alice.send(JSON.stringify({ type: "list" }));
  const list = await listP;
  assert(list.type === "list", "list response type correct");
  assert(
    Array.isArray(list.names) &&
      list.names.length === 2 &&
      list.names.includes("Frank") &&
      list.names.includes("Grace"),
    "list contains exactly both users"
  );
  assert(isValidTimestamp(list.timestamp), "list has valid timestamp");

  await closeAll(alice, bob);
}

async function testLeave() {
  console.log("\nTest: leave event");

  const alice = await connectAndJoin("Hank");
  const aliceSeeIvyJoin = nextMessage(alice);
  const bob = await connectAndJoin("Ivy");
  await aliceSeeIvyJoin;

  const leaveP = nextMessage(alice);
  bob.close();
  const leaveMsg = await leaveP;
  assert(leaveMsg.type === "leave" && leaveMsg.name === "Ivy", "leave event on disconnect");
  assert(isValidTimestamp(leaveMsg.timestamp), "leave has valid timestamp");

  await closeAll(alice);
}

async function testInvalidJSON() {
  console.log("\nTest: invalid JSON");

  const alice = await connectAndJoin("JSONTest");

  alice.send("{bad json");
  const err = await nextMessage(alice);
  assert(err.type === "error" && err.message === "invalid JSON", "invalid JSON returns error");

  // Connection should still be open — verify by sending a valid list request
  const listP = nextMessage(alice);
  alice.send(JSON.stringify({ type: "list" }));
  const list = await listP;
  assert(list.type === "list", "connection still works after invalid JSON");

  await closeAll(alice);
}

async function testUnknownType() {
  console.log("\nTest: unknown message type");

  const alice = await connectAndJoin("TypeTest");

  alice.send(JSON.stringify({ type: "wat" }));
  const err = await nextMessage(alice);
  assert(err.type === "error" && err.message === "unknown type: wat", "unknown type returns error");

  // Connection should still be open
  const listP = nextMessage(alice);
  alice.send(JSON.stringify({ type: "list" }));
  const list = await listP;
  assert(list.type === "list", "connection still works after unknown type");

  await closeAll(alice);
}

// ---- Run ----

try {
  await startServer();
  console.log("Server started on port", PORT);

  await testJoinAndMessage();
  await testDuplicateName();
  await testNoName();
  await testNick();
  await testNickNoName();
  await testList();
  await testLeave();
  await testInvalidJSON();
  await testUnknownType();

  console.log(`\n${passed} passed, ${failed} failed`);
} catch (e) {
  console.error("\nTest error:", e.message);
  failed++;
} finally {
  await stopServer();
  process.exit(failed > 0 ? 1 : 0);
}
