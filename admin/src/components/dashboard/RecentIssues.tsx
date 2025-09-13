import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, User } from "lucide-react";

interface Issue {
  id: string;
  title: string;
  category: string;
  location: string;
  reportedBy: string;
  reportedAt: string;
  status: "pending" | "progress" | "resolved" | "rejected";
  priority: "low" | "medium" | "high";
}

const mockIssues: Issue[] = [
  {
    id: "CIV-2024-001",
    title: "Pothole on Main Street causing traffic disruption",
    category: "Road Maintenance",
    location: "Main Street, Block A",
    reportedBy: "John Doe",
    reportedAt: "2 hours ago",
    status: "pending",
    priority: "high"
  },
  {
    id: "CIV-2024-002", 
    title: "Street light not working in residential area",
    category: "Electrical",
    location: "Oak Avenue, Sector 5",
    reportedBy: "Jane Smith",
    reportedAt: "4 hours ago",
    status: "progress",
    priority: "medium"
  },
  {
    id: "CIV-2024-003",
    title: "Water leak in public park",
    category: "Water Supply",
    location: "Central Park, Zone 2",
    reportedBy: "Mike Johnson",
    reportedAt: "6 hours ago",
    status: "resolved",
    priority: "low"
  },
  {
    id: "CIV-2024-004",
    title: "Garbage not collected for 3 days",
    category: "Sanitation",
    location: "Elm Street, Block C",
    reportedBy: "Sarah Wilson",
    reportedAt: "8 hours ago",
    status: "pending",
    priority: "medium"
  }
];

export function RecentIssues() {
  const getStatusBadge = (status: Issue["status"]) => {
    const variants = {
      pending: "bg-status-pending text-status-pending-foreground",
      progress: "bg-status-progress text-status-progress-foreground", 
      resolved: "bg-status-resolved text-status-resolved-foreground",
      rejected: "bg-status-rejected text-status-rejected-foreground"
    };
    
    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: Issue["priority"]) => {
    const variants = {
      low: "bg-muted text-muted-foreground",
      medium: "bg-warning text-warning-foreground",
      high: "bg-destructive text-destructive-foreground"
    };
    
    return (
      <Badge variant="outline" className={variants[priority]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Issues</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockIssues.map((issue) => (
            <div key={issue.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{issue.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{issue.category}</p>
                </div>
                <div className="flex gap-2">
                  {getPriorityBadge(issue.priority)}
                  {getStatusBadge(issue.status)}
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {issue.location}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {issue.reportedBy}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {issue.reportedAt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}