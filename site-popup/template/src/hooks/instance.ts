import { useCallback, useEffect, useState } from 'react';
import { appInstances } from '@wix/app-management';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@wix/essentials';
import { dashboard } from "@wix/dashboard";

// FIXME: Pass APPID when app is generated
// const PRICING_PAGE_URL = 'https://www.wix.com/apps/upgrade/APPIDHERE?appInstanceId=INSTANCEIDHERE'
const getPricingPage = (instanceId: string) => `https://www.wix.com/apps/upgrade/9ac72a76-61fa-4239-9425-63ef0ff7ede0?appInstanceId=${instanceId}`

export const QUERY_INSTANCE = 'queryInstance';

export function useAppInstance() {
  return useQuery<appInstances.AppInstance>({
    queryKey: [QUERY_INSTANCE],
    queryFn: async () => {
      try {
        const response = await httpClient.fetchWithAuth(
          `${import.meta.env.BASE_API_URL}/instance`
        );
        return response.json();
      } catch (error) {
        console.log("Error fetching instance:", error);
      }
    },
  });
}

export function useNavigateToPricingPage(): () => void {
  const { data: appInstance } = useAppInstance();

  return useCallback(() => {
    if (appInstance?.instanceId) {
      window.open(getPricingPage(appInstance?.instanceId), "_blank");
    }
  }, [appInstance?.instanceId]);
}
