import { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { ThemeProvider, styled } from "@mui/system";
import RootContainer from "../../../styles/RootContainerStyles";
import ContentContainer from "../../../styles/ContentContainerStyles";
import ButtonWrapper from "../../../styles/ButtonWrapperStyles";
import theme from "../../../styles/theme";
import Link from 'next/link'
import { useRouter } from "next/router";
import { redirectToPage } from '../../../../utils/redirect';
import { signIn, useSession } from "next-auth/react";
import Image from 'next/image'

// Styled component for the root container
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

// Styled component for the custom content container
const CustomContentContainer = styled(ContentContainer)({
  backgroundColor: theme.palette.secondary.main,
  padding: "2rem 0",
  minHeight: "80vh",
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

const LoginLinkTypography = styled(Typography)`
  padding-top: 16px;
  color: ${({ theme }) => theme.palette.text.primary};

  a {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const sessionData = useSession();
  // console.log(`sessionData - ${JSON.stringify(sessionData)}`);

  useEffect(() => {
    if (sessionData.data && sessionData.data.user) {
      // console.log(`userObject - ${JSON.stringify(sessionData.data.user)}`);
      const { image: [username, role] } = sessionData.data.user;
      redirectToPage(`/users/dashboard/${username}`);
    }
  }, [sessionData]);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = () => {
    const newErrors = { ...errors };
  
    if (email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email address";
    } else {
      newErrors.email = undefined; // Clear the error if email is valid
    }
  
    setErrors(newErrors);
  };
  
  const validatePassword = () => {
    const newErrors = { ...errors };
  
    if (password.trim() === "") {
      newErrors.password = "Password is required";
    } else {
      newErrors.password = undefined; // Clear the error if password is valid
    }
  
    setErrors(newErrors);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

// Validate fields before submitting
validateEmail();
validatePassword();

    if (!errors.email && !errors.password) {
      try {
        console.log('control coming here')
        const response = await signIn('credentials', { redirect: false, email: email, password: password });
        console.log("response - ", response);
        // response is only to know if login is succssful. data wil be coming from session.

        const formData = { email: email, password: password };
        // Send form data to the server using Fetch API
        const res = await fetch("/api/users/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          const data = await res.json();
          const username = data.username; // Handle the response as desired
          console.log("Login Successful");

          // Redirect the user to the dashboard page
          redirectToPage(`/users/dashboard/${username}`);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };


  const handleIdpClick = async () => {
    await signIn('google');
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <CustomContentContainer>
          <Image
            src="/images/login/welcome.png"
            alt="signin"
            width={150}
            height={150}
          />
          <h1>Sign In</h1>
          {/* Centered Sub text */}
          <ButtonWrapper color="primary">
            <IdPSignInButton
              variant="h6"
              onClick={() => handleIdpClick()}
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
                onBlur={validateEmail} // Validate on leaving field
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: theme.palette.text.primary,
                  },
                }}
                error={errors.email !== undefined} // Check if error exists
                helperText={errors.email} // Display error message
              />
              <CustomTextField
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword} 
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: theme.palette.text.primary,
                  },
                }}
                error={errors.password !== undefined} // Check if error exists
                helperText={errors.password} // Display error message
                type="password"
              />
              <ButtonWrapper color="tertiary">
                <Button variant="contained" color="tertiary" type="submit">
                  Sign In
                </Button>
              </ButtonWrapper>
            </form>
          </Container>
          {/* Link for "Already an expert? Login" */}
          <LoginLinkTypography variant="body2" color="primary" align="center">
            Are you an expert? <Link href="/experts/signin">Login</Link>
          </LoginLinkTypography>
        </CustomContentContainer>
      </CustomRootContainer>
    </ThemeProvider>
  );
}
