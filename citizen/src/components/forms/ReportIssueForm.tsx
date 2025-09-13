import { useState } from "react";
import { 
  Camera, 
  MapPin, 
  Upload, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle,
  AlertTriangle,
  FileText,
  Mic
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  urgency: number;
  location: string;
  images: File[];
  video?: File;
}

const categories = {
  "infrastructure": {
    label: "Infrastructure",
    subcategories: ["Street Lights", "Roads", "Bridges", "Sidewalks", "Traffic Signals"]
  },
  "environment": {
    label: "Environment", 
    subcategories: ["Pollution", "Waste Management", "Tree Issues", "Water Quality", "Noise"]
  },
  "safety": {
    label: "Public Safety",
    subcategories: ["Crime", "Emergency", "Fire Hazard", "Missing Signs", "Dangerous Areas"]
  },
  "parks": {
    label: "Parks & Recreation",
    subcategories: ["Playground Issues", "Maintenance", "Vandalism", "Cleanliness", "Equipment"]
  },
  "utilities": {
    label: "Utilities",
    subcategories: ["Water", "Electricity", "Gas", "Internet", "Phone"]
  }
};

const urgencyLabels = {
  1: { label: "Low", color: "text-muted-foreground", desc: "Can wait a few weeks" },
  2: { label: "Medium", color: "text-warning", desc: "Should be addressed soon" },
  3: { label: "High", color: "text-destructive", desc: "Needs immediate attention" }
};

export function ReportIssueForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    urgency: 1,
    location: "",
    images: [],
    video: undefined
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting form:", formData);
    // Handle form submission here
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5) // Max 5 images
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const urgencyInfo = urgencyLabels[formData.urgency as keyof typeof urgencyLabels];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card className="animate-fade-in-up">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Report New Issue
              </h2>
              <Badge variant="secondary">
                Step {currentStep} of {totalSteps}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-smooth ${
                    step < currentStep 
                      ? "bg-success text-success-foreground" 
                      : step === currentStep 
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}>
                    {step < currentStep ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-0.5 mx-2 ${
                      step < currentStep ? "bg-success" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Basic Details</span>
              <span>Category & Media</span>
              <span>Location & Submit</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card className="animate-scale-in">
        <CardContent className="p-6">
          {/* Step 1: Basic Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Basic Details</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Issue Title *</Label>
                  <Input
                    id="title"
                    placeholder="Brief, descriptive title for your issue"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="description">Description *</Label>
                    <Button variant="ghost" size="sm">
                      <Mic className="h-4 w-4 mr-1" />
                      Voice
                    </Button>
                  </div>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about the issue. What exactly is wrong? When did you notice it? How does it affect you or others?"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-1 min-h-[120px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Detailed descriptions help authorities understand and resolve issues faster.
                  </p>
                </div>

                <div>
                  <Label className="text-base font-medium">Issue Urgency</Label>
                  <div className="mt-3 space-y-4">
                    <div className="px-4">
                      <Slider
                        value={[formData.urgency]}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value[0] }))}
                        max={3}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Low</span>
                      <span className="text-warning">Medium</span>
                      <span className="text-destructive">High</span>
                    </div>
                    <div className={`text-center p-3 rounded-lg bg-muted/30 ${urgencyInfo.color}`}>
                      <span className="font-medium">{urgencyInfo.label} Priority</span>
                      <p className="text-sm opacity-80">{urgencyInfo.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Category & Media */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Camera className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Category & Media</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="min-w-0">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value, subcategory: "" }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categories).map(([key, cat]) => (
                          <SelectItem key={key} value={key}>
                            <span className="truncate">{cat.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="min-w-0">
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Select 
                      value={formData.subcategory} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, subcategory: value }))}
                      disabled={!formData.category}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.category && categories[formData.category as keyof typeof categories]?.subcategories.map((sub) => (
                          <SelectItem key={sub} value={sub}>
                            <span className="truncate">{sub}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* AI Suggestion */}
                {formData.category && (
                  <div className="p-4 gradient-subtle border rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                        <span className="text-primary-foreground text-sm font-bold">AI</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">AI Category Suggestion</h4>
                        <p className="text-sm text-muted-foreground">
                          Based on your description, this appears to be correctly categorized as {categories[formData.category as keyof typeof categories]?.label}.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-base font-medium">Upload Photos/Videos</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Visual evidence helps authorities assess and prioritize your report.
                  </p>
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-smooth">
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="media-upload"
                    />
                    <label htmlFor="media-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-sm font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Photos and videos up to 10MB each (max 5 files)
                      </p>
                    </label>
                  </div>

                  {/* Image Previews */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-smooth"
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location & Submit */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Location & Submit</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="location"
                      placeholder="Enter address or intersection"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="flex-1"
                    />
                    <Button variant="outline">
                      <MapPin className="h-4 w-4 mr-1" />
                      GPS
                    </Button>
                  </div>
                </div>

                {/* Interactive Map Placeholder */}
                <div className="border rounded-lg p-8 bg-muted/30 text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium">Interactive Map</p>
                  <p className="text-xs text-muted-foreground">
                    Click to pin exact location on map
                  </p>
                </div>

                {/* Review Summary */}
                <div className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-medium flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Review Your Report</span>
                  </h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-muted-foreground flex-shrink-0">Title:</span>
                      <span className="font-medium text-right break-words">{formData.title || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-muted-foreground flex-shrink-0">Category:</span>
                      <span className="font-medium text-right break-words">
                        {formData.category ? categories[formData.category as keyof typeof categories]?.label : "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-muted-foreground flex-shrink-0">Priority:</span>
                      <Badge className={`${urgencyInfo.color.replace('text-', 'bg-')}/10 ${urgencyInfo.color} border-0 whitespace-nowrap`}>
                        {urgencyInfo.label}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-muted-foreground flex-shrink-0">Photos:</span>
                      <span className="font-medium">{formData.images.length} uploaded</span>
                    </div>
                  </div>
                </div>

                {/* Submit Warning */}
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-medium text-warning">Before Submitting</h4>
                      <p className="text-sm text-muted-foreground">
                        Please ensure all information is accurate. False reports may result in account suspension.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button 
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && (!formData.title || !formData.description)) ||
                  (currentStep === 2 && !formData.category)
                }
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button 
                variant="civic"
                onClick={handleSubmit}
                disabled={!formData.location}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Submit Report
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}