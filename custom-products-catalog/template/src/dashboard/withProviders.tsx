import React from 'react';
import { WixDesignSystemProvider } from '@wix/design-system';
import { withDashboard, EnvironmentState} from '@wix/dashboard-react';
import { WixPatternsProvider } from '@wix/patterns/provider';
import { useEnvironment } from '@wix/sdk-react';

export function withProviders<P extends {} = {}>(Component: React.FC<P>) {
  return withDashboard(function DashboardProviders(props: P) {
    const { language } = useEnvironment<EnvironmentState>();
    return (
      <WixDesignSystemProvider locale={language} features={{ newColorsBranding: true }}>
        <WixPatternsProvider>
          <Component {...props} />
        </WixPatternsProvider>
      </WixDesignSystemProvider>
    );
  });
}
