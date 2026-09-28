
import { Menu, ShieldCheck } from "lucide-react";

export default function ChatHeader({ onToggleSidebar }) {
  return (
    <header className="chat-header">
      <div className="chat-header-left">
        <button
          className="header-icon-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="header-avatar">
          <span>N</span>
          <i />
        </div>

        <div className="header-info">
          <div className="header-name-row">
            <strong>Nova AI Assistant</strong>
            <span className="ai-tag">AI POWERED</span>
          </div>
          <div className="header-status">
            <span className="status-dot" />
            Online <span>·</span> Here to help, 24/7
          </div>
        </div>
      </div>

      <div className="chat-header-right">
        <div className="secure-chip">
          <ShieldCheck size={14} />
          <span>Private & secure</span>
        </div>
      </div>
    </header>
  );
}
