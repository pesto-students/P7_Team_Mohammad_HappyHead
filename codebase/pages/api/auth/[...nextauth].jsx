import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "../signin";

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
          const userObj = await authenticateUser(email, password);
          
          const retObj = {
            name: userObj.name, 
            email: userObj.email, 
            image: [userObj.username, userObj.role],
           
          }
     
          console.log("retObj - ", JSON.stringify(retObj));
          return retObj;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(obj) {
      /**
       * signin -  {"user":{"name":"Shubham MyObj","email":"mobile@hh.in","username":"shbh29123"},"account":{"type":"credentials","provider":"credentials"},"credentials":{"redirect":"false","name":"a","email":"a@gg.com","password":"123","csrfToken":"691762fd886ae5faafce2bbe27aa4edfbf333f8d216e065dc02fe3a6a3207c27","callbackUrl":"http://localhost:3000/signin","json":"true"}}
       */
      console.log("signin - ", JSON.stringify(obj));
      return true;
    },
  },
};

export default NextAuth(authOptions);