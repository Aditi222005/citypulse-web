import { 
  FileText, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Users,
  AlertCircle
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentReports } from "@/components/dashboard/RecentReports";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { CitizenBadges } from "@/components/dashboard/CitizenBadges";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, Alex!
        </h1>
        <p className="text-muted-foreground">
          Track your civic contributions and stay updated on community issues.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Reports"
          value={23}
          description="All time submissions"
          icon={FileText}
          variant="primary"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Pending Issues"
          value={5}
          description="Awaiting response"
          icon={Clock}
          variant="warning"
          trend={{ value: -20, isPositive: false }}
        />
        <StatsCard
          title="Resolved"
          value={18}
          description="Successfully completed"
          icon={CheckCircle}
          variant="success"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Community Impact"
          value="92%"
          description="Citizens helped"
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <RecentReports />
        </div>
        
        {/* Quick Actions - Takes up 1 column */}
        <div className="space-y-6">
          <QuickActions />
        </div>
      </div>

      {/* Secondary Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Citizen Badges */}
        <CitizenBadges />
        
        {/* Community Stats */}
        <div className="space-y-4">
          <StatsCard
            title="Active Citizens"
            value="1,234"
            description="In your area"
            icon={Users}
            variant="default"
          />
          <StatsCard
            title="Critical Issues"
            value={8}
            description="Need immediate attention"
            icon={AlertCircle}
            variant="warning"
          />
        </div>
      </div>
    </div>
  );
}