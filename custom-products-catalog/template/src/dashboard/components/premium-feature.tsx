import React from 'react';
import { FloatingHelper } from '@wix/design-system'
import { useFreeTrialAvailable, useIsFreeApp, useNavigateToPricingPage } from '../hooks/instance';

interface PremiumFeatureProps {
    children: React.ReactNode;
}

export function PremiumFeature({ children }: PremiumFeatureProps) {
    const isFreeApp = useIsFreeApp();
    const isFreeTrialAvailable = useFreeTrialAvailable();
    const navigateToPricingPage = useNavigateToPricingPage();

    if (isFreeApp && isFreeTrialAvailable) {
      return (
        <FloatingHelper
          placement="bottom-end"
          appearance='light'
          initiallyOpened={false}
          target={children}
          content={
            <FloatingHelper.Content
              title="Start your free trial"
              body="You need a premium subscription to access this feature. Start your free trial now."
              actionText='Start Free Trial'
              actionTheme='premium'
              onActionClick={navigateToPricingPage}
            />
          }
        />
      );
    }

    return <>{children}</>;
}
