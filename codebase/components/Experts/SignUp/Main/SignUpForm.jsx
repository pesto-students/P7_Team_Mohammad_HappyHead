import { useState } from "react";
import { TextField, Typography, Button, Container, InputAdornment } from "@mui/material";
import { ThemeProvider, styled } from "@mui/system";
import RootContainer from "../../../styles/RootContainerStyles";
import ContentContainer from "../../../styles/ContentContainerStyles";
import ButtonWrapper from "../../../styles/ButtonWrapperStyles";
import theme from "../../../styles/theme";
import Link from 'next/link'
import { useRouter } from 'next/router';
import { redirectToPage } from '../../../../utils/redirect';
import { signIn } from "next-auth/react";
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
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
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

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [expertname, setExpertname] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState();
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Name is required";
    }
    if (expertname.trim() === "") {
      newErrors.username = "Username is required";
    }

    if (password.trim() === "") {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formData = { name: name, email: email, password: password, expertname: expertname };

        // Send form data to the server using Fetch API
        const response = await fetch("/api/experts/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          const expertname = data.expertname;  // Handle the response as desired
          const res = await signIn('credentials', { redirect: false, email: email, password: password });
          redirectToPage(`/experts/dashboard/${expertname}`);

        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Check username availability when Check Availability button is clicked
  const handleCheckAvailability = async () => {
    if (expertname.trim() === "") {
      // If the username field is empty, show an error message or handle it as desired
      return;
    }
    try {
      const response = await fetch(`/api/experts/${expertname}`);
      if (response.ok) {
        const result = await response.json();

        setUsernameAvailable(result.available);
        // Handle the availability result as desired
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error(error);
      // Handle the error as desired
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <CustomContentContainer>
          <Image
            src="/images/login/join-us.png"
            alt="signup"
            width={150}
            height={150}
          />
          <h1>Sign Up</h1>
          {/* Centered Sub text */}
          <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
              <CustomTextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: theme.palette.text.primary,
                  },
                }}
                error={errors.name !== undefined}
                helperText={errors.name}
              />
              <CustomTextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail} 
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
                fullWidth
                margin="normal"
                variant="outlined"
                label="Username"
                name="expertname"
                value={expertname}
                onChange={(e) => setExpertname(e.target.value)}
                InputLabelProps={{
                  style: { color: 'black' }, // Set the label text color to black
                }}
                InputProps={{
                  style: { color: theme.palette.text.primary }, // Apply theme.palette.text.primary color to input text
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={handleCheckAvailability}
                        style={{
                          backgroundColor: theme.palette.quinary.main,
                          fontSize: '1rem',
                          '&:hover': {
                            backgroundColor: theme.palette.secondary.main,
                          },
                        }}
                      >
                        Check Availability
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              {usernameAvailable !== null && usernameAvailable !== undefined && (
                <Typography variant="caption" color={usernameAvailable ? 'green' : 'error'}>
                  {usernameAvailable ? 'Username available' : 'Username already taken'}
                </Typography>
              )}
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
                  Sign Up
                </Button>
              </ButtonWrapper>
            </form>
          </Container>
          <LoginLinkTypography variant="body2" color="primary" align="center">
            Not an expert? <Link href="/users/signup">Register as a user</Link>
          </LoginLinkTypography>
        </CustomContentContainer>
      </CustomRootContainer>
    </ThemeProvider>
  );
}
