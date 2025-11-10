import React from "react";

function ChatBubble({ message, isUser }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}>
      <div
        className={`max-w-[70%] px-4 py-3 rounded-xl shadow-sm ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-muted-foreground rounded-bl-sm"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
          {message}
        </p>
      </div>
    </div>
  );
}

export default ChatBubble;