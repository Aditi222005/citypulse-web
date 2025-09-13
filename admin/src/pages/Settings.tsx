import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Brain, 
  Building, 
  Save,
  Upload
} from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings & Configuration</h1>
        <p className="text-muted-foreground mt-1">
          System configuration and notification management
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Categorization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* Municipal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Municipal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="municipality-name">Municipality Name</Label>
                  <Input
                    id="municipality-name"
                    placeholder="City Municipal Corporation"
                    defaultValue="Metro City Municipal Corporation"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Official Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="contact@city.gov"
                    defaultValue="contact@metrocity.gov"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input
                    id="contact-phone"
                    placeholder="+1-555-0100"
                    defaultValue="+1-555-0100"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Official Website</Label>
                  <Input
                    id="website"
                    placeholder="https://metrocity.gov"
                    defaultValue="https://metrocity.gov"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Municipality Address</Label>
                <Textarea
                  id="address"
                  placeholder="Full address of municipal office"
                  defaultValue="123 City Hall Plaza, Metro City, State 12345"
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Municipal Logo</h4>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                    <Building className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Logo
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          {/* Notification Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Issue Received Template */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Issue Received Confirmation</h4>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issue-received-template">Email Template</Label>
                  <Textarea
                    id="issue-received-template"
                    rows={4}
                    placeholder="Email template for issue received confirmation"
                    defaultValue="Dear {citizen_name},

Thank you for reporting the issue: {issue_title}

Your issue has been received and assigned ID: {issue_id}
Expected resolution time: {estimated_time}

Best regards,
{municipality_name}"
                  />
                </div>
              </div>

              <Separator />

              {/* Status Update Template */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Status Update Notification</h4>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status-update-template">Email Template</Label>
                  <Textarea
                    id="status-update-template"
                    rows={4}
                    placeholder="Email template for status updates"
                    defaultValue="Dear {citizen_name},

Your reported issue {issue_id} has been updated:
Status: {new_status}
Update: {status_message}

You can track your issue at: {tracking_link}

Best regards,
{municipality_name}"
                  />
                </div>
              </div>

              <Separator />

              {/* Resolution Template */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Issue Resolution Notification</h4>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resolution-template">Email Template</Label>
                  <Textarea
                    id="resolution-template"
                    rows={4}
                    placeholder="Email template for issue resolution"
                    defaultValue="Dear {citizen_name},

Great news! Your reported issue {issue_id} has been resolved.

Resolution Details: {resolution_details}
Resolved by: {department_name}
Completion Date: {completion_date}

Thank you for helping us improve our city!

Best regards,
{municipality_name}"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          {/* AI Categorization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Categorization Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable Auto-Categorization</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically categorize and route issues using AI
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              {/* Category Keywords */}
              <div className="space-y-4">
                <h4 className="font-medium">Category Keywords</h4>
                <p className="text-sm text-muted-foreground">
                  Manage keywords that help AI categorize issues correctly
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="road-keywords">Road Maintenance Keywords</Label>
                    <Textarea
                      id="road-keywords"
                      rows={3}
                      placeholder="Enter keywords separated by commas"
                      defaultValue="pothole, road repair, asphalt, crack, pavement, street damage, road surface"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="water-keywords">Water Supply Keywords</Label>
                    <Textarea
                      id="water-keywords"
                      rows={3}
                      placeholder="Enter keywords separated by commas"
                      defaultValue="water leak, pipe burst, no water supply, water pressure, drainage, sewage"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="electrical-keywords">Electrical Keywords</Label>
                    <Textarea
                      id="electrical-keywords"
                      rows={3}
                      placeholder="Enter keywords separated by commas"
                      defaultValue="street light, power outage, electrical fault, wiring, transformer, lighting"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sanitation-keywords">Sanitation Keywords</Label>
                    <Textarea
                      id="sanitation-keywords"
                      rows={3}
                      placeholder="Enter keywords separated by commas"
                      defaultValue="garbage, waste collection, dustbin, cleaning, sanitation, litter"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Priority Keywords */}
              <div className="space-y-4">
                <h4 className="font-medium">Priority Detection</h4>
                <div className="space-y-2">
                  <Label htmlFor="urgent-keywords">High Priority Keywords</Label>
                  <Textarea
                    id="urgent-keywords"
                    rows={2}
                    placeholder="Keywords that indicate urgent issues"
                    defaultValue="emergency, urgent, dangerous, blocked, accident, major, severe"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save AI Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}