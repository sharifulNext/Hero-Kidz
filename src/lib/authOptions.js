import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        // user login logic (already using await inside loginUser presumably)
        const user = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        // FIX: Prothome collection-ke await koro
        const userCollection = await dbConnect(collections.USERS);
        
        // Ekhon findOne kaj korbe
        const isExist = await userCollection.findOne({ email: user.email });

        if (isExist) {
          return true;
        }

        const newUser = {
          provider: account?.provider,
          email: user.email,
          name: user.name,
          image: user.image,
          role: "user",
        };

        const result = await userCollection.insertOne(newUser);
        return result.acknowledged;
      } catch (error) {
        console.error("SignIn Callback Error:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          // FIX: JWT-teও dbConnect-ke await koro
          const userCollection = await dbConnect(collections.USERS);
          const dbUser = await userCollection.findOne({ email: user.email });
          
          token.role = dbUser?.role || "user";
          token.email = dbUser?.email;
        } else {
          token.role = user?.role || "user";
          token.email = user?.email;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};