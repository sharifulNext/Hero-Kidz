import CredentialsProvider from "next-auth/providers/credentials";
import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          return null;
        }

        try {
          // 1. Database theke user khunje ber kora
          const userCollection = await dbConnect(collections.USERS);
          const user = await userCollection.findOne({ email });

          if (!user) {
            return null; // User na thakle error handle korbe
          }

          // 2. Password check kora
          const isPasswordCorrect = await bcrypt.compare(password, user.password);

          if (!isPasswordCorrect) {
            return null; // Password bhul hole
          }

          // 3. Login success hole user return
          return user; 

        } catch (error) {
          console.error("Auth Error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Jodi custom login page thake
  },
  secret: process.env.NEXTAUTH_SECRET, // .env file-e thaka dorkar
};