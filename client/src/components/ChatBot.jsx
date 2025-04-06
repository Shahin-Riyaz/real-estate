import { useState } from "react";
import { FaPaperPlane, FaCommentDots } from "react-icons/fa";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { type: "user", text: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      const aiReply = { type: "ai", text: data.reply };
      setChatHistory((prev) => [...prev, aiReply]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { type: "ai", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
        >
          <FaCommentDots size={20} />
        </button>
      </div>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-28 right-5 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 flex flex-col gap-3 transition-all duration-300">
          <h2 className="text-lg font-bold text-[#10161c] ">Property Pal</h2>

          {/* Chat Scrollable History */}
          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`text-sm px-4 py-2 rounded-lg ${
                  msg.type === "user"
                    ? "bg-orange-100 self-end text-right text-[#10161c]"
                    : "bg-gray-100 self-start text-[#10161c]"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {typing && (
              <div className="text-sm text-gray-500 italic pl-1">Typing...</div>
            )}
          </div>

          {/* Message Input */}
          <textarea
            rows="2"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none transition"
            placeholder="Ask your real estate question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleSend}
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-lg transition duration-300"
          >
            <FaPaperPlane className="text-white" />
            Send
          </button>
        </div>
      )}
    </>
  );
}
