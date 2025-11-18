import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import type { CartItem } from "../types/cartItem";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";

// interface OrderSummaryProps {
//   subtotal: number;
//   shipping: number;
//   tax: number;
//   total: number;
// }

export const OrderSummary: React.FC= () => {

    const cartItems=useAppSelector((state)=>state.cart.items);

    const {isAuthenticated}=useAppSelector((state)=>state.auth)

    const dispatch=useAppDispatch();
    const navigate=useNavigate();

    const subtotal=useMemo((
      
    )=>cartItems.reduce((acc:number, item:CartItem)=>acc+item.price*item.quantity,0),[cartItems]
    );

    const shipping=subtotal>100?0:9.99;
    const tax=subtotal *0.08;
    const total=subtotal+shipping+tax;

    const handleCheckout=()=>{
      if(!isAuthenticated){
        navigate("/login",{
          state:{ 
            from:"/cart",
            message:"Necesitas iniciar sesion para continuar"
        },
      });
      return;

      }
      dispatch(clearCart());
      navigate("/checkout-success");
    };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Order Summary
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-indigo-600">${total.toFixed(2)}</span>
        </div>
      </div>

      <button 
      className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium mb-3"
      disabled={cartItems.length===0}
      onClick={handleCheckout}>
        Proceed to Checkout
      </button>

      <p className="text-sm text-gray-500 text-center">or</p>

      <a
        href="/products"
        className="block text-center mt-3 text-indigo-600 hover:text-indigo-700 font-medium"
      >
        Continue Shopping
      </a>
    </div>
  );
};
