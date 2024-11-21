import React from "react";
import { Box, Text } from "@wix/design-system";
import { PremiumFilled } from "@wix/wix-ui-icons-common";
import { appInstances } from "@wix/app-management";
import { formatDate } from "../../utils/utils";

interface FreeTrialMessageProps {
  freeTrialInfo: appInstances.FreeTrialInfo;
}

export function FreeTrialMessage({ freeTrialInfo }: FreeTrialMessageProps) {
  return (
    <Box
      backgroundColor="P40"
      padding="SP2"
      verticalAlign="middle"
      gap={2}
      borderBlock="1px solid purple"
    >
      <PremiumFilled />
      <Text size="small">
        {`Your free trial is available to ${formatDate(
          new Date(freeTrialInfo.endDate!)
        )}`}
      </Text>
    </Box>
  );
}
