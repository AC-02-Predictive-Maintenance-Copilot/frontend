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
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { Routes, Route } from "react-router-dom";
import { getAccessToken, getUserLogged } from "@/utils/api";

function App() {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkSession = async () => {
      const token = getAccessToken();

      if (token) {
        const { error, data } = await getUserLogged();

        if (!error) {
          setUser(data);
        }
      }

      setIsLoading(false);
    };

    checkSession();
  }, []);

  const handleSendChat = (chat) => {
    console.log("Chat sent:", chat);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<LoginPage loginSuccess={handleLoginSuccess} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="*"
          element={<LoginPage loginSuccess={handleLoginSuccess} />}
        />
      </Routes>
    );
  }

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <SideBar onLogout={handleLogout} />
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
