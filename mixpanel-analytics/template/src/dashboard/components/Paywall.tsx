import React from 'react';
import { Modal, AnnouncementModalLayout, Text, AnnouncementModalLayoutProps } from '@wix/design-system';
import { useFreeTrialAvailable, useIsFree, useNavigateToPricingPage } from '../hooks/instance';

export default function Paywall() {
  const isFree = useIsFree();
  const isFreeTrialAvailable = useFreeTrialAvailable();
  const navigateToPricingPage = useNavigateToPricingPage();

  const freeTrialModal: AnnouncementModalLayoutProps = {
    title: 'Start your free trial',
    primaryButtonText: 'Start Free Trial',
    primaryButtonOnClick: navigateToPricingPage,
    linkText: 'See all plans',
    linkOnClick: navigateToPricingPage,
    onCloseButtonClick: navigateToPricingPage,
  };

  const planRequiredModal: AnnouncementModalLayoutProps = {
    title: 'You need a premium subscription',
    primaryButtonText: 'Select your plan',
    primaryButtonOnClick: navigateToPricingPage,
    onCloseButtonClick: navigateToPricingPage,
  };

  if (isFree) {
    return (
      <Modal isOpen>
        <AnnouncementModalLayout
          theme="premium"
          {...isFreeTrialAvailable ? freeTrialModal : planRequiredModal}
        >
          <Text>
            You need a premium subscription to access this page.
          </Text>
        </AnnouncementModalLayout>
      </Modal>
    );
  }

  return null;
}