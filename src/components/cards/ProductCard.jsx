"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar, FaShoppingCart, FaEye } from "react-icons/fa";

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const {
    _id,
    title,
    image,
    price,
    discount = 0,
    ratings = 0,
    reviews = 0,
    sold = 0,
  } = product;

  const discountedPrice =
    discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <div className="group w-full bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
      {/* Image */}
      <div className="relative h-52 w-full bg-gray-50">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-2 group-hover:scale-105 transition"
        />

        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-sm font-semibold line-clamp-2 h-10">
          {title}
        </h2>

        {/* Rating */}
        <div className="flex justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            <span className="font-semibold text-gray-800">{ratings}</span>
            <span className="text-gray-400">({reviews})</span>
          </div>

          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-[11px]">
            {sold} sold
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            ৳{discountedPrice.toLocaleString()}
          </span>

          {discount > 0 && (
            <span className="text-sm line-through text-gray-400">
              ৳{price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-2">
          {/* View Details */}
          <Link
            href={`/products/${_id}`}
            className="w-1/2 flex items-center justify-center gap-1 border border-gray-300 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
          >
            <FaEye />
            View
          </Link>

          {/* Add to Cart */}
          <button
            onClick={() => onAddToCart?.(product)}
            className="w-1/2 flex items-center justify-center gap-1 bg-primary text-white py-2 rounded-lg text-sm hover:opacity-90 transition"
          >
            <FaShoppingCart />
            Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;