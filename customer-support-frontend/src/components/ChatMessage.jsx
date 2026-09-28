
import { Bot, CheckCheck, Copy, Sparkles } from "lucide-react";

function formatTime(date) {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function ChatMessage({ message }) {
  const isUser = message.type === "user";
  const content = isUser
    ? message.customerMessage
    : message.botResponse;

  async function copyResponse() {
    try {
      await navigator.clipboard.writeText(content || "");
    } catch (error) {
      console.error("Unable to copy response:", error);
    }
  }

  return (
    <div className={`message-row ${isUser ? "message-user" : "message-assistant"}`}>
      {!isUser && (
        <div className="message-avatar">
          <Bot size={18} />
        </div>
      )}

      <div className={`message-body ${isUser ? "message-body-user" : ""}`}>
        {!isUser && (
          <div className="message-author">
            <strong>Nova AI</strong>
            <span className="message-ai-label">
              <Sparkles size={10} /> Assistant
            </span>
          </div>
        )}

        <div className={`message-bubble ${isUser ? "bubble-user" : "bubble-assistant"}`}>
          <p>{content}</p>
        </div>

        <div className="message-metadata">
          <span>{formatTime(message.createdAt)}</span>
          {isUser ? (
            <CheckCheck size={14} className="message-read-icon" />
          ) : (
            <button
              className="message-copy"
              onClick={copyResponse}
              title="Copy response"
              aria-label="Copy response"
            >
              <Copy size={13} />
            </button>
          )}
        </div>
      </div>

      {isUser && <div className="user-message-avatar">You</div>}
    </div>
  );
}
