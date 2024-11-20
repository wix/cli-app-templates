import React from 'react';
import { Modal, AnnouncementModalLayout, Text } from '@wix/design-system';
import { useFreeTrialAvailable, useIsFree, useNavigateToPricingPage } from '../hooks/instance';

export default function Paywall() {
  const isFree = useIsFree();
  const isFreeTrialAvailable = useFreeTrialAvailable();
  const navigateToPricingPage = useNavigateToPricingPage();

  if (isFree && isFreeTrialAvailable) {
    return (
      <Modal isOpen>
        <AnnouncementModalLayout
          theme="premium"
          title="Start your free trial"
          primaryButtonText="Start Free Trial"
          primaryButtonOnClick={navigateToPricingPage}
          linkText="See all plans"
          linkOnClick={navigateToPricingPage}
          onCloseButtonClick={navigateToPricingPage}
        >
          <Text>
            You need a premium subscription to access this feature. Start your free trial now.
          </Text>
        </AnnouncementModalLayout>
      </Modal>
    );
  }

  return null;
}
