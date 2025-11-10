import React from "react";
import { ArrowUpRightIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";

function ChatCard({ handleChange, handleSubmit, chat }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <InputGroup className="flex w-[50%] mx-auto">
      <InputGroupTextarea
        placeholder="Ask, Search or Chat..."
        name="chat"
        id="chat"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={chat}
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton
          variant="default"
          className="rounded-full ml-auto cursor-pointer"
          size="icon-xs"
          onClick={handleSubmit}
        >
          <ArrowUpRightIcon />
          <span className="sr-only">Send</span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

export default ChatCard;
