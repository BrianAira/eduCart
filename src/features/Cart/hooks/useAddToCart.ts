import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/axiosInstance";
import type { CartItem } from "../types/cartItem";

interface AddToCartPayload {
  product_id: number;
  quantity: number;
}

export function useAddToCart() {
  const qc = useQueryClient();

  return useMutation<CartItem, Error, AddToCartPayload>({
    mutationFn: async (payload: AddToCartPayload):Promise<CartItem> => {
      const { data } = await api.post("/cart/add", payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] }); 
    },
    onError:(error)=>{
      console.error("Error al agregar carrito", error);
    }
  });
}
