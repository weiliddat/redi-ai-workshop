import test from "node:test";
import assert from "node:assert/strict";

import {
  buildConnectionUrl,
  createOutgoingMessage,
  describeChatEvent,
} from "../src/chat-protocol.js";

test("buildConnectionUrl adds the display name", () => {
  assert.equal(
    buildConnectionUrl("ws://localhost:3000", "Ada Lovelace"),
    "ws://localhost:3000/?name=Ada+Lovelace"
  );
});

test("buildConnectionUrl requires a server URL and display name", () => {
  assert.throws(() => buildConnectionUrl("", "Ada"), /Server URL is required/);
  assert.throws(() => buildConnectionUrl("ws://localhost:3000", ""), /Display name is required/);
});

test("createOutgoingMessage creates a chat message", () => {
  assert.deepEqual(createOutgoingMessage("  hello chat  "), {
    type: "message",
    text: "hello chat",
  });
});

test("createOutgoingMessage creates a nickname change", () => {
  assert.deepEqual(createOutgoingMessage("/nick Grace"), {
    type: "nick",
    name: "Grace",
  });
});

test("createOutgoingMessage creates a user list request", () => {
  assert.deepEqual(createOutgoingMessage("/users"), {
    type: "list",
  });
});

test("createOutgoingMessage ignores blank messages", () => {
  assert.equal(createOutgoingMessage("   "), null);
  assert.equal(createOutgoingMessage("/nick   "), null);
});

test("describeChatEvent describes server events", () => {
  assert.deepEqual(describeChatEvent({ type: "join", name: "Ada" }), {
    tone: "system",
    label: "System",
    text: "Ada joined the chat",
  });

  assert.deepEqual(describeChatEvent({ type: "message", name: "Ada", text: "Hi" }), {
    tone: "message",
    label: "Ada",
    text: "Hi",
  });

  assert.deepEqual(describeChatEvent({ type: "list", names: ["Ada", "Grace"] }), {
    tone: "system",
    label: "Online",
    text: "Ada, Grace",
  });
});
