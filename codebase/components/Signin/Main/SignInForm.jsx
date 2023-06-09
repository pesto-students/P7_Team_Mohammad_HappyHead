import { useState } from 'react'
import { TextField, Button, Container } from '@mui/material'
import { ThemeProvider, styled } from '@mui/system'
import RootContainer from '../../styles/RootContainerStyles'
import ContentContainer from '../../styles/ContentContainerStyles'
import ButtonWrapper from '../../styles/ButtonWrapperStyles'
import SubText from '../../styles/SubTextStyles'
import theme from '../../styles/theme'

// Styled component for the root container
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}))

// Styled component for the custom content container
const CustomContentContainer = styled(ContentContainer)({
  backgroundColor: theme.palette.secondary.main,
  padding: '2rem 0',
});

// Styled component for the centered subtext
const IdPSignInButton = styled(Button)({
  textAlign: 'center',
});

// Styled component for the custom text field
const CustomTextField = styled(TextField)({
  '& .MuiFormLabel-root': {
    color: theme.palette.text.primary,
  },
});

export default function Contact() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (userName.trim() === '') {
      newErrors.userName = 'userName is required';
    }

    if (password.trim() === '') {
      newErrors.password = 'Password is required';
    // } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(password)) {
    //   newErrors.password = 'Password must be 8 Characters long';
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        const formData = { username: userName, password: password };

        // Send form data to the server using Fetch API
        const response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data); // Handle the response as desired
          console.log('Login Successful');

          // Clear the form fields
          setUserName('')
          setPassword('')
        } else {
          throw new Error('Request failed');
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <CustomContentContainer>
          <h1>Sign In</h1>
          {/* Centered Sub text */}
          <IdPSignInButton variant="h6">
            Sign In with Google
          </IdPSignInButton>
          <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
              <CustomTextField
                label="Username"
                fullWidth
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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
                type='password'
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
  )
}
