
import { ArrowUp, Paperclip, Sparkles } from "lucide-react";

export default function ChatInput({ value, onChange, onSend, loading }) {
  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }

  return (
    <div className="chat-input-section">
      <div className="chat-input-card">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Nova anything..."
          rows={2}
          disabled={loading}
          aria-label="Enter your message"
        />

        <div className="input-bottom-row">
          <div className="input-bottom-left">
            <button
              className="input-attachment"
              type="button"
              title="Attachments are not available yet"
              disabled
              aria-label="Attachments unavailable"
            >
              <Paperclip size={16} />
            </button>
            <span className="input-ai-hint">
              <Sparkles size={12} />
              Powered by Gemini AI
            </span>
          </div>

          <div className="input-bottom-right">
            <span className="input-enter-hint">Enter to send</span>
            <button
              className="send-message-btn"
              type="button"
              onClick={onSend}
              disabled={!value.trim() || loading}
              aria-label="Send message"
            >
              <ArrowUp size={19} />
            </button>
          </div>
        </div>
      </div>

      <div className="input-legal">
        AI responses may not always be accurate. Verify important information.
      </div>
    </div>
  );
}
