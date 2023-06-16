import React from 'react';
import { render, screen } from '@testing-library/react';
import FeaturesSection from './FeaturesSection';
import '@testing-library/jest-dom/extend-expect';


describe('FeaturesSection', () => {
  test('renders features section with correct links', () => {
    // Mock data for feature links
    const featureLinks = [
      { name: 'Feature 1', path: '/feature1' },
      { name: 'Feature 2', path: '/feature2' },
      { name: 'Feature 3', path: '/feature3' },
    ];

    render(<FeaturesSection featureLinks={featureLinks} />);

    // Check if the heading is rendered
    const heading = screen.getByRole('heading', { level: 6, name: /features/i });
    expect(heading).toBeInTheDocument();

    // Check if the feature links are rendered
    featureLinks.forEach((feature) => {
      const featureLink = screen.getByRole('link', { name: feature.name });
      expect(featureLink).toBeInTheDocument();
      expect(featureLink).toHaveAttribute('href', feature.path);
    });
  });
});
