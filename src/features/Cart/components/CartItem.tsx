import React from "react";
import type { CartItem } from "../types/cartItem";
import { useAppDispatch } from "../../../store/hook";
import { changeQuantity, removeItem } from "../redux/cartSlice";
import { FaTrash } from "react-icons/fa";

interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  // const removeItem = useRemoveFromCart();
  const dispatch=useAppDispatch();


  const {title, price, image}=item;
  const total =price * item.quantity;

  const handleRemove = () => {
    dispatch(removeItem(item.id));
    
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity=item.quantity+delta;

    if (newQuantity <1) {
      // handleRemove();
      return;
    } 
    dispatch(changeQuantity({id:item.id, quantity:newQuantity}));
    
  };

  return (
    <div className="grid grid-cols-12 items-center p-4 border-b border-gray-100 last:border-0 bg-white rounded-md shadow-sm">
      
      <div className="col-span-12 md:col-span-5 flex items-center gap-4 mb-4 md:mb-0">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-16 h-16 object-cover rounded-md"
          />
        )}
        <div>
          <h4 className="font-medium text-gray-800">{title}</h4>
          <button
            onClick={handleRemove}
            // disabled={removeItem.isPending}
            className="text-red-500 text-sm mt-1 hover:text-red-700 flex items-center"
          >
            <FaTrash className="w-4 h-4"></FaTrash>
          </button>
        </div>
      </div>

      
      <div className="col-span-4 md:col-span-2 text-gray-700 text-center mb-4 md:mb-0">
        ${price.toFixed(2)}
      </div>

     
      <div className="col-span-4 md:col-span-3 flex items-center justify-center mb-4 md:mb-0">
        <button
          onClick={() => handleQuantityChange(-1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-100"
        >
          -
        </button>
        <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-100"
        >
          +
        </button>
        
        
      </div>

      
      <div className="col-span-4 md:col-span-2 text-right font-medium text-indigo-600">
        ${total.toFixed(2)}
      </div>
        
      <div>
        
      </div>
    </div>
  );
};
