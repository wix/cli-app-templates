import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { WixDesignSystemProvider } from '@wix/design-system';
import { withDashboard } from '@wix/dashboard-react';

const queryClient = new QueryClient();

export function withProviders<P extends {} = {}>(Component: React.FC<P>) {
  return withDashboard(function DashboardProviders(props: P) {
    return (
      <WixDesignSystemProvider features={{ newColorsBranding: true }}>
        <QueryClientProvider client={queryClient}>
          <Component {...props} />
        </QueryClientProvider>
      </WixDesignSystemProvider>
    );
  });
}
