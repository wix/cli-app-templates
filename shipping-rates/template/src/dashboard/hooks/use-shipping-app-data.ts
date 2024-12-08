import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@wix/essentials";
import type { ShippingAppData } from "../../types";
import { DEFAULT_APP_DATA } from "../../consts";

const queryKey = ["shipping-app-data"];

export const useShippingAppData = () => {
  const queryClient = useQueryClient();

  const getShippingAppData = useQuery<ShippingAppData>({
    queryKey,
    queryFn: async () => {
      try {
        const response = await httpClient.fetchWithAuth(
          `${import.meta.env.BASE_API_URL}/shipping-data`
        );

        return response.json();
      } catch (error) {
        console.log("error fetching data:", error);

        return DEFAULT_APP_DATA;
      }
    },
  });

  const setShippingAppData = useMutation({
    mutationFn: async (newData: ShippingAppData) => {
      return httpClient.fetchWithAuth(
        `${import.meta.env.BASE_API_URL}/shipping-data`,
        {
          method: "POST",
          body: JSON.stringify(newData),
        }
      );
    },
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    getShippingAppData,
    setShippingAppData,
  };
};
