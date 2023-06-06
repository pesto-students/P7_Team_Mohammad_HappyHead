import { useState } from 'react';
import { TextField, Button, Container, useMediaQuery, ThemeProvider } from '@mui/material';
import { styled } from '@mui/system';
import RootContainer from '../../styles/RootContainerStyles';
import ContentContainer from '../../styles/ContentContainerStyles';
import ButtonWrapper from '../../styles/ButtonWrapperStyles';
import SubText from '../../styles/SubTextStyles';
import IconContainer from '../../styles/IconContainerStyles'
import SectionContainer from '../../styles/SectionsContainer';
import theme from '../../styles/theme';

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '1rem 2rem 2rem 2rem',
}));

// Styled component for the main content container
const CustomSectionContainer = styled(SectionContainer)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '3rem',
},
}));

// Styled component for the custom text field
const CustomTextField = styled(TextField)({
  '& .MuiFormLabel-root': {
    color: theme.palette.text.primary,
  },
});

// Styled component for the IconContainer with styled icons
const StyledIconContainer = styled(IconContainer)(() => ({
  '& img': {
      width: '8rem',
      height: '8rem',
      marging: '0',
  },
}));

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (name.trim() === '') {
      newErrors.name = 'Name is required';
    }

    if (email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (query.trim() === '') {
      newErrors.query = 'Query is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formData = { name, email, query };

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
          setName('');
          setEmail('');
          setQuery('');
        } else {
          throw new Error('Request failed');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Check if the screen width is below the specified breakpoint
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <CustomSectionContainer>
        <StyledIconContainer>
                        <img src="/images/contact/contact.png" alt="Who" />
                    </StyledIconContainer>
          <Container maxWidth="80%">
            <ContentContainer>
              <h1>Contact Us</h1>
            </ContentContainer>
            <ContentContainer>
              <SubText variant="h5">
                You can send us an email at team@happyhead.com or fill the form below
              </SubText>
            </ContentContainer>
          </Container>

          <div style={{ maxWidth: isSmallScreen ? '80%' : '40%', margin: '0 auto' }}>
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
                label="Query"
                fullWidth
                multiline
                rows={4}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: theme.palette.text.primary,
                  },
                }}
                error={errors.query !== undefined}
                helperText={errors.query}
              />
              <ButtonWrapper color="tertiary">
                <Button variant="contained" color="tertiary" type="submit">
                  Submit
                </Button>
              </ButtonWrapper>
            </form>
          </div>
        </CustomSectionContainer>
      </CustomRootContainer>
    </ThemeProvider>
  );
}
