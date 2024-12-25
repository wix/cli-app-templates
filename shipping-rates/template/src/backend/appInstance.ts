import { auth } from "@wix/essentials";
import { appInstances } from "@wix/app-management";

export async function getAppInstanceElevated(): Promise<
  appInstances.AppInstance | undefined
> {
  try {
    const { instance: appInstance } = await auth.elevate(
      appInstances.getAppInstance
    )();

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
