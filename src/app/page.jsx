import Banner from "@/components/Home/Banner";
import Product from "@/components/Home/Product";
import Categories from "@/components/Home/Categories";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import FlashSale from "@/components/Home/FlashSale";
import Testimonials from "@/components/Home/Testimonials";
import Link from "next/link";

export default async function Home() {
  return (
  
    <main className="space-y-16 md:space-y-24 pb-20 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section>
        <Banner />
      </section>

      {/* 2. Categories Section - standard container layout */}
      <section className="container mx-auto px-4">
        <Categories />
      </section>

      {/* 3. Flash Sale Section - Promotional Urgency */}
      <section className="container mx-auto px-4">
        <FlashSale />
      </section>

      {/* 4. Products Section with Header */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-800 text-center md:text-left">
              Our <span className="text-primary">Best</span> Toys 🧸
            </h2>
            <p className="text-slate-500 font-medium text-center md:text-left mt-2">
              Handpicked magic for your little ones
            </p>
          </div>
          <Link href="/products" className="btn btn-primary btn-outline rounded-2xl px-8 border-2 font-bold hover:scale-105 transition-transform">
            Explore All
          </Link>
        </div>
        <Product />
      </section>

      {/* 5. Trust Indicators (Why Choose Us) */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <WhyChooseUs />
        </div>
      </section>

      {/* 6. Social Proof (Testimonials) */}
      <section className="container mx-auto px-4">
        <Testimonials />
      </section>

    </main>
  );
}