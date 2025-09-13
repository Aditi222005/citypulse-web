import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning";
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  variant = "default" 
}: StatsCardProps) {
  return (
    <Card className={cn(
      "transition-smooth hover:shadow-card animate-scale-in",
      variant === "primary" && "gradient-subtle border-primary/20",
      variant === "success" && "border-success/20",
      variant === "warning" && "border-warning/20"
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground">
              {value}
            </p>
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          </div>
          
          <div className={cn(
            "h-12 w-12 rounded-lg flex items-center justify-center",
            variant === "default" && "bg-secondary",
            variant === "primary" && "gradient-primary",
            variant === "success" && "bg-success",
            variant === "warning" && "bg-warning"
          )}>
            <Icon className={cn(
              "h-6 w-6",
              variant === "default" && "text-muted-foreground",
              (variant === "primary" || variant === "success" || variant === "warning") && "text-white"
            )} />
          </div>
        </div>
        
        {trend && (
          <div className="mt-4 flex items-center text-xs">
            <span className={cn(
              "font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-muted-foreground ml-1">
              from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}