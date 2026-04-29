import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { collections, dbConnect } from "@/lib/dbConnect";

export const authOptions = {
  providers: [
    // 1. Credentials Provider (Email/Password Login)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required");
        }

        try {
          const userCollection = await dbConnect(collections.USERS);
          const user = await userCollection.findOne({ email: credentials.email });

          if (!user || !user.password) {
            throw new Error("No user found with this email");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Invalid password");
          }

          // Security: Return only necessary data, don't return the password hash
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role || "user",
          };
        } catch (error) {
          console.error("Authorize Error:", error);
          return null;
        }
      },
    }),

    // 2. Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {

    async signIn({ user, account }) {
   
      if (account.provider === "google") {
        try {
          const userCollection = await dbConnect(collections.USERS);
          const isExist = await userCollection.findOne({ email: user.email });

          if (!isExist) {
            const newUser = {
              name: user.name,
              email: user.email,
              image: user.image,
              provider: account.provider,
              role: "user",
              createdAt: new Date(),
            };
            const result = await userCollection.insertOne(newUser);
            return result.acknowledged;
          }
          return true; 
        } catch (error) {
          console.error("Google SignIn Callback Error:", error);
          return false; 
        }
      }
      return true;
    },

    // Session logic: JWT theke data session-e pass kora
    // async session({ session, token }) {
    //   if (token) {
    //     session.user.id = token.id;
    //     session.user.role = token.role;
    //   }
    //   return session;
    // },

    // // JWT logic: User data token-e add kora
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id;
    //     token.role = user.role;
    //   }
    //   return token;
    // },
  },

  pages: {
    signIn: "/login",
    error: "/api/auth/error", // Custom error page
  },

  session: {
    strategy: "jwt", // Production-e JWT strategy fast ebong scalable
  },

  secret: process.env.NEXTAUTH_SECRET, // Must match with Vercel env
};