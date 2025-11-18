// import { useMemo } from "react";
import { CartItemCard } from "../components/CartItem";
import { OrderSummary } from "../components/OrderSummary";
import { useAppSelector } from "../../../store/hook";
import type { CartItem } from "../types/cartItem";


export default function CartPage() {
  // const [cart, setCart] = useState<CartItem[]>(mockCart);
  const cartItems=useAppSelector((state)=>state.cart.items);

  // const subtotal = useMemo(
    // () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    // [cartItems]
  // );
  // const shipping = subtotal > 100 ? 0 : 9.99;
  // const tax = subtotal * 0.08;
  // const total = subtotal + shipping + tax;

  return (
    <main className="grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8">
        Your Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 🧾 Lista de productos */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Encabezado solo en desktop */}
            <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-medium text-gray-700">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {cartItems.length > 0 ? (
              cartItems.map((item:CartItem) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                />
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="text-gray-300 text-6xl mb-4"></div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-4">
                  Looks like you haven't added anything yet.
                </p>
                <a
                  href="/products"
                  className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                >
                  Browse Products
                </a>
              </div>
            )}
          </div>
        </div>

        
        <div className="lg:w-1/3">
          <OrderSummary/>
        </div>
      </div>
    </main>
  );
}
