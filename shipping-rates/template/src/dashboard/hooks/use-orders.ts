import { useQuery } from "@tanstack/react-query";
import { orders } from "@wix/ecom";
import type { OrderSummary } from "../../types";

interface useOrdersProps {
  limit: number;
}

export const useOrders = ({ limit }: useOrdersProps) => {
  return useQuery<OrderSummary[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        // Read more about the orders SDK at https://dev.wix.com/docs/sdk/backend-modules/ecom/orders/search-orders
        const searchResponse = await orders.searchOrders({
          search: {
            cursorPaging: {
              limit,
            },
          },
        });

        if (!searchResponse.orders?.length) {
          return [];
        }

        return searchResponse.orders.map(
          (order) =>
            ({
              id: order.number ?? "",
              createdDate: order?._createdDate ?? "",
              totalPrice: Number(order?.priceSummary?.total?.amount) ?? 0,
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
