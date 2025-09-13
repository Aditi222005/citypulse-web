import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
  Award,
  PlusCircle,
  Clock,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { 
    title: "Dashboard", 
    href: "/", 
    icon: Home,
    badge: null
  },
  { 
    title: "Report Issue", 
    href: "/report", 
    icon: PlusCircle,
    badge: null,
    variant: "primary" as const
  },
  { 
    title: "My Reports", 
    href: "/reports", 
    icon: FileText,
    badge: "5"
  },
  { 
    title: "Track Status", 
    href: "/track", 
    icon: Clock,
    badge: "2"
  },
  { 
    title: "Analytics", 
    href: "/analytics", 
    icon: BarChart3,
    badge: null
  },
  { 
    title: "Community", 
    href: "/community", 
    icon: MessageSquare,
    badge: null
  },
  { 
    title: "Achievements", 
    href: "/achievements", 
    icon: Award,
    badge: "NEW"
  },
  { 
    title: "Settings", 
    href: "/settings", 
    icon: Settings,
    badge: null
  }
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 bg-card border-r transition-transform duration-300 md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl gradient-civic flex items-center justify-center shadow-glow">
                <span className="text-white font-bold">CP</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold">CityPulse</h2>
                <p className="text-sm text-muted-foreground">Citizen Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center justify-between w-full p-3 rounded-lg transition-smooth group",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-civic" 
                      : "hover:bg-secondary text-foreground hover:shadow-card"
                  )}
                  onClick={onClose}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={cn(
                      "h-5 w-5 transition-smooth",
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground",
                      item.variant === "primary" && !isActive && "text-primary"
                    )} />
                    <span className="font-medium">{item.title}</span>
                  </div>
                  
                  {item.badge && (
                    <Badge 
                      variant={item.badge === "NEW" ? "default" : "secondary"}
                      className={cn(
                        "text-xs",
                        item.badge === "NEW" && "gradient-primary text-white badge-glow"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Citizen Stats */}
          <div className="p-4 border-t">
            <div className="bg-gradient-subtle rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Citizen Score</span>
                <Badge className="gradient-civic text-white">Elite</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm text-muted-foreground">12 issues resolved</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div className="gradient-primary h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}