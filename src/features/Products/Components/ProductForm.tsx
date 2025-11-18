import { useForm } from "react-hook-form";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useProductById } from "../hooks/useProductById";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import type { ProductCreate } from "../types/product";

interface ProductFormProps {
  productId: number | null;
  onSuccess: () => void;
}

export const ProductForm = ({ productId, onSuccess }: ProductFormProps) => {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const { data: product } = useProductById(productId);
  
  const { register, handleSubmit, reset } = useForm<ProductCreate>({
    defaultValues: product || {},
  });

  const onSubmit = (data: ProductCreate) => {
    if (productId) {
      updateProduct.mutate(
        { id: productId, ...data },
        { onSuccess }
      );
    } else {
      createProduct.mutate(data, {
        onSuccess: () => {
          reset();
          onSuccess();
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 shadow-md rounded max-w-lg mx-auto"
    >
      <h2 className="text-lg font-semibold mb-4">
        {productId ? "Edit Product" : "Create Product"}
      </h2>

      {/* name */}
      <input
        {...register("name", { required: true })}
        placeholder="Product Name"
        className="w-full mb-2 p-2 border rounded"
      />

      {/* price */}
      <input
        {...register("price", { valueAsNumber: true, required: true })}
        type="number"
        step="0.01"
        placeholder="Price"
        className="w-full mb-2 p-2 border rounded"
      />

      {/* category */}
      <input
        {...register("category", { required: true })}
        placeholder="Category"
        className="w-full mb-2 p-2 border rounded"
      />

      {/* description */}
      <textarea
        {...register("description", { required: true })}
        placeholder="Description"
        className="w-full mb-2 p-2 border rounded"
      />

      {/* image_url */}
      <input
        {...register("image_url", { required: true })}
        placeholder="Image URL"
        className="w-full mb-2 p-2 border rounded"
      />

      {/* rating */}
      <input
        {...register("rating", { valueAsNumber: true, required: true })}
        type="number"
        step="0.1"
        min="0"
        max="5"
        placeholder="Rating (0-5)"
        className="w-full mb-4 p-2 border rounded"
      />

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        {productId ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
};
