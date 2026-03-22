# Chat Client — Python Skeleton
#
# This is a starting point. You'll use AI to help you fill in the missing parts.
#
# Before running:
#   pip install websockets
#
# To run:
#   python chat_client.py

import asyncio
import json

# TODO: import the websockets library


SERVER_URL = "ws://REPLACE_WITH_SERVER_URL"
MY_NAME = "REPLACE_WITH_YOUR_NAME"


async def main():
    # TODO: connect to the WebSocket server at SERVER_URL
    # TODO: send a join message or a first chat message
    # TODO: listen for incoming messages and print them
    # TODO: allow the user to type and send messages
    pass


if __name__ == "__main__":
    asyncio.run(main())
