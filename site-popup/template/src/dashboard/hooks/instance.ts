import { useCallback, useEffect, useState } from 'react';
import { appInstances } from '@wix/app-management';

// FIXME: Pass APPID when app is generated
// const PRICING_PAGE_URL = 'https://www.wix.com/apps/upgrade/APPIDHERE?appInstanceId=INSTANCEIDHERE'
const getPricingPage = (instanceId: string) => `https://www.wix.com/apps/upgrade/4dc7fcf2-0a37-4ade-83b2-ddde3a29491a?appInstanceId=${instanceId}`

export function useAppInstance() {
  const [appInstance, setAppInstance] = useState<appInstances.AppInstance>();

  useEffect(() => {
    appInstances.getAppInstance()
      .then((appInstance) => setAppInstance(appInstance.instance))
  }, [setAppInstance]);

  console.log({ appInstance }); // FIXME: Remove
  return appInstance;
}

export function useIsFree(): boolean {
  const appInstance = useAppInstance();
  return appInstance?.isFree ?? true;
}

export function useFreeTrialAvailable(): boolean {
  const appInstance = useAppInstance();
  return appInstance?.freeTrialAvailable ?? false;
}

export function useNavigateToPricingPage(): () => void {
  const appInstance = useAppInstance();

  return useCallback(() => {
    if (appInstance?.instanceId) {
      window.open(getPricingPage(appInstance?.instanceId), "_blank");
    }
  }, [appInstance?.instanceId]);
}
