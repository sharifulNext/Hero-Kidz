"use client";
import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const CartButton = ({ product }) => {
  const session = useSession();
  const path = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isLogin = session?.status === "authenticated";

  const handleAdd2Cart = async () => {
    setIsLoading(true);
    
    if (isLogin) {
      try {
        const result = await handleCart(product._id);
        
        if (result.success) {
          Swal.fire({
            title: "Added to Cart!",
            text: `${product.title} has been successfully added to your cart.`,
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Continue Shopping",
            confirmButtonText: "Go to Checkout",
          }).then((res) => {
            if (res.isConfirmed) router.push("/cart");
          });
        } else {
          Swal.fire("Error", "Something went wrong. Please try again.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to add product to cart.", "error");
      } finally {
        setIsLoading(false);
      }
    } else {
      // User not logged in
      router.push(`/login?callbackUrl=${path}`);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        disabled={session.status === "loading" || isLoading}
        onClick={handleAdd2Cart}
        className="btn btn-primary w-full flex gap-2 items-center justify-center"
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <>
            <FaCartPlus />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
};

export default CartButton;