import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { appInstances } from '@wix/app-management';

/*
  This is the URL to the pricing page of the app.
  This url looks like this:
    https://www.wix.com/apps/upgrade/APPIDHERE?appInstanceId=INSTANCEIDHERE
 
  You can find more information about this here:
    https://dev.wix.com/docs/build-apps/launch-your-app/pricing-and-billing/set-up-a-freemium-business-model#step-4--create-an-upgrade-entry-point-to-your-pricing-page
*/
const getPricingPage = (instanceId: string) => `https://www.wix.com/apps/upgrade/<%= devCenter.appId %>?appInstanceId=${instanceId}`

const AppInstanceContext = createContext<appInstances.AppInstance | undefined>(undefined);

export function AppInstanceProvider({ children }: { children: React.ReactNode }) {
  const [appInstance, setAppInstance] = useState<appInstances.AppInstance>();

  useEffect(() => {
    if (!appInstance) {
      appInstances.getAppInstance()
        .then((appInstance) => setAppInstance(appInstance.instance))
    }
  }, [appInstance, setAppInstance]);
  
  return (
    <AppInstanceContext.Provider value={appInstance}>
      {children}
    </AppInstanceContext.Provider>
  )
}

export function useAppInstance(): appInstances.AppInstance | undefined {
  return useContext(AppInstanceContext);
}

export function useIsFreeApp(): boolean {
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
      window.open(getPricingPage(appInstance?.instanceId), '_blank');
    }
  }, [appInstance?.instanceId]);
}
