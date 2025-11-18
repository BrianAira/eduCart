import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/axiosInstance";
import type {  ProductCreate } from "../types/product";

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductCreate) => api.post("/products", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};
