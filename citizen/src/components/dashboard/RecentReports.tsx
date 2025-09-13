import { useState } from "react";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  MapPin,
  MessageSquare
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Report {
  id: string;
  title: string;
  category: string;
  status: "pending" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  date: string;
  location: string;
  description: string;
  responses: number;
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Broken Street Light",
    category: "Infrastructure",
    status: "in-progress",
    priority: "high",
    date: "2024-01-15",
    location: "Main St & 5th Ave",
    description: "Street light has been flickering for 3 days, causing safety concerns.",
    responses: 2
  },
  {
    id: "2", 
    title: "Pothole on Elm Street",
    category: "Roads",
    status: "pending",
    priority: "medium",
    date: "2024-01-14",
    location: "Elm St, Block 200",
    description: "Large pothole causing vehicle damage.",
    responses: 0
  },
  {
    id: "3",
    title: "Park Bench Vandalism",
    category: "Parks",
    status: "resolved",
    priority: "low",
    date: "2024-01-12",
    location: "Central Park",
    description: "Graffiti on multiple park benches.",
    responses: 3
  }
];

const statusConfig = {
  pending: {
    icon: Clock,
    label: "Pending",
    color: "text-warning",
    bg: "bg-warning/10"
  },
  "in-progress": {
    icon: AlertCircle,
    label: "In Progress", 
    color: "text-primary",
    bg: "bg-primary/10"
  },
  resolved: {
    icon: CheckCircle,
    label: "Resolved",
    color: "text-success", 
    bg: "bg-success/10"
  }
};

const priorityConfig = {
  low: { color: "bg-muted", label: "Low" },
  medium: { color: "bg-warning", label: "Medium" },
  high: { color: "bg-destructive", label: "High" }
};

export function RecentReports() {
  const [reports] = useState<Report[]>(mockReports);

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Recent Reports</span>
          </CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => {
            const statusInfo = statusConfig[report.status];
            const priorityInfo = priorityConfig[report.priority];
            const StatusIcon = statusInfo.icon;
            
            return (
              <div 
                key={report.id}
                className="border rounded-lg p-4 transition-smooth hover:shadow-card hover:border-primary/20"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">
                      {report.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {report.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge 
                      className={cn(priorityInfo.color, "text-white text-xs")}
                    >
                      {priorityInfo.label}
                    </Badge>
                    <div className={cn(
                      "flex items-center space-x-1 px-2 py-1 rounded-full text-xs",
                      statusInfo.bg
                    )}>
                      <StatusIcon className={cn("h-3 w-3", statusInfo.color)} />
                      <span className={statusInfo.color}>
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{report.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{report.location}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {report.category}
                    </Badge>
                  </div>
                  
                  {report.responses > 0 && (
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{report.responses} responses</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}