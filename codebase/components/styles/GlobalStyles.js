import { Global } from '@emotion/react';
import theme from './theme';

const GlobalStyles = () => (
  <Global
    styles={`
      :root {
        --primary-color: ${theme.palette.primary.main};
      }
    `}
  />
);

export default GlobalStyles;
