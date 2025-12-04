import React from "react";
import ChatPage from "@/pages/ChatPage";
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
import CreateTicketPage from "./pages/CreateTicketPage";
import OverviewPage from "./pages/OverviewPage";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTickets } from "@/hooks/useTickets";
import { useMachine } from "@/hooks/useMachine";
import { useStatus } from "./hooks/useStatus";
import { Toaster } from "@/components/ui/sonner";
import AddMachinePage from "./pages/AddMachinePage";
import ViewMachinePage from "./pages/ViewMachinePage";
import AddMachineStatus from "./pages/AddMachineStatusPage";

function App() {
  // Custom hooks untuk auth dan tickets
  const auth = useAuth();
  const tickets = useTickets();
  const machines = useMachine();
  const status = useStatus();

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
      machines.fetchMachines();
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
      <>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage login={auth.login} isLoading={auth.isLoading} />
            }
          />
          <Route
            path="/register"
            element={<RegisterPage register={auth.register} />}
          />
          <Route
            path="*"
            element={
              <LoginPage login={auth.login} isLoading={auth.isLoading} />
            }
          />
        </Routes>
      </>
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
                        machines={machines.machines}
                        tickets={tickets.tickets}
                        loading={tickets.loading}
                        onDeleteTicket={tickets.useDeleteTicket}
                        onEditTicket={tickets.useEditTicket}
                      />
                    }
                  />
                  <Route
                    path="/machines/add"
                    element={
                      <AddMachinePage
                        onAddMachine={machines.useAddMachine}
                        onMachineAdded={() => machines.fetchMachines()}
                      />
                    }
                  />
                  <Route
                    path="/machines/view"
                    element={
                      <ViewMachinePage
                        machines={machines.machines}
                        onDeleteMachine={machines.useDeleteMachine}
                        onEditMachine={machines.useEditMachine}
                        onFetchMachineStatus={status.fetchStatusByMachineId}
                      />
                    }
                  />
                  <Route
                    path="/machines/status/add"
                    element={
                      <AddMachineStatus
                        onCreateStatus={status.useCreateStatus}
                        machines={machines.machines}
                        onStatusAdded={() => status.fetchStatuses()}
                      />
                    }
                  />
                  <Route
                    path="/tickets/create"
                    element={
                      <CreateTicketPage
                        machines={machines.machines}
                        onCreateTicket={tickets.useCreateTicket}
                        onTicketCreated={() => tickets.fetchTickets()}
                      />
                    }
                  />
                  <Route
                    path="/chat"
                    element={
                      <ChatPage onSendChat={handleSendChat} user={auth.user} />
                    }
                  />
                  <Route path="/overview" element={<OverviewPage />} />
                  <Route path="/" element={<OverviewPage />} />
                </Routes>
              </main>
            </SidebarInset>
          </div>
          <Toaster />
        </SidebarProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
