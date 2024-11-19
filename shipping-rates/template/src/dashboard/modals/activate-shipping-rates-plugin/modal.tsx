import React, { type FC } from "react";
import { dashboard } from "@wix/dashboard";
import { Text, Box, CustomModalLayout, TextButton } from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import { width, height } from "./modal.json";
import { WixPageId } from "../../../consts";
import { withProviders } from "../../withProviders";

const ActivateShippingRatesModal: FC = () => {
  const { navigate } = dashboard;

  return (
    <CustomModalLayout
      width={width}
      maxHeight={height}
      primaryButtonText="Shipping and Delivery Settings"
      secondaryButtonText="Close"
      onCloseButtonClick={() => dashboard.closeModal()}
      primaryButtonOnClick={() => navigate(WixPageId.SHIPPING_INFO)}
      secondaryButtonOnClick={() => dashboard.closeModal()}
      title="Activate Plugin"
      subtitle="To apply your custom shipping rate logic, activate it as follows"
      content={
        <Box>
          <Text>
            <ol>
              <li>
                Go to the{" "}
                <TextButton onClick={() => navigate(WixPageId.SHIPPING_INFO)}>
                  Shipping and Delivery Settings
                </TextButton>{" "}
                dashboard page.
              </li>
              <li>
                Select the regions to apply the shipping rate logic to and click{" "}
                <b>Edit</b>.
              </li>
              <li>
                Scroll down to <b>Installed apps</b> and click the toggle switch
                next to the app to enable it.
              </li>
            </ol>
          </Text>
        </Box>
      }
    />
  );
};

export default withProviders(ActivateShippingRatesModal);
