// "use client";

// // import { handleCart } from "@/actions/server/cart";
// // import { useSession } from "next-auth/react";
// import { usePathname, useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { FaCartPlus } from "react-icons/fa";
// import Swal from "sweetalert2";

// const CartButton = ({ product }) => {
// //   const session = useSession();
//   const pathname = usePathname();
//   const router = useRouter();
// //   const [isLoading, setIsLoading] = useState(false);

// //   const isLoggedIn = session?.status === "authenticated";

//   const handleAddToCart = async () => {
//     setIsLoading(true);

//     if (isLoggedIn) {
//       const result = await handleCart(product._id);

//       if (result?.success) {
//         Swal.fire({
//           title: "Added to Cart",
//           text: `${product.title} has been added to your cart`,
//           icon: "success",
//           showCancelButton: true,
//           confirmButtonColor: "#3085d6",
//           cancelButtonColor: "#d33",
//           cancelButtonText: "Continue Shopping",
//           confirmButtonText: "Go to Checkout",
//         }).then((res) => {
//           if (res.isConfirmed) {
//             router.push("/cart");
//           }
//         });
//       } else {
//         Swal.fire("Error", "Something went wrong", "error");
//       }

//       setIsLoading(false);
//     } else {
//       router.push(`/login?callbackUrl=${pathname}`);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <button
//     //   disabled={session.status === "loading" || isLoading}
//       onClick={handleAddToCart}
//       className="btn btn-primary w-full flex gap-2"
//     >
//       <FaCartPlus />
//       {/* {isLoading ? "Adding..." : "Add to Cart"} */}
//       Add To Cart
//     </button>
//   );
// };

// export default CartButton;

"use client";

import { handleCart } from "@/actions/server/cart"; // Apnar server action
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const CartButton = ({ product }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Authentication check
  const isLoggedIn = status === "authenticated";

  const handleAddToCart = async () => {
    // ১. User login na thakle redirect korun
    if (!isLoggedIn) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to add products to your cart.",
        icon: "info",
        confirmButtonText: "Login Now",
      }).then((res) => {
        if (res.isConfirmed) {
          router.push(`/login?callbackUrl=${pathname}`);
        }
      });
      return;
    }

    // ২. User login thakle server action call korun
    setIsLoading(true);
    try {
      const result = await handleCart(product._id);

      if (result?.success) {
        Swal.fire({
          title: "Success!",
          text: `${product.title} added to cart`,
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Checkout",
          cancelButtonText: "Continue",
        }).then((res) => {
          if (res.isConfirmed) router.push("/cart");
        });
      } else {
        Swal.fire("Error", "Failed to add item. Try again.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Server side error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={status === "loading" || isLoading}
      onClick={handleAddToCart}
      className={`w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg text-sm hover:opacity-90 transition ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <FaCartPlus />
      {isLoading ? "Processing..." : "Add to Cart"}
    </button>
  );
};

export default CartButton;