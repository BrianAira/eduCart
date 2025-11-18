// src/features/Cart/views/CheckoutSuccessPage.tsx
import { Link } from "react-router-dom";

export default function CheckoutSuccessPage() {
  return (
    <main className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Gracias por su compra
      </h1>
      <p className="text-gray-600 mb-8">
        Orden ejecutada con exito
      </p>

      <Link
        to="/products"
        className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
      >
        Continue Shopping
      </Link>
    </main>
  );
}
