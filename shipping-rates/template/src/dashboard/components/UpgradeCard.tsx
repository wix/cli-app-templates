import React from "react";
import { Box, Button, Heading } from "@wix/design-system";
import { Premium } from "@wix/wix-ui-icons-common";
import { appInstances } from "@wix/app-management";
import { getPricingPageURL } from "../../utils/utils";

interface UpgradeCardProps {
  appInstance: appInstances.AppInstance;
}

export function UpgradeCard({ appInstance }: UpgradeCardProps) {
  const pricingPageURL =
    appInstance &&
    appInstance.instanceId &&
    getPricingPageURL(appInstance.instanceId);

  return (
    <>
      <Box
        align="center"
        backgroundColor="D60"
        padding="SP5"
        gap="SP3"
        border="1px dashed"
        borderColor="D50"
        borderRadius="5px"
        display="flex"
        direction="vertical"
      >
        <Heading size="medium">Need more delivery options?</Heading>
        <Button
          size="small"
          skin="premium"
          prefixIcon={<Premium />}
          onClick={() => window.open(pricingPageURL, "_blank")}
        >
          Click here to{" "}
          {appInstance.freeTrialAvailable ? "start a free trial" : "upgrade"}
        </Button>
      </Box>
    </>
  );
}
