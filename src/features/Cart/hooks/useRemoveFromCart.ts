// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { api } from "../../../lib/axiosInstance";

// export function useRemoveFromCart() {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: async (itemId: number) => {
//       await api.delete(`/cart/${itemId}`);
//     },
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["cart"]});
//     },
//   });
// }


