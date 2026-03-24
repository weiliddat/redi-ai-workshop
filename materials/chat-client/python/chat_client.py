import asyncio
import json
import os
import sys

import websockets


SERVER_URL = os.environ.get("SERVER_URL", "ws://localhost:3000")


async def read_messages(ws):
    async for raw in ws:
        msg = json.loads(raw)
        match msg.get("type"):
            case "message":
                print(f"[{msg['name']}] {msg['text']}")
            case "join":
                print(f"--- {msg['name']} joined ---")
            case "leave":
                print(f"--- {msg['name']} left ---")
            case "error":
                print(f"Error: {msg['message']}")


async def send_messages(ws):
    loop = asyncio.get_event_loop()
    while True:
        text = await loop.run_in_executor(None, sys.stdin.readline)
        if not text:
            break
        text = text.strip()
        if text:
            await ws.send(json.dumps({"type": "message", "text": text}))


async def main():
    name = input("Enter your name: ").strip()
    if not name:
        print("Name cannot be empty.")
        return

    url = f"{SERVER_URL}?name={name}"

    try:
        async with websockets.connect(url) as ws:
            read_task = asyncio.create_task(read_messages(ws))
            send_task = asyncio.create_task(send_messages(ws))

            done, pending = await asyncio.wait(
                [read_task, send_task], return_when=asyncio.FIRST_COMPLETED
            )
            for task in pending:
                task.cancel()

            for task in done:
                if task.exception():
                    raise task.exception()

    except websockets.ConnectionClosed:
        print("\nConnection closed.")
    except (OSError, websockets.WebSocketException) as e:
        print(f"\nConnection error: {e}")


if __name__ == "__main__":
    asyncio.run(main())
