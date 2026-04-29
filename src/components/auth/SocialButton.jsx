"use client";
import { signIn } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

export const SocialButtons = () => {
  const params = useSearchParams();

  const handleSignIn = async () => {
    const result = await signIn("google", {
      redirect: false,
      callbackUrl: params.get("callbackUrl") || "/",
    });

    if (result?.ok) {
      Swal.fire("Success", "You have been signed in successfully.", "success");
    } else if (result?.error) {
      Swal.fire("Error", result.error, "error");
    }
  };

  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={handleSignIn}
        className="btn btn-outline btn-error flex-1"
      >
        <FaGoogle className="text-lg" />
        Google
      </button>
    </div>
  );
};