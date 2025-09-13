import { 
  BarChart3, 
  Settings, 
  Users, 
  Wrench, 
  LayoutDashboard,
  FileText,
  MapPin
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

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
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Issue Management", url: "/issues", icon: Wrench },
  { title: "Analytics & Reports", url: "/analytics", icon: BarChart3 },
  { title: "Department Management", url: "/departments", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    return isActive(path) 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-muted/50";
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"}>
      <SidebarHeader className="p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <MapPin className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">CityPulse</h2>
              <p className="text-sm text-muted-foreground">Admin Portal</p>
            </div>
          </div>
        )}
        {collapsed && (
          <MapPin className="h-8 w-8 text-primary mx-auto" />
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}