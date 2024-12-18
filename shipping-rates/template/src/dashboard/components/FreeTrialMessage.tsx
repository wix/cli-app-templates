import React from "react";
import { SectionHeader  } from "@wix/design-system";
import { appInstances } from "@wix/app-management";
import { formatDate } from "../../utils/utils";

interface FreeTrialMessageProps {
  freeTrialInfo: appInstances.FreeTrialInfo;
}

export function FreeTrialMessage({ freeTrialInfo }: FreeTrialMessageProps) {
  return (
    <SectionHeader
      title={`Your free trial is available to ${formatDate(
        new Date(freeTrialInfo.endDate!)
      )}`}
      size="small"
    />
  );
}
