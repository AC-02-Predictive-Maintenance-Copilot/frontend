import React, { useState } from "react";
import ChatCard from "@/components/ChatCard";
import ChatDesc from "@/components/ChatDesc";
import ChatBubble from "@/components/ChatBubble";

function ChatPage({ onSendChat, user }) {
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState("");

  const handleChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const handleSubmit = () => {
    if (currentInput.trim() === "") return;

    const userMessage = {
      id: Date.now(),
      text: currentInput,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentInput("");
    if (onSendChat) onSendChat(currentInput);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center gap-8 justify-between flex-1 p-6">
          <ChatDesc user={user} />
          <div className="w-full max-w-3xl">
            <ChatCard
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              chat={currentInput}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                />
              ))}
            </div>
          </div>

          <div className="border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4">
            <div className="max-w-4xl mx-auto py-4">
              <ChatCard
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                chat={currentInput}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatPage;
