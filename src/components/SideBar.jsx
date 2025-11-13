import React from "react";
import { Brain, Bot, Cog, Eye, Plus, Monitor, Ticket } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import ConfirmDialog from "@/components/ConfirmDialog";
import { NavUser } from "./AvatarProfile";
import SidebarMenuSimple from "@/components/SidebarMenuSimple";
import SidebarMenuCollapsible from "@/components/SidebarMenuCollapsible";

// Menu items
const simpleMenuItems = [
  {
    title: "Overview",
    url: "/overview",
    icon: Monitor,
  },
  {
    title: "Chatbot",
    url: "/chat",
    icon: Brain,
  },
];

// Submenu items
const collapsibleMenuItems = [
  {
    title: "Machine",
    icon: Cog,
    defaultOpen: false,
    subItems: [
      {
        title: "View Machine",
        url: "#view",
        icon: Eye,
      },
      {
        title: "Add Machine",
        url: "#add",
        icon: Plus,
      },
    ],
  },
  {
    title: "Ticket",
    icon: Ticket,
    defaultOpen: false,
    subItems: [
      {
        title: "View Tickets",
        url: "/tickets/view",
        icon: Eye,
      },
      {
        title: "Create Ticket",
        url: "/tickets/create",
        icon: Plus,
      },
    ],
  },
];

function SideBar({ onLogout, user }) {
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    onLogout();
  };

  return (
    <>
      <ConfirmDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        title="Logout Confirmation"
        description="Are you sure you want to logout? You will need to login again to access your account."
        onConfirm={handleConfirmLogout}
        confirmText="Logout"
        cancelText="Cancel"
      />
      <Sidebar collapsible="icon">
        <SidebarHeader className="h-16 border-sidebar-border flex items-center px-4 group-data-[collapsible=icon]:px-0">
          <div className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
            <div className="flex h-10 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bot className="h-5 w-5" />
            </div>
            <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
              <span className="font-semibold text-sm truncate">
                Maintenance Copilot
              </span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 text-xs">Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Modularisasi menu sidebar menjadi komponen terpisah */}
                {simpleMenuItems.map((item) => (
                  <SidebarMenuSimple key={item.title} item={item} />
                ))}
                {collapsibleMenuItems.map((menu) => (
                  <SidebarMenuCollapsible
                    key={menu.title}
                    title={menu.title}
                    icon={menu.icon}
                    subItems={menu.subItems}
                    defaultOpen={menu.defaultOpen}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <ThemeToggle />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavUser user={user} logout={handleLogoutClick} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
export default SideBar;
