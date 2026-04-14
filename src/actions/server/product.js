"use server";

import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getProducts = async () => {
  const collection = await dbConnect(collections.PRODUCTS);
  const products = await collection.find().toArray();

  return JSON.parse(JSON.stringify(products)); // important for Next.js
};

export const getSingleProduct = async (id) => {
  if (!id || id.length !== 24) return null;

  const collection = await dbConnect(collections.PRODUCTS);

  const product = await collection.findOne({
    _id: new ObjectId(id),
  });

  if (!product) return null;

  return JSON.parse(JSON.stringify(product));
};