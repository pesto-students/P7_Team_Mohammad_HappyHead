import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactSection from './ContactSection';
import '@testing-library/jest-dom/extend-expect';


describe('ContactSection', () => {
  test('renders contact section with correct links', () => {
    render(<ContactSection />);
    
    // Check if the heading is rendered
    const heading = screen.getByRole('heading', { level: 6, name: /contact/i });
    expect(heading).toBeInTheDocument();

    // Check if the contact links are rendered
    const contactLink = screen.getByRole('link', { name: /contact us/i });
    expect(contactLink).toBeInTheDocument();

    const resourcesLink = screen.getByRole('link', { name: /mental health resources/i });
    expect(resourcesLink).toBeInTheDocument();

    const accessibilityLink = screen.getByRole('link', { name: /accessibility statement/i });
    expect(accessibilityLink).toBeInTheDocument();
  });
});
