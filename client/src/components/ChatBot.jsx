import { useState } from "react";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [open, setOpen] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setReply(data.reply);
    setMessage("");
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
          onClick={() => setOpen(!open)}
        >
          💬
        </button>
      </div>
      {open && (
        <div className="fixed bottom-20 right-4 bg-white border border-gray-300 rounded-lg shadow-lg w-80 p-4 z-50">
          <h2 className="text-lg font-semibold mb-2">Real Estate AI</h2>
          <textarea
            rows="2"
            className="w-full border p-2 rounded"
            placeholder="Ask a real estate question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded mt-2"
            onClick={handleSend}
          >
            Send
          </button>
          {reply && (
            <div className="mt-3 text-sm bg-gray-100 p-2 rounded">
              <strong>AI:</strong> {reply}
            </div>
          )}
        </div>
      )}
    </>
  );
}
