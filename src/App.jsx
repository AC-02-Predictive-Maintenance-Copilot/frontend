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
import { UserProvider } from "@/context/UserContext";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import TicketPage from "./pages/TicketPage";
import { Routes, Route } from "react-router-dom";
import { getAccessToken, getUserLogged, removeAccessToken } from "@/utils/api";

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
    removeAccessToken();
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
          path="/"
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
    <UserProvider>
      <ThemeProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-background">
            <SideBar onLogout={handleLogout} user={user} />
            <SidebarInset className="flex-1">
              <header className="sticky top-0 z-10 flex h-16 items-center gap-4 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4">
                <SidebarTrigger className="h-8 w-8">
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
              </header>
              <main className="">
                <Routes>
                  <Route path="/tickets" element={<TicketPage />} />
                  <Route path="/chat" element={<ChatPage onSendChat={handleSendChat} user={user} />} />
                  <Route path="/" element={<ChatPage onSendChat={handleSendChat} user={user} />} />

                </Routes>
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
