"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);

    const res = await fetch("https://biobankingai.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        content: `Best Sample: ${data.best_sample}
Confidence: ${data.confidence}
Justification: ${data.justification}`,
      },
    ]);

    setInput("");
  };

  const toggleExpand = (idx: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="relative min-h-screen p-6">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/background.jpg')" }}
      ></div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header content stays CENTERED */}
        <div className="text-center">
          <img src="/logo.png" alt="BEACON Logo" className="w-32 mx-auto mb-4" />

          <h1 className="text-5xl font-extrabold text-black-800 mb-2">BEACON</h1>

          <p className="text-lg text-black-700 mb-1 italic">
            (Biobank Ethical AI Compliance and Optimization Navigator)
          </p>
        </div>

        {/* Chat Box */}
        <div className="bg-white rounded-xl shadow-lg p-4 space-y-4 mt-8">
          <div className="flex flex-col gap-4">
            {messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              const isExpanded = expandedIndexes.includes(idx);
              const shouldTrim = isUser && msg.content.length > 150 && !isExpanded;
              const displayContent = shouldTrim
                ? `${msg.content.slice(0, 150)}...`
                : msg.content;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    isUser
                      ? "bg-blue-200 text-black self-start"
                      : "bg-green-200 text-black self-start"
                  } whitespace-pre-line`}
                >
                  <strong>{isUser ? "You: " : "BEACON: "}</strong>
                  {displayContent}
                  {shouldTrim && (
                    <button
                      className="ml-2 text-blue-600 underline"
                      onClick={() => toggleExpand(idx)}
                    >
                      Show More
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex space-x-2">
            <input
              className="flex-1 border p-2 rounded-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your research proposal..."
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
