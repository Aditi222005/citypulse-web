import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "pending" | "progress" | "resolved" | "rejected";
}

export function MetricCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  variant = "default" 
}: MetricCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "pending":
        return "border-status-pending/20 bg-status-pending/5";
      case "progress":
        return "border-status-progress/20 bg-status-progress/5";
      case "resolved":
        return "border-status-resolved/20 bg-status-resolved/5";
      case "rejected":
        return "border-status-rejected/20 bg-status-rejected/5";
      default:
        return "";
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case "pending":
        return "text-status-pending";
      case "progress":
        return "text-status-progress";
      case "resolved":
        return "text-status-resolved";
      case "rejected":
        return "text-status-rejected";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className={`${getVariantStyles()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${getIconStyles()}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span className={`text-xs ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}