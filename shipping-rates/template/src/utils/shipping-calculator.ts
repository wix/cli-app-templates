import { shippingRates } from "@wix/ecom/service-plugins";
import type { ShippingCosts } from "../types";

export function calculatePrice(
  request: shippingRates.GetShippingRatesRequest,
  shippingCosts: ShippingCosts
): number {
  const units =
    request.lineItems?.reduce((acc, lineItem) => {
      return acc + (lineItem.quantity ?? 1);
    }, 0) ?? 0;

  if (units <= 0) {
    return 0; // Return 0 for an invalid item count.
  }

  // Calculate the total price based on the specified rule.
  const firstItemCost = shippingCosts.first;
  const secondItemCost = shippingCosts.second;
  const additionalItemCost = shippingCosts.thirdAndUp;

  if (units === 1) {
    return firstItemCost;
  } else if (units === 2) {
    return firstItemCost + secondItemCost;
  } else {
    return (
      firstItemCost + secondItemCost + Math.ceil(units - 2) * additionalItemCost
    );
  }
}
