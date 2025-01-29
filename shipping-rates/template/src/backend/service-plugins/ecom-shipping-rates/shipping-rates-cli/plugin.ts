import { shippingRates } from "@wix/ecom/service-plugins";
import { calculatePrice } from "../../../../utils/shipping-calculator";
import { getAppData } from "../../../database";
import { getAppInstanceElevated, isPremiumInstance } from "../../../appInstance";

shippingRates.provideHandlers({
  getShippingRates: async ({ request, metadata }) => {
    const appInstance = await getAppInstanceElevated();
    const isPremium = appInstance && isPremiumInstance(appInstance);
    const appData = getAppData({ isPremium });

    return {
      shippingRates: appData.shippingMethods.map(
        ({ code, title, logistics, costs }) => {
          const calculatedPrice = calculatePrice(request, costs);

          console.log(`calculatePrice(request, ${costs})}`, calculatedPrice);

          return {
            code,
            title,
            logistics,
            cost: {
              price: `${calculatedPrice}`,
              currency: metadata.currency!,
            },
          };
        }
      ),
    };
  },
});
