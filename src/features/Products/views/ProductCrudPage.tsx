import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductTable } from "../Components/ProductTable";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { ProductForm } from "../Components/ProductForm";

export default function ProductCrudPage() {
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();
  const [editingProduct, setEditingProduct] = useState<number | null>(null);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center md:text-left">
        Product Management
      </h1>

      {/* GRID RESPONSIVE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 📝 TABLA - OCUPA 2 COLUMNAS EN DESKTOP */}
        <div className="lg:col-span-2 bg-white shadow-md rounded p-4 overflow-x-auto">
          <ProductTable
            products={products || []}
            onDelete={(id) => deleteProduct.mutate(id)}
            onEdit={(id) => setEditingProduct(id)}
          />
        </div>

        {/* 🧱 FORMULARIO DE CREAR / EDITAR */}
        <div className="bg-white shadow-md rounded p-4 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {editingProduct ? "Edit Product" : "Create Product"}
          </h2>

          <ProductForm
            productId={editingProduct}
            onSuccess={() => setEditingProduct(null)}
          />
        </div>
      </div>
    </section>
  );
}
