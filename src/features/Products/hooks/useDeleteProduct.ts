// src/features/Products/hooks/useDeleteProduct.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/axiosInstance";

export const useDeleteProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const {data} = await api.delete(`/products/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] }); // refresca lista
    },
  });
};
