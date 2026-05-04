"use server";

import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

const { dbConnect, collections } = require("@/lib/dbConnect");

//  Add to Cart
export const handleCart = async (productId) => {
  try {
    const { user } = (await getServerSession(authOptions)) || {};
    if (!user) return { success: false, message: "Unauthorized" };

    const cartCollection = await dbConnect(collections.CART);
    const productCollection = await dbConnect(collections.PRODUCTS);

    const query = {
      email: user.email,
      productId: new ObjectId(productId),
    };

    const isAdded = await cartCollection.findOne(query);

    if (isAdded) {
      // update quantity
      const result = await cartCollection.updateOne(query, {
        $inc: { quantity: 1 },
      });

      revalidatePath("/cart");

      return { success: Boolean(result.modifiedCount) };
    } else {
      // get product
      const product = await productCollection.findOne({
        _id: new ObjectId(productId),
      });

      if (!product) {
        return { success: false, message: "Product not found" };
      }

      const newData = {
        productId: product._id,
        email: user.email,
        title: product.title,
        quantity: 1,
        image: product.image,
        price:
          product.price - (product.price * product.discount) / 100,
        username: user.name,
      };

      const result = await cartCollection.insertOne(newData);

      revalidatePath("/cart");

      return { success: result.acknowledged };
    }
  } catch (error) {
    console.error("handleCart error:", error);
    return { success: false };
  }
};



//  Get Cart
export const getCart = cache(async () => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return [];

  const cartCollection = await dbConnect(collections.CART);

  const query = { email: user.email };

  const result = await cartCollection.find(query).toArray();

  return result;
});



//  Delete Item
export const deleteItemsFromCart = async (id) => {
  try {
    const { user } = (await getServerSession(authOptions)) || {};
    if (!user) return { success: false };

    if (!ObjectId.isValid(id)) {
      return { success: false };
    }

    const cartCollection = await dbConnect(collections.CART);

    const query = {
      _id: new ObjectId(id),
      email: user.email,
    };

    const result = await cartCollection.deleteOne(query);

    revalidatePath("/cart");

    return { success: Boolean(result.deletedCount) };
  } catch (error) {
    console.error("delete error:", error);
    return { success: false };
  }
};



//  Increase Quantity
export const increaseItemDb = async (id, quantity) => {
  try {
    const { user } = (await getServerSession(authOptions)) || {};
    if (!user) return { success: false };

    if (quantity >= 10) {
      return {
        success: false,
        message: "You can't buy more than 10 items",
      };
    }

    const cartCollection = await dbConnect(collections.CART);

    const query = {
      _id: new ObjectId(id),
      email: user.email,
    };

    const result = await cartCollection.updateOne(query, {
      $inc: { quantity: 1 },
    });

    revalidatePath("/cart");

    return { success: Boolean(result.modifiedCount) };
  } catch (error) {
    console.error("increase error:", error);
    return { success: false };
  }
};



//  Decrease Quantity
export const decreaseItemDb = async (id, quantity) => {
  try {
    const { user } = (await getServerSession(authOptions)) || {};
    if (!user) return { success: false };

    if (quantity <= 1) {
      return {
        success: false,
        message: "Minimum quantity is 1",
      };
    }

    const cartCollection = await dbConnect(collections.CART);

    const query = {
      _id: new ObjectId(id),
      email: user.email,
    };

    const result = await cartCollection.updateOne(query, {
      $inc: { quantity: -1 },
    });

    revalidatePath("/cart");

    return { success: Boolean(result.modifiedCount) };
  } catch (error) {
    console.error("decrease error:", error);
    return { success: false };
  }
};



//  Clear Cart
export const clearCart = async () => {
  try {
    const { user } = (await getServerSession(authOptions)) || {};
    if (!user) return { success: false };

    const cartCollection = await dbConnect(collections.CART);

    const query = { email: user.email };

    const result = await cartCollection.deleteMany(query);

    revalidatePath("/cart");

    return { success: Boolean(result.deletedCount) };
  } catch (error) {
    console.error("clearCart error:", error);
    return { success: false };
  }
};