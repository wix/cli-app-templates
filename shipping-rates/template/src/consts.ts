import { ShippingAppData } from "./types/types";

export const DEFAULT_APP_DATA: ShippingAppData = {
  shippingMethods: [
    {
      code: "example-shipping-rate-standard",
      title: "Standard Delivery",
      logistics: {
        deliveryTime: "3-7 days",
      },
      costs: {
        first: 5,
        second: 2,
        thirdAndUp: 1,
      },
    },
  ],
};

export const PREMIUM_APP_DATA: ShippingAppData = {
  shippingMethods: [
    ...DEFAULT_APP_DATA.shippingMethods,
    {
      code: "example-shipping-rate-express",
      title: "Express Delivery",
      logistics: {
        deliveryTime: "1-2 days",
      },
      costs: {
        first: 15,
        second: 6,
        thirdAndUp: 1,
      },
    },
  ],
};

export enum WixPageId {
  SHIPPING_INFO = "26128445-061b-4dfc-bc44-fd53b13dd687",
  MANAGE_APPS = "ad471122-7305-4007-9210-2a764d2e5e57",
  MANAGE_ORDERS = "8107f05f-d646-4c81-be90-adf28d321398",
}

export const ACTIVATE_PLUGIN_MODAL_ID = "868a4dfd-269a-4e68-8099-f4ea03594507";
export const APP_ID = "a033018e-233a-4ddc-8471-1151d8974866";
