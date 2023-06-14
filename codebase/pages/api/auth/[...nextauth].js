import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "../users/signin";
import { authenticateExpert } from "../experts/signin";

const authOptions = {
  providers: [
    process.env.VERCEL_ENV === "preview"
      ? 
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }):
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;
          console.log("reqURL - ", req)
          // Determine if the request is for expert signin or signup

          const isExpertSignin = req?.body?.callbackUrl?.includes("/experts/signin");
          const isExpertSignup = req?.body?.callbackUrl?.includes("/experts/signup");

          console.log("isExpertSignin - ", isExpertSignin)
          console.log("isExpertSignup - ", isExpertSignup)


          let retObj;

          if (isExpertSignin || isExpertSignup) {
            const userObj = await authenticateExpert(email, password);
            retObj = {
              name: userObj.name,
              email: userObj.email,
              image: [userObj.expertname, userObj.role],
            }
          } else {
            const userObj = await authenticateUser(email, password);
            retObj = {
              name: userObj.name,
              email: userObj.email,
              image: [userObj.username, userObj.role],
            }
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
