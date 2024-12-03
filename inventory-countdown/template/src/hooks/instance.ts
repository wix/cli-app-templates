import { useCallback } from 'react';
import { appInstances } from '@wix/app-management';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@wix/essentials';

/*
  This is the URL to the pricing page of the app.
  This url looks like this:
    https://www.wix.com/apps/upgrade/APPIDHERE?appInstanceId=INSTANCEIDHERE
 
  You can find more information about this here:
    https://dev.wix.com/docs/build-apps/launch-your-app/pricing-and-billing/set-up-a-freemium-business-model#step-4--create-an-upgrade-entry-point-to-your-pricing-page
*/
const getPricingPage = (instanceId: string) => `https://www.wix.com/apps/upgrade/<%= devCenter.appId %>?appInstanceId=${instanceId}`

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
