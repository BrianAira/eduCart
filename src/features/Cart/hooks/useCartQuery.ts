import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/axiosInstance";
import type { CartItem } from "../types/cartItem";


export function useCartQuery() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async (): Promise<CartItem[]> => {
      const { data } = await api.get("/cart/");
      return data;
    },
  });
}
