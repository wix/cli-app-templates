import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { WixDesignSystemProvider } from '@wix/design-system';
import { i18n } from '@wix/essentials';

const queryClient = new QueryClient();

export function withProviders<P extends {} = {}>(Component: React.FC<P>) {
  return function DashboardProviders(props: P) {
    const locale = i18n.getLocale();
    return (
      <WixDesignSystemProvider locale={locale} features={{ newColorsBranding: true }}>
        <QueryClientProvider client={queryClient}>
          <Component {...props} />
        </QueryClientProvider>
      </WixDesignSystemProvider>
    );
  };
}
