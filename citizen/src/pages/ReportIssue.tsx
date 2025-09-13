import { ReportIssueForm } from "@/components/forms/ReportIssueForm";

export default function ReportIssue() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-foreground">
          Report a Civic Issue
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Help improve your community by reporting issues that need attention. 
          Your reports help local authorities prioritize and address problems efficiently.
        </p>
      </div>

      {/* Form */}
      <ReportIssueForm />
    </div>
  );
}