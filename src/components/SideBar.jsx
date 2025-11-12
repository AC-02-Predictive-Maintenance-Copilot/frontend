import React from "react";
import {
  Brain,
  Ticket,
  LogOut,
  Bot,
  ChevronRight,
  Cog,
  Eye,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import ConfirmDialog from "@/components/ConfirmDialog";
import { NavUser } from "./AvatarProfile";

const items = [
  {
    title: "Chatbot",
    url: "/chat",
    icon: Brain,
  },
  {
    title: "Ticket",
    url: "/tickets",
    icon: Ticket,
  },
];

const machineSubItems = [
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
  {
    title: "Edit Machine",
    url: "#edit",
    icon: Edit,
  },
  {
    title: "Delete Machine",
    url: "#delete",
    icon: Trash2,
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
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip="Machine">
                        <Cog className="h-4 w-4" />
                        <span>Machine</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {machineSubItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <Link
                                to={subItem.url}
                                className="flex items-center gap-3"
                              >
                                <subItem.icon className="h-3.5 w-3.5" />
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>

                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
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
