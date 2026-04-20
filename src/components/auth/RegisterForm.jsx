"use client";
import Link from "next/link";
import { SocialButtons } from "./SocialButton";
import { useState } from "react";
import { postUser } from "@/actions/server/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { AiOutlineLoading } from "react-icons/ai";

export const RegisterForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const callbackUrl = params.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.email.endsWith("gmail.com")) {
      Swal.fire("We only Accept Gmail", "Please use a Gmail account to register", "error");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      Swal.fire("Week Password", "Please use at least 6 characters", "error");
      setLoading(false);
      return;
    }
    const result = await postUser(form);

    if (result.acknowledged) {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
        callbackUrl: callbackUrl,
      });
      if (result.ok) {
        Swal.fire("success", "Registered successfully", "success");
        router.push(callbackUrl);
      }
      setLoading(false);
    } else {
      Swal.fire("error", "An account with this email already exists. Please log in ", "error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-base-200">
      <div
        className={` ${
          loading ? " flex opacity-80 inset-0 absolute" : "hidden"
        }  z-20 glass w-full  h-full  justify-center items-center gap-4`}
      >
        <AiOutlineLoading
          size={50}
          className="animate-spin text-primary font-bold"
        />
        <h2 className={`text-xl font-bold animate-pulse`}>
          {" "}
          Processing Registration{" "}
        </h2>
      </div>
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="min 6 character"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary w-full"
            >
              Register
            </button>
          </form>

          <SocialButtons />

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};