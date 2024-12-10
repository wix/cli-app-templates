import { Box, Button, MarketingLayout, SectionHelper } from '@wix/design-system';
import React from 'react';
import { useNavigateToPricingPage, useAppInstance } from '../hooks/instance';
import { appInstances } from '@wix/app-management';
import { formatDate } from '../utils/format-date';

export const SubscriptionBanner: React.FC = () => {
  const {data: appInstance } = useAppInstance();
  const navigateToPricingPage = useNavigateToPricingPage();
  const { isFree, freeTrialAvailable, billing } = appInstance ?? {};
  const isFreeTrialInProgress = billing?.freeTrialInfo?.status === appInstances.FreeTrialStatus.IN_PROGRESS;

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
        actions={freeTrialAvailable ? trialButtons : plansButtons}
      />
    );
  }

  if (isFreeTrialInProgress) {
    const endDate = new Date(billing.freeTrialInfo?.endDate!);
    return (
      <SectionHelper
        appearance="standard"
        title="Free Trial in Progress"
        children={`Your free trial is available to ${formatDate(endDate)}.`}
      />
    )
  }

  return null;
};
