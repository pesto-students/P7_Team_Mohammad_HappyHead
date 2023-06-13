import { useState } from "react";
import { TextField, Typography, Button, Container, InputAdornment } from "@mui/material";
import { ThemeProvider, styled } from "@mui/system";
import GoogleIcon from "@mui/icons-material/Google";
import RootContainer from "../../styles/RootContainerStyles";
import ContentContainer from "../../styles/ContentContainerStyles";
import ButtonWrapper from "../../styles/ButtonWrapperStyles";
import theme from "../../styles/theme";
import { useRouter } from 'next/router';
import { redirectToPage } from '../../../utils/redirect';

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
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
});

// Styled component for the custom text field
const CustomTextField = styled(TextField)({
  "& .MuiFormLabel-root": {
    color: theme.palette.text.primary,
  },
});

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState();
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Name is required";
    }
    if (username.trim() === "") {
      newErrors.username = "Username is required";
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (password.trim() === "") {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formData = { name: name, email: email, password: password, username: username };

        // Send form data to the server using Fetch API
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          const username = data.username;  // Handle the response as desired
          
          redirectToPage(`/users/dashboard/${username}`);

        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleIdpClick = (e) => {
    router?.push('/api/auth/signin')
  };

  // Check username availability when Check Availability button is clicked
  const handleCheckAvailability = async () => {
    if (username.trim() === "") {
      // If the username field is empty, show an error message or handle it as desired
      return;
    }

    try {
      const response = await fetch(`/api/users/dashboard/availability/${username}`);
      if (response.ok) {
        const result = await response.json();
        console.log(result);
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
          <h1>Sign Up</h1>
          {/* Centered Sub text */}
          <ButtonWrapper color="primary">
            <IdPSignInButton variant="outlined" startIcon={<GoogleIcon />} onClick={handleIdpClick}>
              Sign Up With Google
            </IdPSignInButton>
          </ButtonWrapper>
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
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                error={errors.email !== undefined}
                helperText={errors.email}
                type="password"
              />
              <ButtonWrapper color="tertiary">
                <Button variant="contained" color="tertiary" type="submit">
                  Sign Up
                </Button>
              </ButtonWrapper>
            </form>
          </Container>
        </CustomContentContainer>
      </CustomRootContainer>
    </ThemeProvider>
  );
}
