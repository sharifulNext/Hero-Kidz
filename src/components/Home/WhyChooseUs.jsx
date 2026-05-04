import React from "react";
import { FaShieldAlt, FaTruck, FaMedal, FaHeart } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaShieldAlt className="text-blue-500" size={40} />,
      title: "100% Safe & Secure",
      description: "We use non-toxic, eco-friendly materials that are perfectly safe for your little ones to play with.",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      icon: <FaTruck className="text-yellow-500" size={40} />,
      title: "Fast Home Delivery",
      description: "Get your favorite toys delivered to your doorstep within 24-48 hours across the country.",
      bgColor: "bg-yellow-50",
    },
    {
      id: 3,
      icon: <FaMedal className="text-green-500" size={40} />,
      title: "Premium Quality",
      description: "Each toy is handpicked and quality-tested to ensure maximum durability and endless fun.",
      bgColor: "bg-green-50",
    },
    {
      id: 4,
      icon: <FaHeart className="text-pink-500" size={40} />,
      title: "Made with Love",
      description: "Every product in our shop is selected with the same care we use for our own children.",
      bgColor: "bg-pink-50",
    },
  ];

  return (
    <div className="py-10">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">
          Why Parents <span className="text-primary">Trust Us</span>? 🛡️
        </h2>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">
          We prioritize your child's happiness and safety above everything else. 
          Discover why Hero Kidz is the favorite toy shop for thousands of families.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="group p-8 rounded-[2.5rem] bg-white border-2 border-slate-50 shadow-xl shadow-slate-100 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300"
          >
            {/* Icon Container */}
            <div
              className={`w-20 h-20 ${feature.bgColor} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
            >
              {feature.icon}
            </div>

            {/* Content */}
            <h3 className="text-xl font-extrabold text-slate-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;