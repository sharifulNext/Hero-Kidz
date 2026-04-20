"use server";
import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  const { email, password, name } = payload;
  if (!email || !password) {
    return { success: false, message: "Email and password are required" };
  }

  try {
    
    const userCollection = await dbConnect(collections.USERS);

    const isExist = await userCollection.findOne({ email });
    
    if (isExist) {
      return { success: false, exists: true };
    }

    const newUser = {
      provider: "credentials",
      name,
      email,
      password: await bcrypt.hash(password, 14),
      role: "user",
      createdAt: new Date(),
    };

    const result = await userCollection.insertOne(newUser);
    
    return {
      success: true,
      acknowledged: result.acknowledged,
      insertedId: result.insertedId?.toString(),
    };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, message: "Database connection failed" };
  }
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) return null;

  try {
    const userCollection = await dbConnect(collections.USERS);
    const user = await userCollection.findOne({ email });

    if (!user) return null;

    const isMatched = await bcrypt.compare(password, user?.password);
    
    if (isMatched) {
      const { password: _, ...userData } = user;
      return { ...userData, _id: user._id.toString() };
    }
    return null;
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
};