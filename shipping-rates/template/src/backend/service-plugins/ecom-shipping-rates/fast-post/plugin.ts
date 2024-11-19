import { shippingRates } from "@wix/ecom/service-plugins/context";
import { calculatePrice } from "../../../../utils/shipping-calculator";
import { getAppData } from "../../../database";
import { getAppInstance, isPremiumInstance } from "../../../appInstance";

shippingRates.provideHandlers({
  getShippingRates: async ({ request, metadata }) => {
    const appInstance = await getAppInstance();
    const isPremium = appInstance && isPremiumInstance(appInstance);
    const appData = getAppData({ isPremium });

    const currency = metadata.currency;

    return {
      shippingRates: appData.shippingMethods.map(
        ({ code, title, logistics, costs }) => {
          console.log(
            `calculatePrice(request, ${costs})}`,
            calculatePrice(request, costs)
          );

          return {
            code,
            title,
            logistics,
            cost: {
              price: `${calculatePrice(request, costs)}`,
              currency: currency!,
            },
          };
        }
      ),
    };
  },
});
