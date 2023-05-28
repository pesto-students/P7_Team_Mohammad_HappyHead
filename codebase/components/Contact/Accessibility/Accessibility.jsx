import { Button, Container } from '@mui/material';
import { ThemeProvider, styled } from '@mui/system';
import RootContainer from '../../styles/RootContainerStyles';
import ContentContainer from '../../styles/ContentContainerStyles';
import SubText from '../../styles/SubTextStyles';
import theme from '../../styles/theme';

// Styled component for the root container
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

// Styled component for the custom content container
const CustomContentContainer = styled(ContentContainer)({
  backgroundColor: theme.palette.secondary.main,
  padding: '2rem 0',
});

// Styled component for the centered subtext
const CenteredSubText = styled(SubText)({
  textAlign: 'center',
});

const info = 
  {
    mission: `Our mission is to create a world where everyone is kind to their mind — which is why we’re committed to making our mobile products more accessible for every person, regardless of their visual, auditory, cognitive, or motor abilities.`,
    aim: `We are constantly looking for ways to continue to build a more inclusive product and ensure we’re operating according to our mission and values. Accessibility will remain a top priority as HappyHead's offerings evolve as we want to empower all members with tools to improve their health and happiness.`,
    contact: `We want to hear from you if you encounter accessibility barriers to using HappyHead. Please send your feedback to accessibility@happyhead.com.`,
  }


export default function Accessibility() {
  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <CustomContentContainer>
          <h1>HappyHead Accessibility Statement</h1>
          {/* Centered Sub text */}
          <CenteredSubText variant="h6">
           {info.mission}
          </CenteredSubText>
          <CenteredSubText variant="h6">
          {info.aim}
          </CenteredSubText>
          <CenteredSubText variant="h6">
          {info.contact}
          </CenteredSubText>
        </CustomContentContainer>
      </CustomRootContainer>
    </ThemeProvider>
  );
}
