import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp 
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RecentIssues } from "@/components/dashboard/RecentIssues";
import { IssuesChart } from "@/components/dashboard/IssuesChart";
import { MapWidget } from "@/components/dashboard/MapWidget";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of civic issues and municipal performance
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Issues"
          value="1,247"
          description="+12% from last month"
          icon={AlertTriangle}
          trend={{ value: 12, isPositive: false }}
        />
        
        <MetricCard
          title="Pending Issues"
          value="234"
          description="Awaiting assignment"
          icon={Clock}
          variant="pending"
          trend={{ value: 8, isPositive: false }}
        />
        
        <MetricCard
          title="In Progress"
          value="156"
          description="Currently being resolved"
          icon={TrendingUp}
          variant="progress"
          trend={{ value: 15, isPositive: true }}
        />
        
        <MetricCard
          title="Resolved This Month"
          value="857"
          description="Avg. resolution: 4.2 days"
          icon={CheckCircle}
          variant="resolved"
          trend={{ value: 23, isPositive: true }}
        />
      </div>

      {/* Charts and Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MapWidget />
        <IssuesChart />
      </div>

      {/* Recent Issues */}
      <RecentIssues />
    </div>
  );
}