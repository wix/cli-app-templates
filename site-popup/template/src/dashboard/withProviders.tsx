import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { WixDesignSystemProvider } from '@wix/design-system';
import { withDashboard, EnvironmentState } from '@wix/dashboard-react';
import { useEnvironment } from '@wix/sdk-react';

const queryClient = new QueryClient();

export function withProviders<P extends {} = {}>(Component: React.FC<P>) {
  return withDashboard(function DashboardProviders(props: P) {
    const { locale } = useEnvironment<EnvironmentState>();
    return (
      <WixDesignSystemProvider locale={locale} features={{ newColorsBranding: true }}>
        <QueryClientProvider client={queryClient}>
          <Component {...props} />
        </QueryClientProvider>
      </WixDesignSystemProvider>
    );
  });
}
