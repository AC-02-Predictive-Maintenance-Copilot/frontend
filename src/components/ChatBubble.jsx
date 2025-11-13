import React from "react";
import { motion } from "framer-motion";

function ChatBubble({ message, isUser }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}>
      <motion.div
        initial={{ 
          opacity: 0, 
          x: isUser ? 20 : -20,
          scale: 0.95 
        }}
        animate={{ 
          opacity: 1, 
          x: 0,
          scale: 1 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25,
          duration: 0.3 
        }}
        className={`max-w-[70%] px-4 py-3 rounded-xl shadow-sm ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-muted-foreground rounded-bl-sm"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
          {message}
        </p>
      </motion.div>
    </div>
  );
}

export default ChatBubble;