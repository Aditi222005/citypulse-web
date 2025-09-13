import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  Building2, 
  UserPlus, 
  Plus, 
  Mail, 
  Phone,
  Shield,
  Edit,
  Trash2
} from "lucide-react";

interface Department {
  id: string;
  name: string;
  head: string;
  headEmail: string;
  staffCount: number;
  activeIssues: number;
  resolvedThisMonth: number;
  status: "active" | "inactive";
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: "admin" | "department_head" | "officer";
  status: "active" | "inactive";
  lastLogin: string;
}

const mockDepartments: Department[] = [
  {
    id: "dept-001",
    name: "Public Works",
    head: "John Smith",
    headEmail: "john.smith@city.gov",
    staffCount: 24,
    activeIssues: 47,
    resolvedThisMonth: 198,
    status: "active"
  },
  {
    id: "dept-002",
    name: "Water Department",
    head: "Sarah Johnson",
    headEmail: "sarah.johnson@city.gov",
    staffCount: 18,
    activeIssues: 23,
    resolvedThisMonth: 167,
    status: "active"
  },
  {
    id: "dept-003",
    name: "Electrical Department",
    head: "Mike Wilson",
    headEmail: "mike.wilson@city.gov",
    staffCount: 15,
    activeIssues: 14,
    resolvedThisMonth: 142,
    status: "active"
  },
  {
    id: "dept-004",
    name: "Sanitation",
    head: "Lisa Brown",
    headEmail: "lisa.brown@city.gov",
    staffCount: 32,
    activeIssues: 13,
    resolvedThisMonth: 121,
    status: "active"
  }
];

const mockUsers: User[] = [
  {
    id: "user-001",
    name: "John Smith",
    email: "john.smith@city.gov",
    phone: "+1-555-0101",
    department: "Public Works",
    role: "department_head",
    status: "active",
    lastLogin: "2024-01-15 09:30"
  },
  {
    id: "user-002",
    name: "Sarah Johnson",
    email: "sarah.johnson@city.gov",
    phone: "+1-555-0102",
    department: "Water Department",
    role: "department_head",
    status: "active",
    lastLogin: "2024-01-15 08:45"
  },
  {
    id: "user-003",
    name: "Mike Wilson",
    email: "mike.wilson@city.gov",
    phone: "+1-555-0103",
    department: "Electrical Department",
    role: "department_head",
    status: "active",
    lastLogin: "2024-01-14 16:20"
  },
  {
    id: "user-004",
    name: "Admin User",
    email: "admin@city.gov",
    phone: "+1-555-0100",
    department: "Administration",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15 10:15"
  }
];

export default function Departments() {
  const [activeTab, setActiveTab] = useState("departments");

  const getRoleBadge = (role: User["role"]) => {
    const variants = {
      admin: "bg-primary text-primary-foreground",
      department_head: "bg-info text-info-foreground",
      officer: "bg-muted text-muted-foreground"
    };
    
    const labels = {
      admin: "System Admin",
      department_head: "Dept. Head",
      officer: "Officer"
    };
    
    return (
      <Badge className={variants[role]}>
        {labels[role]}
      </Badge>
    );
  };

  const getStatusBadge = (status: "active" | "inactive") => {
    return (
      <Badge className={status === "active" ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Department & User Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage departments, staff, and system access
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="departments" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Departments
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-6">
          {/* Department Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Departments
              </CardTitle>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Department
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Department Head</TableHead>
                    <TableHead>Staff Count</TableHead>
                    <TableHead>Active Issues</TableHead>
                    <TableHead>Resolved (Month)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDepartments.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{dept.head}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {dept.headEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {dept.staffCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-status-pending/10 text-status-pending border-status-pending/20">
                          {dept.activeIssues}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-status-resolved/10 text-status-resolved border-status-resolved/20">
                          {dept.resolvedThisMonth}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(dept.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {/* User Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                System Users
              </CardTitle>
              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Add User
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Shield className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}