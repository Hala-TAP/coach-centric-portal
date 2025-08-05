import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Coachees from "./pages/Coachees";
import SetPassword from "./pages/onboarding/SetPassword";
import LinkedInProfile from "./pages/onboarding/LinkedInProfile";
import ReviewDetails from "./pages/onboarding/ReviewDetails";
import UploadPhoto from "./pages/onboarding/UploadPhoto";
import Availability from "./pages/onboarding/Availability";
import Complete from "./pages/onboarding/Complete";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/signin" replace />;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/signin"} replace />} />
      <Route path="/signin" element={user ? <Navigate to="/dashboard" replace /> : <SignIn />} />
      
      {/* Onboarding Routes */}
      <Route path="/onboarding" element={<SetPassword />} />
      <Route path="/onboarding/set-password" element={<SetPassword />} />
      <Route path="/onboarding/linkedin" element={<LinkedInProfile />} />
      <Route path="/onboarding/review" element={<ReviewDetails />} />
      <Route path="/onboarding/photo" element={<UploadPhoto />} />
      <Route path="/onboarding/availability" element={<Availability />} />
      <Route path="/onboarding/complete" element={<Complete />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/coachees" element={<ProtectedRoute><Coachees /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
