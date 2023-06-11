import React from 'react';
import { render } from '@testing-library/react';
import Accessibility from './Accessibility';
import '@testing-library/jest-dom';


describe('Accessibility', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Accessibility />);

    // Check if the main heading is rendered
    expect(getByText('HappyHead Accessibility Statement')).toBeInTheDocument();

    // Check if the mission, aim, and contact information are rendered
    expect(
      getByText(
        'Our mission is to create a world where everyone is kind to their mind — which is why we’re committed to making our mobile products more accessible for every person, regardless of their visual, auditory, cognitive, or motor abilities.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'We are constantly looking for ways to continue to build a more inclusive product and ensure we’re operating according to our mission and values. Accessibility will remain a top priority as HappyHead\'s offerings evolve as we want to empower all members with tools to improve their health and happiness.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'We want to hear from you if you encounter accessibility barriers to using HappyHead. Please send your feedback to accessibility@happyhead.com.'
      )
    ).toBeInTheDocument();
  });
});
