import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { updateDBSignUp } from "../signup";
import { authenticateUser } from "../signin";
import { redirectToPage } from '../../../utils/redirect';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;
          console.log(
            `email - ${email}, pass - ${password}, cred - ${JSON.stringify(credentials)}`
          );
          const userObj = await authenticateUser(email, password);
          console.log(`user Obj - ${JSON.stringify(userObj)}`);
          const obj = {
            username: userObj.username,
            name: userObj.name,
            email: userObj.email,
          };
          return obj;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // async jwt(responseObj) {
    //   console.log(JSON.stringify(responseObj));
    //   token.userRole = "admin";
    //   return token;
    // },
    async signIn(obj) {
      console.log("signin - ", JSON.stringify(obj));
      return true;
    },
    // async saveUser(obj) {
    //   const { name, email } = obj;
    //   updateDBSignUp(name, email, "");
    //   return user;
    // },
  },
};

export default NextAuth(authOptions);