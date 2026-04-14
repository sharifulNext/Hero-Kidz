import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center gap-10 py-12 px-4 md:px-0">

      {/* Left Content */}
      <div className="flex-1 space-y-6 text-center md:text-left">

        {/* Badge */}
        <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1 rounded-full">
          🎉 Up to 15% Off — Limited Time!
        </span>

        {/* Headline */}
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-800">
          Give Your Child{" "}
          <span className="text-primary">The Best Toys</span>{" "}
          for a Bright Future
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-base md:text-lg max-w-md">
          Discover our wide range of safe, fun, and educational toys — 
          designed to spark creativity in every child.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
          <Link
            href="/products"
            className="btn btn-primary px-6 py-3 rounded-lg font-semibold"
          >
            🛒 Explore Products
          </Link>
          <Link
            href="/about"
            className="btn btn-outline px-6 py-3 rounded-lg font-semibold"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-1 flex justify-center">
        <Image
          src="/assets/hero.png"
          alt="Happy child playing with toys"
          width={500}
          height={400}
          priority
          className="object-contain drop-shadow-xl"
        />
      </div>

    </section>
  );
};

export default Banner;