"use server"

import { collections, dbConnect } from "@/lib/dbConnect"
import bcrypt from "bcryptjs"

export const postUser = async (payload) => {
    const { email, password, name } = payload
    
    // Check payload
    if (!email || !password) return null

    try {
        // Step 1: Get the collection reference (Awaiting the connection)
        const userCollection = await dbConnect(collections.USERS);

        // Step 2: Check if user exists
        const isExist = await userCollection.findOne({ email });
        
        if (isExist) {
            return { error: "User already exists" }; // Returning an object is better than null
        }

        // Step 3: Create user object with hashed password
        const newUser = {
            providerId: "credentials",
            name,
            email,
            password: await bcrypt.hash(password, 14),
            role: "user",
            createdAt: new Date(), // Always add timestamps
        };

        // Step 4: Insert user
        const result = await userCollection.insertOne(newUser);
        
        if (result.acknowledged) {
            return {
                acknowledged: true,
                insertedId: result.insertedId.toString()
            };
        }
        
        return { error: "Failed to insert user" };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Internal Server Error");
    }
}