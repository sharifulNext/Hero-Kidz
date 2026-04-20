"use server"

import { collections, dbConnect } from "@/lib/dbConnect"
import bcrypt from "bcryptjs"

export const postUser = async(payload)=>{
    const {email, password,name} =payload 
    // cheack payload
    if(!email || !password) return null


    // cheack user
    const isExist = await dbConnect(collections.USERS).findOne({email})
    if(isExist){
        return null;
    }



    // create user
    const newUser = {
        providerId:"credentials",
        name,
        email,
        password: await bcrypt.hash(password, 14),
        role:"user"
    };


    // insert user
    const result = await dbConnect(collections.USERS).insertOne(newUser);
    
    if(result.acknowledged){
        return {
             ...result , insertedId:result.insertedId.toString()
        }
    }

}