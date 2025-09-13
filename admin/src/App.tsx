import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Issues from "./pages/Issues";
import Analytics from "./pages/Analytics";
import Departments from "./pages/Departments";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/layout/AppLayout";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute requiredRole="admin">
                <AppLayout><Dashboard /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/issues" element={
              <ProtectedRoute requiredRole="admin">
                <AppLayout><Issues /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute requiredRole="admin">
                <AppLayout><Analytics /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/departments" element={
              <ProtectedRoute requiredRole="admin">
                <AppLayout><Departments /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute requiredRole="admin">
                <AppLayout><Settings /></AppLayout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
