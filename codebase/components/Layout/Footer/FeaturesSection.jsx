import React from 'react';
import { Box, Typography } from '@mui/material';
import { NextLinkComposed } from '../../MuiLink';
import theme from '../../styles/theme';

const FeaturesSection = ({ featureLinks }) => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h6" gutterBottom align="center">
          Features
        </Typography>
        {featureLinks.map((feature) => (
          <NextLinkComposed
            key={feature.name}
            to={feature.path}
            color="textPrimary"
            sx={{
              color: theme.palette.text.primary,
              textDecoration: 'none',
              fontFamily: theme.typography.fontFamily,
              fontWeight: theme.typography.fontWeightBold,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" color="textSecondary" component="p" align="center">
              {feature.name}
            </Typography>
          </NextLinkComposed>
        ))}
      </Box>
    );
  };

export default FeaturesSection;
