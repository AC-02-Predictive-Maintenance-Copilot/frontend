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
import { useAuth } from "@/hooks/useAuth";
import { useTickets } from "@/hooks/useTickets";

function App() {
  // Custom hooks untuk auth dan tickets
  const auth = useAuth();
  const tickets = useTickets();

  React.useEffect(() => {
    const initApp = async () => {
      await auth.checkSession();
    };

    initApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch tickets setelah user login
  React.useEffect(() => {
    if (auth.user) {
      tickets.fetchTickets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  const handleSendChat = (chat) => {
    console.log("Chat sent:", chat);
  };

  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

// Page login dan regis jika belum login
  if (!auth.user) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage 
              login={auth.login} 
              error={auth.error} 
              clearError={auth.clearError}
            />
          }
        />
        <Route path="/register" element={<RegisterPage register={auth.register} error={auth.error} clearError={auth.clearError} />} />
        <Route
          path="*"
          element={
            <LoginPage 
              login={auth.login} 
              error={auth.error} 
              clearError={auth.clearError}
            />
          }
        />
      </Routes>
    );
  }

// Main app di sini
  return (
    <UserProvider>
      <ThemeProvider>
        <SidebarProvider defaultOpen={false}>
          <div className="flex min-h-screen w-full bg-background">
            <SideBar onLogout={auth.logout} user={auth.user} />
            <SidebarInset className="flex-1">
              <header className="sticky top-0 z-10 flex h-16 items-center gap-4 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4">
                <SidebarTrigger className="h-8 w-8">
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
              </header>
              <main className="">
                <Routes>
                  <Route
                    path="/tickets/view"
                    element={
                      <TicketPage
                        tickets={tickets.tickets}
                        loading={tickets.loading}
                      />
                    }
                  />
                  <Route
                    path="/chat"
                    element={
                      <ChatPage onSendChat={handleSendChat} user={auth.user} />
                    }
                  />
                  <Route
                    path="/"
                    element={
                      <ChatPage onSendChat={handleSendChat} user={auth.user} />
                    }
                  />
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
