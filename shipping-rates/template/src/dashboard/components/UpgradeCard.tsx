import React from "react";
import { Box, Button, Heading } from "@wix/design-system";
import { AppMarket } from "@wix/wix-ui-icons-common";
import { appInstances } from "@wix/app-management";
import { appId } from "../../../wix.config.json";

interface UpgradeCardProps {
  appInstance: appInstances.AppInstance;
}

export function UpgradeCard({ appInstance }: UpgradeCardProps) {
  const instanceId = appInstance?.instanceId;
  const pricingPageURL =
    instanceId &&
    `https://www.wix.com/apps/upgrade/${appId}?appInstanceId=${instanceId}`;

  return (
    <Box
      align="center"
      backgroundColor="D60"
      padding="SP5"
      gap="SP3"
      border="1px dashed"
      borderColor="D50"
      borderRadius="5px"
      direction="vertical"
    >
      <Heading size="medium">Need an express delivery option?</Heading>
      <Button
        size="small"
        prefixIcon={<AppMarket />}
        onClick={() => window.open(pricingPageURL)}
      >
        {`Click here to ${
          appInstance.freeTrialAvailable ? "start a free trial" : "upgrade"
        }`}
      </Button>
    </Box>
  );
}
