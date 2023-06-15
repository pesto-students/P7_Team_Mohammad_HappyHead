import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "../users/signin";
import { authenticateExpert } from "../experts/signin";
import { getUserByEmail } from "../users/userDao";
import { updateDBSignUp } from "../users/signup";

const authOptions = {
  providers: [
    // process.env.VERCEL_ENV === "preview"
    //   ? 
    GoogleProvider({
      name: 'google',
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
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
  // session: {
  //   jwt: true,
  //   maxAge: 30 * 24* 60 * 60, // 30 days
  // },
  callbacks: {
    async signIn(obj) {
      /**
       * signin -  {"user":{"name":"Shubham MyObj","email":"mobile@hh.in","username":"shbh29123"},"account":{"type":"credentials","provider":"credentials"},"credentials":{"redirect":"false","name":"a","email":"a@gg.com","password":"123","csrfToken":"691762fd886ae5faafce2bbe27aa4edfbf333f8d216e065dc02fe3a6a3207c27","callbackUrl":"http://localhost:3000/signin","json":"true"}}
       */
      const {user, account} = obj;
      if(account?.provider === 'google') {
        const { name, email} = user;
        const username = email.substring(0, email.indexOf('@'));
        console.log(`username - ${username}`);
        await updateDBSignUp(name, email, null, username, account.provider)
      }
      console.log("signin - ", JSON.stringify(obj));
      return true;
    },
    session: async ({session}) => {
      /**
       * {"session":{"user":{"name":"Shubham Singh","email":"shbh29@gmail.com","image":"https://lh3.googleusercontent.com/a/AAcHTte7TmJ7A0ZKpSqHAzknYAfHboqqw2kdr74x9WobcQ=s96-c"},"expires":"2023-07-15T14:36:41.803Z"}
       * ,"token":{"name":"Shubham Singh","email":"shbh29@gmail.com","picture":"https://lh3.googleusercontent.com/a/AAcHTte7TmJ7A0ZKpSqHAzknYAfHboqqw2kdr74x9WobcQ=s96-c","sub":"111336451378684907226","iat":1686839800,"exp":1689431800,"jti":"a25a3736-3942-4baf-945d-36588a390e88"}} 
       */
      const {email} = session.user;

      const userObj = await getUserByEmail(email);
      console.log(`userObj session ${JSON.stringify(userObj)}`);
      session.user.image = [userObj.username, userObj.role];
      return session;
    }
  },
};

export default NextAuth(authOptions);
