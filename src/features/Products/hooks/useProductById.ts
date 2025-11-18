// src/features/Products/hooks/useProductById.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/axiosInstance";
import type { Product } from "../types/product";

export const useProductById = (id: number | null) =>
  useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
    enabled: !!id, // Solo hace la query si hay un id válido
  });
