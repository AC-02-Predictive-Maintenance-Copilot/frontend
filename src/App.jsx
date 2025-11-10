import React from "react";
import ChatPage from "@/pages/chatPage";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import SideBar from "@/components/SideBar";
import { Menu } from "lucide-react";
import { ThemeProvider } from "@/context/ThemeContext";

function App() {
  const handleSendChat = (chat) => {
    console.log("Chat sent:", chat);
  };

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <SideBar />
          <SidebarInset className="flex-1">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4">
              <SidebarTrigger className="h-8 w-8">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold">Chat Assistant</h1>
              </div>
            </header>
            <main className="">
              <ChatPage onSendChat={handleSendChat} />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
