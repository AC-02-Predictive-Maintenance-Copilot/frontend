import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";

function ChatCard({ handleChange, handleSubmit, chat, disabled = false }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <InputGroup className="flex w-[50%] mx-auto">
        <InputGroupTextarea
          placeholder={disabled ? "Connecting..." : "Ask, Search or Chat..."}
          name="chat"
          id="chat"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={chat}
          disabled={disabled}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            variant="default"
            className="rounded-full ml-auto cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            size="icon-xs"
            onClick={handleSubmit}
            disabled={disabled || !chat?.trim()}
          >
            <ArrowUpRightIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </motion.div>
  );
}

export default ChatCard;
