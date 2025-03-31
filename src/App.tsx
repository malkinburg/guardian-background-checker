
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PersonalDetails from "./pages/PersonalDetails";
import AddressHistory from "./pages/AddressHistory";
import IdentityVerification from "./pages/IdentityVerification";
import WorkDetails from "./pages/WorkDetails";
import CheckStatus from "./pages/CheckStatus";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/personal-details" element={<PersonalDetails />} />
          <Route path="/address-history" element={<AddressHistory />} />
          <Route path="/identity-verification" element={<IdentityVerification />} />
          <Route path="/work-details" element={<WorkDetails />} />
          <Route path="/check-status" element={<CheckStatus />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
