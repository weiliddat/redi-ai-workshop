export function buildConnectionUrl(serverUrl, displayName) {
  const trimmedUrl = serverUrl.trim();
  const trimmedName = displayName.trim();

  if (!trimmedUrl) {
    throw new Error("Server URL is required.");
  }

  if (!trimmedName) {
    throw new Error("Display name is required.");
  }

  const url = new URL(trimmedUrl);
  url.searchParams.set("name", trimmedName);
  return url.toString();
}

export function createOutgoingMessage(text) {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return null;
  }

  if (trimmedText === "/nick" || trimmedText.startsWith("/nick ")) {
    const name = trimmedText.slice("/nick".length).trim();
    return name ? { type: "nick", name } : null;
  }

  if (trimmedText === "/users") {
    return { type: "list" };
  }

  return { type: "message", text: trimmedText };
}

export function describeChatEvent(event) {
  switch (event.type) {
    case "join":
      return {
        tone: "system",
        label: "System",
        text: `${event.name} joined the chat`,
      };
    case "leave":
      return {
        tone: "system",
        label: "System",
        text: `${event.name} left the chat`,
      };
    case "message":
      return {
        tone: "message",
        label: event.name,
        text: event.text,
      };
    case "nick":
      return {
        tone: "system",
        label: "System",
        text: `${event.oldName} is now ${event.name}`,
      };
    case "list":
      return {
        tone: "system",
        label: "Online",
        text: event.names.length ? event.names.join(", ") : "No one is online",
      };
    case "error":
      return {
        tone: "error",
        label: "Error",
        text: event.message || "Something went wrong",
      };
    default:
      return {
        tone: "error",
        label: "Unknown event",
        text: JSON.stringify(event),
      };
  }
}
