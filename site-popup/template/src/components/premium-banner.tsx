import { Box, Button, MarketingLayout } from '@wix/design-system';
import React from 'react';
import { useFreeTrialAvailable, useIsFree, useNavigateToPricingPage } from '../dashboard/hooks/instance';

export const PremiumBanner: React.FC = () => {
  const isFree = useIsFree();
  const isFreeTrialAvailable = useFreeTrialAvailable();
  const navigateToPricingPage = useNavigateToPricingPage();

  const trialButtons = (
    <Box gap={3}>
      <Button
        skin="premium"
        onClick={navigateToPricingPage}
        children="Start Free Trial"
      />
      <Button
        skin="premium"
        priority="secondary"
        onClick={navigateToPricingPage}
        children="See All Plans"
      />
    </Box>
  );

  const plansButtons = (
    <Box gap={3}>
      <Button
        skin="premium"
        children="Select Your Plan"
        onClick={navigateToPricingPage}
      />
    </Box>
  );

  if (isFree) {
    return (
      <MarketingLayout
        title="You need a subscription"
        description="Here is a preview of a site popup. Enroll a premium subscription to setup and configure your site popup."
        actions={isFreeTrialAvailable ? trialButtons : plansButtons}
      />
    );
  }

  return null;
};