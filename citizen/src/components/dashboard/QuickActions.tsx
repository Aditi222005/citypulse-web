import { 
  PlusCircle, 
  Search, 
  BarChart3, 
  Camera,
  MessageSquare,
  Map
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const quickActions = [
  {
    title: "Report New Issue",
    description: "Submit a new civic issue report",
    icon: PlusCircle,
    href: "/report",
    variant: "civic" as const,
    featured: true
  },
  {
    title: "Track Reports", 
    description: "Check status of your submissions",
    icon: Search,
    href: "/track",
    variant: "default" as const
  },
  {
    title: "View Analytics",
    description: "See your impact statistics", 
    icon: BarChart3,
    href: "/analytics",
    variant: "default" as const
  },
  {
    title: "Quick Photo Report",
    description: "Report with camera instantly",
    icon: Camera,
    href: "/report?mode=camera",
    variant: "default" as const
  },
  {
    title: "Community Chat",
    description: "Discuss local issues",
    icon: MessageSquare, 
    href: "/community",
    variant: "default" as const
  },
  {
    title: "Issue Map",
    description: "View issues near you",
    icon: Map,
    href: "/map",
    variant: "default" as const
  }
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card className="animate-slide-in-right">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            
            return (
              <Button
                key={action.title}
                variant={action.variant}
                className={`h-auto p-4 flex-col items-start space-y-2 relative ${
                  action.featured ? 'col-span-full' : ''
                }`}
                onClick={() => navigate(action.href)}
              >
                {action.featured && (
                  <div className="absolute top-2 right-2">
                    <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3 w-full">
                  <div className={`p-2 rounded-lg ${
                    action.variant === 'civic' 
                      ? 'bg-white/20' 
                      : 'bg-primary/10'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      action.variant === 'civic' 
                        ? 'text-white' 
                        : 'text-primary'
                    }`} />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h4 className={`font-medium text-sm ${
                      action.variant === 'civic' 
                        ? 'text-white' 
                        : 'text-foreground'
                    }`}>
                      {action.title}
                    </h4>
                    <p className={`text-xs ${
                      action.variant === 'civic' 
                        ? 'text-white/80' 
                        : 'text-muted-foreground'
                    }`}>
                      {action.description}
                    </p>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}