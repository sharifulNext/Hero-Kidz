"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send, MessageCircle, Star } from "lucide-react";
import Swal from "sweetalert2";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Architecture: Separating business logic for maintainability
  const onSubmit = async (data) => {
    try {
      console.log("Form Data Submitted:", data);
      
      // Simulating API response time
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Swal.fire({
        title: "Yay! 🎈",
        text: "We’ve received your message! We’ll get back to you very soon.",
        icon: "success",
        confirmButtonColor: "#3B82F6",
        buttonsStyling: true,
        customClass: {
          popup: 'rounded-[2rem]',
          confirmButton: 'rounded-xl px-6 py-2'
        }
      });
      
      reset();
    } catch (error) {
      Swal.fire("Oops!", "Something went wrong. Please try again!", "error");
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden">
      
      {/* Background Decorations - Hero Kidz Style */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-40 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
        <Star className="absolute top-20 left-1/4 text-blue-600" size={40} />
        <Star className="absolute bottom-40 right-1/4 text-yellow-500" size={30} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-blue-600 mb-4 drop-shadow-sm">
            Say <span className="text-yellow-500">Hello</span> to Us! 🎈
          </h2>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
            Feel free to share your questions or feedback with us. The Hero Kidz team is ready to help you!
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch gap-8">
          
          {/* Left Side: Fun Contact Cards */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-blue-100 border-b-8 border-blue-400 transform hover:-rotate-2 transition-transform">
              <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Email Us</h3>
              <p className="text-slate-500 font-medium break-all">support@herokidz.com</p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-yellow-100 border-b-8 border-yellow-400 transform hover:rotate-2 transition-transform">
              <div className="bg-yellow-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <Phone className="text-yellow-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Call Us</h3>
              <p className="text-slate-500 font-medium">+880 123****</p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-pink-100 border-b-8 border-pink-400 transform hover:-rotate-1 transition-transform">
              <div className="bg-pink-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="text-pink-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Visit Playzone</h3>
              <p className="text-slate-500 font-medium">Sylhet, Bangladesh</p>
            </div>
          </div>

          {/* Right Side: Playful Form */}
          <div className="lg:w-2/3">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-100 border-4 border-dashed border-blue-100">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 ml-2">Your Name</label>
                    <input
                      {...register("name", { required: "Please tell us your name!" })}
                      className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 outline-none transition-all focus:bg-white ${
                        errors.name ? "border-red-300 focus:ring-red-100" : "border-slate-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                      }`}
                      placeholder="Shariful Islam"
                    />
                    {errors.name && <p className="text-red-500 text-xs font-bold ml-2">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 ml-2">Email Address</label>
                    <input
                      {...register("email", { 
                        required: "Email is needed to reply!",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email style!" }
                      })}
                      className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 outline-none transition-all focus:bg-white ${
                        errors.email ? "border-red-300 focus:ring-red-100" : "border-slate-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                      }`}
                      placeholder="hello@kidz.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs font-bold ml-2">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 ml-2">Message</label>
                  <textarea
                    {...register("message", { required: "Write something fun!" })}
                    rows="5"
                    className={`w-full px-6 py-4 rounded-3xl bg-slate-50 border-2 outline-none transition-all resize-none focus:bg-white ${
                      errors.message ? "border-red-300 focus:ring-red-100" : "border-slate-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                    }`}
                    placeholder="Please share your thoughts..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs font-bold ml-2">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black py-5 rounded-2xl shadow-lg shadow-yellow-200 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 text-xl disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    <>
                      Send Message! 🚀
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;