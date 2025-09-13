import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Download, TrendingUp, Clock, Award } from "lucide-react";

const resolutionData = [
  { month: "Jan", avgDays: 4.2, resolved: 145 },
  { month: "Feb", avgDays: 3.8, resolved: 167 },
  { month: "Mar", avgDays: 4.1, resolved: 156 },
  { month: "Apr", avgDays: 3.5, resolved: 189 },
  { month: "May", avgDays: 3.2, resolved: 203 },
  { month: "Jun", avgDays: 3.7, resolved: 178 }
];

const departmentData = [
  { name: "Public Works", issues: 245, resolved: 198, percentage: 81 },
  { name: "Water Dept", issues: 189, resolved: 167, percentage: 88 },
  { name: "Electrical", issues: 156, resolved: 142, percentage: 91 },
  { name: "Sanitation", issues: 134, resolved: 121, percentage: 90 },
  { name: "Transport", issues: 78, resolved: 65, percentage: 83 }
];

const issueTypeData = [
  { name: "Potholes", value: 35, color: "hsl(var(--status-pending))" },
  { name: "Water Issues", value: 28, color: "hsl(var(--status-progress))" },
  { name: "Electrical", value: 22, color: "hsl(var(--status-resolved))" },
  { name: "Sanitation", value: 15, color: "hsl(var(--info))" }
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">
            Performance insights and trend analysis
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.7 days</div>
            <p className="text-xs text-success mt-1">↓ 12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86.4%</div>
            <p className="text-xs text-success mt-1">↑ 5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performing Dept</CardTitle>
            <Award className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Electrical</div>
            <p className="text-xs text-muted-foreground mt-1">91% resolution rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resolution Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Resolution Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={resolutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="right" dataKey="resolved" fill="hsl(var(--primary))" opacity={0.3} />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="avgDays" 
                  stroke="hsl(var(--status-progress))" 
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Issue Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Issue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={issueTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {issueTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentData.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-medium">{dept.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {dept.resolved} of {dept.issues} issues resolved
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{dept.percentage}%</div>
                    <div className="text-xs text-muted-foreground">Success Rate</div>
                  </div>
                  
                  <Badge 
                    className={
                      dept.percentage >= 90 
                        ? "bg-success text-success-foreground" 
                        : dept.percentage >= 85 
                        ? "bg-warning text-warning-foreground"
                        : "bg-destructive text-destructive-foreground"
                    }
                  >
                    {dept.percentage >= 90 ? "Excellent" : dept.percentage >= 85 ? "Good" : "Needs Improvement"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}