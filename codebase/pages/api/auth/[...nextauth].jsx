import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { updateDBSignUp } from "../signup";
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
          // const userObj = await authenticateUser(email, password);
          // console.log(`user Obj - ${JSON.stringify(userObj)}`);
          
          // return userObj;
          return {name:'Shubham MyObj', email:'mobile@hh.in', role: 'shbh29123'};
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {

    async jwt({token, user}) {
      /**
       * jwt - {"token":{"name":"Shubham MyObj","email":"mobile@hh.in"},"user":{"name":"Shubham MyObj","email":"mobile@hh.in","username":"shbh29123"},"account":{"type":"credentials","provider":"credentials"},"isNewUser":false,"trigger":"signIn"}
       */
      // console.log(` jwt - ${JSON.stringify(responseObj)}`);
      token.role = user.role;

      return token;
    },
    async signIn(obj) {
      /**
       * signin -  {"user":{"name":"Shubham MyObj","email":"mobile@hh.in","username":"shbh29123"},"account":{"type":"credentials","provider":"credentials"},"credentials":{"redirect":"false","name":"a","email":"a@gg.com","password":"123","csrfToken":"691762fd886ae5faafce2bbe27aa4edfbf333f8d216e065dc02fe3a6a3207c27","callbackUrl":"http://localhost:3000/signin","json":"true"}}
       */
      console.log("signin - ", JSON.stringify(obj));
      return true;
    },
    // async saveUser(obj) {
    //   const { name, email } = obj;
    //   updateDBSignUp(name, email, "");
    // },
    // async redirect({ url, baseUrl }) {
      // console.log(obj);
      // const email = obj?.email || obj?.user.email; // Get the email from the user object
      // return baseUrl + "/users/dashboard/" + encodeURIComponent(email);
    // },
    // async session({session, token, user}) {
    //   console.log(`session - ${JSON.stringify(session)}, user - ${JSON.stringify(user)}`)
    //   // session.user.username = user?.username;
    //   console.log(`session - ${JSON.stringify(session)}, user - ${JSON.stringify(user)}`)
    // }
  },
};

export default NextAuth(authOptions);
