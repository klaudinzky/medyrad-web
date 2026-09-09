import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import ServiceDetail from "@/pages/service-detail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/resonancia-magnetica-osorno" component={ServiceDetail} />
      <Route path="/scanner-tomografia-osorno" component={ServiceDetail} />
      <Route path="/radiografias-osorno" component={ServiceDetail} />
      <Route path="/ecografias-osorno" component={ServiceDetail} />
      <Route path="/laboratorio-clinico-osorno" component={ServiceDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
