import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Road Maintenance", value: 35, color: "hsl(var(--status-pending))" },
  { name: "Water Supply", value: 25, color: "hsl(var(--status-progress))" },
  { name: "Electrical", value: 20, color: "hsl(var(--status-resolved))" },
  { name: "Sanitation", value: 15, color: "hsl(var(--info))" },
  { name: "Other", value: 5, color: "hsl(var(--muted))" }
];

export function IssuesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}