import React from 'react';
import { render } from '@testing-library/react';
import Experts from './Experts';
import '@testing-library/jest-dom';


describe('Experts', () => {
  test('renders correctly', () => {
    const { getByText, getByAltText } = render(<Experts />);

    // Check if the title and subtext are rendered
    expect(getByText('Find The Right Expert')).toBeInTheDocument();
    expect(
      getByText(
        'You can browse through a diverse selection of experienced and licensed mental health experts. Each expert is carefully vetted to ensure their expertise and credentials, giving you the peace of mind when choosing a professional to connect with.'
      )
    ).toBeInTheDocument();

    // Check if the image is rendered with the correct alt text
    expect(getByAltText('Image 1')).toBeInTheDocument();
  });
});
