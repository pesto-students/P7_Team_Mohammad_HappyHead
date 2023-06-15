import { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { ThemeProvider, styled } from "@mui/system";
import RootContainer from "../../../styles/RootContainerStyles";
import ContentContainer from "../../../styles/ContentContainerStyles";
import ButtonWrapper from "../../../styles/ButtonWrapperStyles";
import theme from "../../../styles/theme";
import { useRouter } from "next/router";
import { redirectToPage } from '../../../../utils/redirect';
import { signIn } from "next-auth/react";
import { useSession } from 'next-auth/react';


// Styled component for the root container
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

// Styled component for the custom content container
const CustomContentContainer = styled(ContentContainer)({
  backgroundColor: theme.palette.secondary.main,
  padding: "2rem 0",
});

// Styled component for the centered subtext
const IdPSignInButton = styled(Button)({
  textAlign: "center",
});

// Styled component for the custom text field
const CustomTextField = styled(TextField)({
  "& .MuiFormLabel-root": {
    color: theme.palette.text.primary,
  },
});

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const { data: session, status } = useSession();
  const { user } = session || {}; // Destructure user from session object
  const role = user?.image[1];
// Get username or expertname from the user object
  let username, expertname;

// Get username or expertname from the session object
  if (session && role == "user") {
    // console.log("its a user")
    username = user.image[0];
  }
  else if (session && role == "expert") {
    // console.log("its a expert")
    expertname = user.image[0];
  } else {
    // console.log("no role")
  }

  const validateForm = () => {
    const newErrors = {};

   
    if (email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (password.trim() === "") {
      newErrors.password = "Password is required";
      // } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(password)) {
      //   newErrors.password = 'Password must be 8 Characters long';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (validateForm()) {
      try {
        console.log('control coming here')
        const response = await signIn('credentials', { redirect: false, email: email, password: password });
        console.log("response - ", response);
        // response is only to know if login is succssful. data wil be coming from session.

        // const formData = { email: email, password: password };
        // // Send form data to the server using Fetch API
        // const res = await fetch("/api/users/signin", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(formData),
        // });

        // if (res.ok) {
        //   const data = await res.json();
        //   const username = data.username; // Handle the response as desired
        //   console.log("Login Successful");

        //   // Redirect the user to the dashboard page
          // redirectToPage(`/users/dashboard/${username}`);
        // } else {
        //   throw new Error("Request failed");
        // }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleIdpClick = (e) => {
    router?.push("/api/auth/signin");
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <CustomContentContainer>
          <h1>Sign In</h1>
          {/* Centered Sub text */}
          <ButtonWrapper color="primary">
            <IdPSignInButton
              variant="h6"
              onClick={handleIdpClick}
            >
              Sign In with Google
            </IdPSignInButton>
          </ButtonWrapper>
          <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
              <CustomTextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: theme.palette.text.primary,
                  },
                }}
                error={errors.email !== undefined}
                helperText={errors.email}
              />
              <CustomTextField
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: theme.palette.text.primary,
                  },
                }}
                error={errors.password !== undefined}
                helperText={errors.password}
                type="password"
              />
              <ButtonWrapper color="tertiary">
                <Button variant="contained" color="tertiary" type="submit">
                  Sign In
                </Button>
              </ButtonWrapper>
            </form>
          </Container>
        </CustomContentContainer>
      </CustomRootContainer>
    </ThemeProvider>
  );
}
