import React from 'react';
import { WixDesignSystemProvider } from '@wix/design-system';
import { withDashboard } from '@wix/dashboard-react';
import { WixPatternsProvider } from '@wix/patterns/provider';
import { i18n } from '@wix/essentials';

export function withProviders<P extends {} = {}>(Component: React.FC<P>) {
  return withDashboard(function DashboardProviders(props: P) {
    const locale = i18n.getLocale();
    return (
      <WixDesignSystemProvider locale={locale} features={{ newColorsBranding: true }}>
        <WixPatternsProvider>
          <Component {...props} />
        </WixPatternsProvider>
      </WixDesignSystemProvider>
    );
  });
}
