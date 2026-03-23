import { useState, useRef, useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (customText) => {
    const text = customText || input;
    if (!text.trim()) return;

    const updated = [...messages, { role: "user", text }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      setMessages([
        ...updated,
        { role: "ai", text: data.reply },
      ]);
    } catch (err) {
      setMessages([
        ...updated,
        { role: "ai", text: "Something went wrong 😓" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>🧠 DSA Instructor</h2>

        {/* Suggestions */}
        <div style={styles.suggestions}>
          <button onClick={() => sendMessage("Explain stack vs queue")}>
            Stack vs Queue
          </button>
          <button onClick={() => sendMessage("What is recursion?")}>
            Recursion
          </button>
          <button onClick={() => sendMessage("Time complexity of binary search")}>
            Binary Search
          </button>
        </div>

        {/* Chat */}
        <div style={styles.chatBox}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.message,
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                background:
                  msg.role === "user"
                    ? "#4f46e5"
                    : "#1f2937",
              }}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div style={styles.typing}>AI is typing...</div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <div style={styles.inputBox}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a DSA question..."
            style={styles.input}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button onClick={() => sendMessage()} style={styles.button}>
            ➤
          </button>
        </div>

        {/* Clear Chat */}
        <button onClick={() => setMessages([])} style={styles.clearBtn}>
          Clear Chat
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(to bottom right, #0f172a, #020617)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "420px",
    height: "650px",
    background: "rgba(17, 24, 39, 0.7)",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
  },
  title: {
    textAlign: "center",
    color: "white",
    marginBottom: "10px",
  },
  suggestions: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    marginBottom: "10px",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
  },
  message: {
    padding: "10px 14px",
    borderRadius: "14px",
    maxWidth: "75%",
    fontSize: "14px",
    color: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },
  typing: {
    color: "#9ca3af",
    fontSize: "13px",
  },
  inputBox: {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
  },
  clearBtn: {
    marginTop: "8px",
    padding: "6px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
  },
};

export default App;