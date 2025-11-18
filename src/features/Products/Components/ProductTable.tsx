import type { Product } from "../types/product";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export const ProductTable = ({ products, onDelete, onEdit }: ProductTableProps) => {
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr className="bg-gray-100 border-b">
          <th className="p-3 text-left">Title</th>
          <th className="p-3 text-left">Price</th>
          <th className="p-3 text-left">Category</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="border-b hover:bg-gray-50">
            <td className="p-3">{p.title}</td>
            <td className="p-3">${p.price.toFixed(2)}</td>
            <td className="p-3">{p.category}</td>
            <td className="p-3 space-x-2">
              <button
                onClick={() => onEdit(p.id!)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p.id!)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
