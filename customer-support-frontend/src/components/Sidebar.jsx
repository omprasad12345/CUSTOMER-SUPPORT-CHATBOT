
import {
  Bot,
  Headset,
  MessageSquare,
  Plus,
  Search,
  Settings,
  X
} from "lucide-react";

export default function Sidebar({
  open,
  onClose,
  onNewChat,
  history,
  onSelectHistory,
  selectedId
}) {
  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="sidebar-brand">
        <div className="brand-mark">
          <Headset size={22} />
        </div>
        <div className="brand-name">
          <strong>Nova<span>Support</span></strong>
          <small>INTELLIGENT CUSTOMER CARE</small>
        </div>
        <button className="mobile-close" onClick={onClose} aria-label="Close sidebar">
          <X size={19} />
        </button>
      </div>

      <button className="new-chat-btn" onClick={onNewChat}>
        <Plus size={17} />
        <span>New conversation</span>
      </button>

      <div className="sidebar-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        <button className="sidebar-link active">
          <MessageSquare size={17} />
          <span>AI Assistant</span>
          <span className="active-indicator" />
        </button>
        <button className="sidebar-link" type="button" disabled>
          <Search size={17} />
          <span>Search conversations</span>
        </button>
      </nav>

      <div className="history-heading">
        <span className="sidebar-label">RECENT CONVERSATIONS</span>
        <span className="history-count">{history.length}</span>
      </div>

      <div className="sidebar-history">
        {history.length === 0 ? (
          <div className="history-empty">
            <MessageSquare size={18} />
            <p>No conversations yet</p>
            <span>Your chats will appear here.</span>
          </div>
        ) : (
          history.slice().reverse().map((item) => (
            <button
              key={item.id}
              className={`history-link ${
                selectedId === item.id ? "history-selected" : ""
              }`}
              onClick={() => onSelectHistory(item)}
              title={item.customerMessage}
            >
              <MessageSquare size={15} />
              <span>{item.customerMessage || "Customer conversation"}</span>
            </button>
          ))
        )}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-support-card">
          <div className="support-card-icon">
            <Bot size={19} />
          </div>
          <div className="support-card-copy">
            <strong>Nova AI is online</strong>
            <span>Ready to help you</span>
          </div>
          <span className="online-pulse" />
        </div>

        <button className="sidebar-link footer-link" type="button" disabled>
          <Settings size={17} />
          <span>Settings</span>
        </button>

        <div className="sidebar-profile">
          <div className="profile-avatar">G</div>
          <div className="profile-copy">
            <strong>Guest Customer</strong>
            <span>Customer account</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
