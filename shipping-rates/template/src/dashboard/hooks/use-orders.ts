import { useQuery } from "@tanstack/react-query";
import { orders } from "@wix/ecom";
import { OrderSummary } from "../../types/types";

interface useOrdersProps {
  limit: number;
}

export const useOrders = ({ limit }: useOrdersProps) => {
  return useQuery<OrderSummary[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        // Read more about the orders SDK at https://dev.wix.com/docs/sdk/backend-modules/ecom/orders/search-orders
        const searchRespons = await orders.searchOrders({
          search: {
            cursorPaging: {
              limit,
            },
          },
        });

        if (!searchRespons.orders || searchRespons.orders.length === 0)
          return [];

        return searchRespons.orders.map(
          (order) =>
            ({
              id: order.number ?? "",
              createdDate: order?._createdDate ?? "",
              totalPrice: order?.priceSummary?.total?.amount ?? 0,
              currency: order?.currency ?? "USD",
            } as OrderSummary)
        );
      } catch (error) {
        console.error("Failed to fetch orders: ", error);
        return [];
      }
    },
  });
};
