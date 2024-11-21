import { DEFAULT_APP_DATA, PREMIUM_APP_DATA } from "../consts";
import type { ShippingAppData } from "../types";

export const getAppData = ({ isPremium = false }: { isPremium?: boolean }) => {
  return isPremium ? PREMIUM_APP_DATA : DEFAULT_APP_DATA;
};

export const updateAppDate = (updatedData: ShippingAppData) => {
  console.log("Data updated", updatedData);
};
