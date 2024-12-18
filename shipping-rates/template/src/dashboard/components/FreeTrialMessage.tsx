import React from "react";
import { SectionHelper } from "@wix/design-system";
import { appInstances } from "@wix/app-management";
import { formatDate } from "../../utils/utils";

interface FreeTrialMessageProps {
  freeTrialInfo: appInstances.FreeTrialInfo;
}

export function FreeTrialMessage({ freeTrialInfo }: FreeTrialMessageProps) {
  return (
    <SectionHelper size="small" appearance="standard">
      {`Your free trial is available to ${formatDate(
        new Date(freeTrialInfo.endDate!)
      )}`}
    </SectionHelper>
  );
}
