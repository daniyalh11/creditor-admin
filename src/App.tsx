
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AppProviders } from "./providers/AppProviders";
import AppRoutes from "./routes/AppRoutes";

const App = () => (
  <AppProviders>
    <Toaster />
    <Sonner />
    <AppRoutes />
  </AppProviders>
);

export default App;
