import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, MapPin, User, Calendar, Eye } from "lucide-react";

interface Issue {
  id: string;
  title: string;
  category: string;
  location: string;
  reportedBy: string;
  reportedDate: string;
  assignedDept: string;
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
    reportedDate: "2024-01-15",
    assignedDept: "Public Works",
    status: "pending",
    priority: "high"
  },
  {
    id: "CIV-2024-002",
    title: "Street light not working in residential area",
    category: "Electrical",
    location: "Oak Avenue, Sector 5",
    reportedBy: "Jane Smith",
    reportedDate: "2024-01-14",
    assignedDept: "Electrical Dept",
    status: "progress",
    priority: "medium"
  },
  {
    id: "CIV-2024-003",
    title: "Water leak in public park",
    category: "Water Supply",
    location: "Central Park, Zone 2",
    reportedBy: "Mike Johnson",
    reportedDate: "2024-01-13",
    assignedDept: "Water Department",
    status: "resolved",
    priority: "low"
  },
  {
    id: "CIV-2024-004",
    title: "Garbage not collected for 3 days",
    category: "Sanitation",
    location: "Elm Street, Block C",
    reportedBy: "Sarah Wilson",
    reportedDate: "2024-01-12",
    assignedDept: "Sanitation",
    status: "pending",
    priority: "medium"
  },
  {
    id: "CIV-2024-005",
    title: "Broken sidewalk near school",
    category: "Road Maintenance",
    location: "School Road, Sector 3",
    reportedBy: "David Brown",
    reportedDate: "2024-01-11",
    assignedDept: "Public Works",
    status: "progress",
    priority: "high"
  }
];

export default function Issues() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

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

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || issue.assignedDept === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Issue Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track all reported civic issues
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by issue ID or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Public Works">Public Works</SelectItem>
                <SelectItem value="Electrical Dept">Electrical Dept</SelectItem>
                <SelectItem value="Water Department">Water Department</SelectItem>
                <SelectItem value="Sanitation">Sanitation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Issues Table */}
      <Card>
        <CardHeader>
          <CardTitle>Issues ({filteredIssues.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{issue.id}</TableCell>
                  <TableCell className="max-w-[300px]">
                    <div className="font-medium truncate">{issue.title}</div>
                  </TableCell>
                  <TableCell>{issue.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      {issue.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <User className="h-3 w-3" />
                      {issue.reportedBy}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {issue.reportedDate}
                    </div>
                  </TableCell>
                  <TableCell>{issue.assignedDept}</TableCell>
                  <TableCell>{getPriorityBadge(issue.priority)}</TableCell>
                  <TableCell>{getStatusBadge(issue.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}