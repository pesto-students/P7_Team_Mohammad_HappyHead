import { ThemeProvider, styled } from '@mui/system';
import Image from 'next/image'
import RootContainer from '../../styles/RootContainerStyles';
import ContentContainer from '../../styles/ContentContainerStyles';
import SubText from '../../styles/SubTextStyles';
import theme from '../../styles/theme';

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '1rem 2rem 2rem 2rem',
}));

// Styled component for the custom content container
const CustomContentContainer = styled(ContentContainer)({
  backgroundColor: theme.palette.secondary.main,
  padding: '2rem 0',
  borderRadius: '8px',
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
          <Image
            src="/images/contact/access.png"
            alt="accessibility"
            width={200}
            height={200}
          />
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
