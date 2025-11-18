import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product";
import { api } from "../../../lib/axiosInstance";

interface ProductFilters {
  category?: string;
  maxPrice?: number;
  sort?: string;
}

export const useProducts = (filters?:ProductFilters) =>
  useQuery<Product[]>({
    queryKey: ["products", filters],
    queryFn: async ():Promise<Product[]> => {
      const params:Record<string,any>={};

      if (filters?.category && filters.category !== "All")
        params.category = filters.category;

      if (filters?.maxPrice) params.max_price = filters.maxPrice;

      if (filters?.sort && filters.sort !== "default") params.sort = filters.sort;
      const { data } = await api.get("/products/", {params});
      return data;

    },

    staleTime:1000*60*5,
    retry:2,
    refetchOnWindowFocus:false,
    // gcTime:1000*60*10,

  });
