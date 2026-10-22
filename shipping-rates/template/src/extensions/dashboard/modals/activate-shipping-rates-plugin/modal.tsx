import React, { type FC } from 'react';
import { dashboard } from '@wix/dashboard';
import { Text, CustomModalLayout, TextButton } from '@wix/design-system';
import modalExtension from './modal.extension.ts';
import { WixPageId } from '../../../../consts';
import { withProviders } from '../../withProviders';
import '@wix/design-system/styles.global.css';

const ActivateShippingRatesModal: FC = () => {
  const { navigate } = dashboard;

  return (
    <CustomModalLayout
      width={modalExtension.options.width}
      maxHeight={modalExtension.options.height}
      primaryButtonText="Shipping and Delivery Settings"
      secondaryButtonText="Close"
      onCloseButtonClick={() => dashboard.closeModal()}
      primaryButtonOnClick={() => navigate(WixPageId.SHIPPING_INFO)}
      secondaryButtonOnClick={() => dashboard.closeModal()}
      title={modalExtension.options.title}
      subtitle="To apply your custom shipping rate logic, activate it as follows"
      content={
        <Text>
          <ol>
            <li>
              Go to the{' '}
              <TextButton onClick={() => navigate(WixPageId.SHIPPING_INFO)}>
                Shipping and Delivery Settings
              </TextButton>{' '}
              dashboard page.
            </li>
            <li>
              Select the regions to apply the shipping rate logic to and click <b>Edit</b>.
            </li>
            <li>
              Scroll down to <b>Installed apps</b> and click the toggle switch next to the app to
              enable it.
            </li>
          </ol>
        </Text>
      }
    />
  );
};

export default withProviders(ActivateShippingRatesModal);
