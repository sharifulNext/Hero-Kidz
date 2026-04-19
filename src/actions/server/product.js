"use server";

import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getProducts = async () => {
  const collection = await dbConnect(collections.PRODUCTS);
  const products = await collection.find().toArray();

  // Ensure safe serialization for Next.js
  return JSON.parse(JSON.stringify(products));
};

export const getSingleProduct = async (id) => {
  if (id.length !== 24) {
    return {};
  }

  const query = { _id: new ObjectId(id) };
  const collection = await dbConnect(collections.PRODUCTS);
  const product = await collection.findOne(query);

  return product ? { ...product, _id: product._id.toString() } : {};
};
