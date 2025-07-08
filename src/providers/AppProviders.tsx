
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '../components/ui/tooltip';
import { BrowserRouter } from 'react-router-dom';
import { SidebarProvider } from '../contexts/SidebarContext';
import { UserFilterProvider } from '../contexts/UserFilterContext';

const queryClient = new QueryClient();

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <SidebarProvider>
            <UserFilterProvider>
              {children}
            </UserFilterProvider>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
