import React from "react";
import { SectionHeader, TextButton } from "@wix/design-system";
import { appInstances } from "@wix/app-management";
import { dashboard } from "@wix/dashboard";
import { formatDate } from "../../utils/utils";
import { WixPageId } from "../../consts";

interface FreeTrialMessageProps {
  freeTrialInfo: appInstances.FreeTrialInfo;
}

export function FreeTrialMessage({ freeTrialInfo }: FreeTrialMessageProps) {
  const { navigate } = dashboard;

  return (
    <SectionHeader
      title={`Your free trial is available to ${formatDate(
        new Date(freeTrialInfo.endDate!)
      )}`}
      size="small"
      suffix={
        <TextButton
          size="tiny"
          onClick={() => navigate(WixPageId.SUBSCRIPTIONS)}
        >
          Manage Subscriptions
        </TextButton>
      }
    />
  );
}
