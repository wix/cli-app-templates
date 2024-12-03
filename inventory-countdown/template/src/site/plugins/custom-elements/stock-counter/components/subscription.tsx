import React from 'react';
import { appInstances } from '@wix/app-management';
import { Banner } from './banner';
import { useNavigateToPricingPage } from '../../../../../hooks/instance';

export const Subscription: React.FC<{instance: appInstances.AppInstance}> = ({instance}) => {
  const {billing, isFree, freeTrialAvailable } = instance;
  const navigateToPricingPage = useNavigateToPricingPage(instance);
  console.log({instance})

  if (isFree && freeTrialAvailable) {
    return (
      <Banner
        appearance="premium"
        title="Free plan available"
        description="Upgrade to a premium plan to unlock countdown customizations."
        action="Start Free Trial"
        actionSkin="premium"
        onActionClick={navigateToPricingPage}
      />
    );
  }

  if (isFree && !freeTrialAvailable) {
    return (
      <Banner
        appearance="premium"
        title="Choose your plan"
        description="Customizations for stock countdown are available only in the premium plan."
        action="Upgrade"
        actionSkin="premium"
        onActionClick={navigateToPricingPage}
      />
    );
  }

  if (!isFree && billing?.freeTrialInfo?.status === appInstances.FreeTrialStatus.IN_PROGRESS) {
    const endDate = new Date(billing?.freeTrialInfo?.endDate!)
    return (
      <Banner
        appearance="standard"
        title="Free Trial in progress"
        description={`Your free trial is available to ${endDate.toLocaleString()}.`}
      />
    );
  }

  return null;
}
