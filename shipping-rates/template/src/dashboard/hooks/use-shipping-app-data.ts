import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getShippingData,
  setShippingData,
} from "../../backend/shipping-data.web";
import type { ShippingAppData } from "../../types";
import { DEFAULT_APP_DATA } from "../../consts";

const queryKey = ["shipping-app-data"];

export const useShippingAppData = () => {
  const queryClient = useQueryClient();

  const getShippingAppData = useQuery<ShippingAppData>({
    queryKey,
    queryFn: async () => {
      try {
        return await getShippingData();
      } catch (error) {
        console.log("error fetching data:", error);

        return DEFAULT_APP_DATA;
      }
    },
  });

  const setShippingAppData = useMutation({
    mutationFn: async (newData: ShippingAppData) => {
      return setShippingData(newData);
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
