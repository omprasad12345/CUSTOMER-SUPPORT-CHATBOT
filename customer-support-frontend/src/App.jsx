
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  CircleHelp,
  PackageCheck,
  RefreshCw,
  Sparkles,
  WifiOff
} from "lucide-react";

import Sidebar from "./components/Sidebar.jsx";
import ChatHeader from "./components/ChatHeader.jsx";
import ChatMessage from "./components/chatMessage.jsx";
import ChatInput from "./components/ChatInput.jsx";

import {
  sendChatMessage,
  getChatHistory
} from "./services/chatService.js";

import "./App.css";

const suggestions = [
  {
    icon: PackageCheck,
    title: "Track my order",
    description: "Get help with your order status",
    prompt: "How can I track my order?"
  },
  {
    icon: RefreshCw,
    title: "Returns & refunds",
    description: "Learn about returns and refunds",
    prompt: "How can I return a product or request a refund?"
  },
  {
    icon: CircleHelp,
    title: "Product support",
    description: "Get answers to product questions",
    prompt: "I need help with a product."
  }
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    refreshHistory();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function refreshHistory() {
    try {
      const data = await getChatHistory();
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Unable to load chat history:", err);
    }
  }

  async function handleSend(text = input) {
    const customerMessage = text.trim();

    if (!customerMessage || loading) return;

    setError("");
    setInput("");
    setSelectedId(null);

    const userMessage = {
      id: crypto.randomUUID(),
      customerMessage,
      createdAt: new Date().toISOString(),
      type: "user"
    };

    setMessages((previous) => [...previous, userMessage]);
    setLoading(true);

    try {
      const data = await sendChatMessage(customerMessage);

      const assistantMessage = {
        id: data.id ?? crypto.randomUUID(),
        botResponse: data.botResponse,
        createdAt: data.createdAt ?? new Date().toISOString(),
        type: "assistant"
      };

      setMessages((previous) => [...previous, assistantMessage]);
      await refreshHistory();
    } catch (err) {
      console.error("Chat request error:", err);
      setError(
        "We couldn't reach Nova AI. Check that the backend is running, then try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleNewChat() {
    setMessages([]);
    setInput("");
    setError("");
    setSelectedId(null);
  }

  function handleSelectHistory(item) {
    setSelectedId(item.id);
    setMessages([
      {
        id: `${item.id}-customer`,
        customerMessage: item.customerMessage,
        createdAt: item.createdAt,
        type: "user"
      },
      {
        id: `${item.id}-assistant`,
        botResponse: item.botResponse,
        createdAt: item.createdAt,
        type: "assistant"
      }
    ]);
    setError("");
  }

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          className="mobile-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
        history={history}
        onSelectHistory={handleSelectHistory}
        selectedId={selectedId}
      />

      <main className="main-panel">
        <ChatHeader
          onToggleSidebar={() => setSidebarOpen((value) => !value)}
        />

        <section className="chat-area">
          {messages.length === 0 ? (
            <div className="welcome-screen">
              <div className="welcome-art">
                <div className="welcome-art-glow" />
                <div className="welcome-art-orbit orbit-a" />
                <div className="welcome-art-orbit orbit-b" />
                <div className="welcome-art-core">
                  <Sparkles size={30} />
                </div>
                <span className="art-spark spark-a">✦</span>
                <span className="art-spark spark-b">✧</span>
                <span className="art-spark spark-c">✦</span>
              </div>

              <div className="welcome-eyebrow">
                <span />
                YOUR INTELLIGENT SUPPORT PARTNER
                <span />
              </div>

              <h1>
                How can we help
                <br />
                <em>you today?</em>
              </h1>

              <p className="welcome-description">
                Get instant answers, helpful guidance, and personalized
                support. Just tell Nova what you need.
              </p>

              <div className="suggestion-heading">
                <span>GET STARTED</span>
                <span className="suggestion-heading-line" />
              </div>

              <div className="suggestion-grid">
                {suggestions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      className="suggestion-card"
                      onClick={() => handleSend(item.prompt)}
                    >
                      <div className="suggestion-icon">
                        <Icon size={20} />
                      </div>
                      <div className="suggestion-text">
                        <strong>{item.title}</strong>
                        <span>{item.description}</span>
                      </div>
                      <ArrowUpRight
                        className="suggestion-arrow"
                        size={16}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="welcome-trust">
                <span><i className="trust-dot" /> AI assistant online</span>
                <i className="trust-separator" />
                <span>Secure customer support</span>
              </div>
            </div>
          ) : (
            <div className="messages-container">
              <div className="conversation-divider">
                <span>CONVERSATION</span>
              </div>

              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {loading && (
                <div className="message-row message-assistant">
                  <div className="message-avatar">
                    <span className="mini-nova">N</span>
                  </div>
                  <div className="typing-content">
                    <span>Nova is preparing a response</span>
                    <div className="typing-indicator">
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="chat-error">
                  <WifiOff size={17} />
                  <span>{error}</span>
                  <button onClick={() => setError("")}>Dismiss</button>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          )}
        </section>

        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => handleSend()}
          loading={loading}
        />
      </main>
    </div>
  );
}
