// src/features/Products/hooks/useUpdateProduct.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/axiosInstance";
import type {  ProductUpdate } from "../types/product";

interface UpdatePayload extends ProductUpdate {
  id: number;
}

export const useUpdateProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdatePayload) => {
      const res = await api.put(`/products/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
