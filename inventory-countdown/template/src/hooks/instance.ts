import { useCallback } from 'react';
import { appInstances } from '@wix/app-management';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@wix/essentials';

// FIXME: Pass APPID when app is generated
// const PRICING_PAGE_URL = 'https://www.wix.com/apps/upgrade/APPIDHERE?appInstanceId=INSTANCEIDHERE'
const getPricingPage = (instanceId: string) => `https://www.wix.com/apps/upgrade/49c252d3-c771-41db-ba55-0f3eb39f8f09?appInstanceId=${instanceId}`

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

export function useNavigateToPricingPage(instance: appInstances.AppInstance): () => void {
  return useCallback(() => {
    if (instance?.instanceId) {
      window.open(getPricingPage(instance?.instanceId), "_blank");
    }
  }, [instance?.instanceId]);
}
