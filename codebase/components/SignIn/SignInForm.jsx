import theme from "../styles/theme";
import { ThemeProvider, styled } from "@mui/system";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import RootContainer from "../styles/RootContainerStyles";
import ButtonWrapper from '../styles/ButtonWrapperStyles';

const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const SignInForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  return (
    <>
      <ThemeProvider theme={theme}>
        <CustomRootContainer>
          <h1>Sign In</h1>
          <form name="signin">
            <TextField
              label="User Name"
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
            <TextField
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
              error={errors.name !== undefined}
              helperText={errors.name}    
              type='password'          
            />
            <ButtonWrapper color='tertiary' >
              <Button variant='contained' color='tertiary' type='submit'>
                Log In
              </Button>
            </ButtonWrapper>
          </form>
        </CustomRootContainer>
      </ThemeProvider>
    </>
  );
};
export default SignInForm;
