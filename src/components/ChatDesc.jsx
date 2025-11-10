import React from "react";

function ChatDesc() {
  return (
    <div className="p-4 w-[50%] mx-auto">
      <h2 className="text-4xl font-bold mb-2 bg-linear-to-r from-zinc-900 to-zinc-400 via-zinc-500 dark:from-zinc-100 dark:to-zinc-500 dark:via-zinc-400 bg-clip-text text-transparent pb-1">
        Hi there, Zulhan <br />
        What can I do for you today?
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        This is a simple chat interface where you can ask questions, search for
        information, or have a conversation with the AI. Type your message in
        the input box below and hit send to get started!
      </p>
    </div>
  );
}

export default ChatDesc;
