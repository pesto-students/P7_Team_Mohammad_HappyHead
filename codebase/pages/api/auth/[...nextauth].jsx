import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },

      async authorize(credentials, req) {
        // if (validateForm()) {
          try {
            const { email, password } = credentials;
            const formData = { username: email, password: password };
    
            // Send form data to the server using Fetch API
            const response = await fetch("http://localhost:3000/api/signIn", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
    
            if (response.ok) {
              const data = await response.json();
              console.log(data); // Handle the response as desired
              console.log("Login Successful");
              return data;
    
            } else {
              return null;
            }
          } catch (error) {
            console.error(error);
            return null;
          }
        // }
        // const { email, password } = credentials;
        // const res = await fetch("http://localhost:3000/api/signin", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     email,
        //     password,
        //   }),
        // });
        // const user = await res.json();
        // if (res.ok && user) {
        //   return user;
        // } else return null;
      },
    }),
  ],
  callbacks: {
    // async jwt(responseObj) {
    //   console.log(JSON.stringify(responseObj));
    //   token.userRole = "admin";
    //   return token;
    // },
    signIn(obj) {
      console.log("signin - ", JSON.stringify(obj));
      return true;
    },
    saveUser(obj) {
      
    }
  },
};

export default NextAuth(authOptions);
