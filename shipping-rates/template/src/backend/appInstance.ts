import { auth } from "@wix/essentials";
import { appInstances } from "@wix/app-management";

export async function getAppInstance(): Promise<
  appInstances.AppInstance | undefined
> {
  try {
    const elevatedAppInstance = auth.elevate(appInstances.getAppInstance);
    const appInstance = (await elevatedAppInstance()).instance;

    return appInstance;
  } catch (error) {
    console.log("Failed loading app instance", error);
  }
}

export function isPremiumInstance(
  appInstance: appInstances.AppInstance
): boolean {
  return !!appInstance.billing && !appInstance.isFree;
}
