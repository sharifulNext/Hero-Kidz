import { getCart } from "@/actions/server/cart";
import Cart from "@/components/home/Cart";
import { TbHorseToy } from "react-icons/tb";
import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import Link from "next/link";

const CartPage = async () => {
  // 1. Business Logic Layer: Data fetching from MongoDB
  const cartItems = await getCart();
  
  // 2. Data Transformation (CRITICAL FIX): 

  const formattedItems = cartItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
    productId: item.productId?.toString(), 
  }));

  return (
    <div className="container mx-auto px-4 py-10 min-h-[70vh]">
      {/* --- Section Title (Hero Kidz Style) --- */}
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 border-l-8 border-primary pl-6 flex items-center gap-4">
          My <span className="text-primary">Cart</span> 
          <FaShoppingBasket className="text-yellow-400" size={36} />
        </h2>
        <p className="text-slate-500 mt-2 ml-10 font-medium italic">
          Check out your favorite toys before they fly away! 🚀
        </p>
      </div>

      {/* --- Conditional Rendering (Empty vs Active Cart) --- */}
      {formattedItems.length === 0 ? (
        // Playful Empty State UI
        <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-[2.5rem] shadow-2xl shadow-blue-50 border-4 border-dashed border-blue-100 text-center space-y-6">
          <div className="bg-yellow-100 p-8 rounded-full animate-bounce">
            <TbHorseToy className="text-yellow-600" size={80} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              Your cart is <span className="text-primary">Empty!</span> 🎈
            </h2>
            <p className="text-slate-500 text-lg max-w-md mx-auto font-medium">
              Looks like you haven&apos;t added any magic to your cart yet. Let&apos;s find some toys!
            </p>
          </div>

          <Link
            href="/products"
            className="btn btn-primary btn-lg px-10 rounded-2xl shadow-lg shadow-blue-200 hover:scale-105 transition-transform flex items-center gap-3 font-bold"
          >
            <TbHorseToy size={24} />
            Explore Toys
          </Link>
        </div>
      ) : (
        // Active Cart UI
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Passing the sanitized/plain objects to the Client Component */}
          <Cart cartItem={formattedItems} />
        </div>
      )}
    </div>
  );
};

export default CartPage;