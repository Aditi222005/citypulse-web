import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";

export function MapWidget() {
  // Mock data for demonstration
  const issueLocations = [
    { id: 1, x: 25, y: 30, status: "pending", title: "Pothole Report" },
    { id: 2, x: 45, y: 20, status: "progress", title: "Street Light Issue" },
    { id: 3, x: 65, y: 60, status: "resolved", title: "Water Leak Fixed" },
    { id: 4, x: 80, y: 40, status: "pending", title: "Garbage Collection" },
    { id: 5, x: 15, y: 70, status: "progress", title: "Road Repair" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "hsl(var(--status-pending))";
      case "progress": return "hsl(var(--status-progress))";
      case "resolved": return "hsl(var(--status-resolved))";
      default: return "hsl(var(--muted))";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Issue Distribution Map
        </CardTitle>
        <Badge variant="outline">Live View</Badge>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[400px] bg-muted/20 rounded-lg border overflow-hidden">
          {/* Mock map background with grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-muted-foreground/20" />
              ))}
            </div>
          </div>
          
          {/* Mock street lines */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-muted-foreground/30" />
            <div className="absolute top-2/4 left-0 right-0 h-0.5 bg-muted-foreground/30" />
            <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-muted-foreground/30" />
            <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-muted-foreground/30" />
            <div className="absolute left-2/4 top-0 bottom-0 w-0.5 bg-muted-foreground/30" />
            <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-muted-foreground/30" />
          </div>

          {/* Issue markers */}
          {issueLocations.map((issue) => (
            <div
              key={issue.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ 
                left: `${issue.x}%`, 
                top: `${issue.y}%` 
              }}
            >
              <MapPin 
                className="h-6 w-6 drop-shadow-lg hover:scale-110 transition-transform"
                style={{ color: getStatusColor(issue.status) }}
                fill="currentColor"
              />
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-background border rounded shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="font-medium">{issue.title}</div>
                <div className="text-muted-foreground capitalize">{issue.status}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-status-pending" />
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-status-progress" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-status-resolved" />
            <span>Resolved</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}