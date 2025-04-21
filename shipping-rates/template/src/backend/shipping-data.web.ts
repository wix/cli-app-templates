/**
This file allows you to define backend functions that you can call from the front end of this app with type-safety.

Here's how you can call your web method from your frontend code:

import { getShippingData, saveShippingData } from 'backend/shipping-data.web';

getShippingData().then(result => console.log(result));

To learn more, check out our documentation: https://wix.to/6LV6Oka.
*/
import { appInstances } from "@wix/app-management";
import { webMethod, Permissions } from "@wix/web-methods";
import { getAppData, updateAppDate } from "./database";
import { isPremiumInstance } from "./appInstance";
import type { ShippingAppData } from "../types";

export const getShippingData = webMethod(Permissions.Admin, async () => {
  const appInstance = (await appInstances.getAppInstance()).instance;
  const isPremium = appInstance && isPremiumInstance(appInstance);
  const appData = getAppData({ isPremium });

  return appData;
});

export const setShippingData = webMethod(
  Permissions.Admin,
  (shippingData: ShippingAppData) => {
    updateAppDate(shippingData);
    return shippingData;
  }
);
