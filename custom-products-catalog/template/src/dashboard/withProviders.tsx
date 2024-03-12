import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { WixDesignSystemProvider } from '@wix/design-system';

const queryClient = new QueryClient();

export function withProviders<P extends {} = {}>(Component: React.FC<P>) {
  return function DashboardProviders(props: P) {
    return (
      <WixDesignSystemProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...props} />
        </QueryClientProvider>
      </WixDesignSystemProvider>
    );
  };
}
