"use client";

// import { handleCart } from "@/actions/server/cart";
// import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const CartButton = ({ product }) => {
//   const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const isLoggedIn = session?.status === "authenticated";

  const handleAddToCart = async () => {
    setIsLoading(true);

    if (isLoggedIn) {
      const result = await handleCart(product._id);

      if (result?.success) {
        Swal.fire({
          title: "Added to Cart",
          text: `${product.title} has been added to your cart`,
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Continue Shopping",
          confirmButtonText: "Go to Checkout",
        }).then((res) => {
          if (res.isConfirmed) {
            router.push("/cart");
          }
        });
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }

      setIsLoading(false);
    } else {
      router.push(`/login?callbackUrl=${pathname}`);
      setIsLoading(false);
    }
  };

  return (
    <button
    //   disabled={session.status === "loading" || isLoading}
      onClick={handleAddToCart}
      className="btn btn-primary w-full flex gap-2"
    >
      <FaCartPlus />
      {/* {isLoading ? "Adding..." : "Add to Cart"} */}
    </button>
  );
};

export default CartButton;