import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  callback: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
};


export default NextAuth(authOptions);