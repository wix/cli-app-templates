import React from 'react';
import { WixDesignSystemProvider } from '@wix/design-system';
import { WixPatternsProvider } from '@wix/patterns/provider';

export function withProviders<P extends {} = {}>(Component: React.FC<P>) {
  return function DashboardProviders(props: P) {
    return (
      <WixDesignSystemProvider features={{ newColorsBranding: true }}>
        <WixPatternsProvider>
          <Component {...props} />
        </WixPatternsProvider>
      </WixDesignSystemProvider>
    );
  };
}
