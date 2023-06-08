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
  const [userName, setName] = useState('')
  const [password, setEmail] = useState('')
  const [query, setQuery] = useState('')
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (userName.trim() === '') {
      newErrors.name = 'Name is required';
    }

    if (password.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(password)) {
      newErrors.email = 'Invalid email address';
    }

    if (query.trim() === '') {
      newErrors.query = 'Query is required'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        const formData = { name: userName, email: password, query };

        // Send form data to the server using Fetch API
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data); // Handle the response as desired

          // Clear the form fields
          setName('')
          setEmail('')
          setQuery('')
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
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setEmail(e.target.value)}
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
