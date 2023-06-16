import { render, screen } from '@testing-library/react';
import AboutSection from './AboutSection';
import '@testing-library/jest-dom'; // Import the library


describe('AboutSection', () => {
  test('renders section title', () => {
    render(<AboutSection />);
    
    // Check if the section title is rendered
    const titleElement = screen.getByText('About');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders link to "About HappyHead"', () => {
    render(<AboutSection />);
    
    // Check if the link to "About HappyHead" is rendered
    const aboutHappyHeadLink = screen.getByRole('link', { name: 'About HappyHead' });
    expect(aboutHappyHeadLink).toBeInTheDocument();
    expect(aboutHappyHeadLink.getAttribute('href')).toBe('about#about-happyhead');
  });

  test('renders link to "Our Aim"', () => {
    render(<AboutSection />);
    
    // Check if the link to "Our Aim" is rendered
    const ourAimLink = screen.getByRole('link', { name: 'Our Aim' });
    expect(ourAimLink).toBeInTheDocument();
    expect(ourAimLink.getAttribute('href')).toBe('/about#about-aim');
  });

  test('renders link to "The Team"', () => {
    render(<AboutSection />);
    
    // Check if the link to "The Team" is rendered
    const theTeamLink = screen.getByRole('link', { name: 'The Team' });
    expect(theTeamLink).toBeInTheDocument();
    expect(theTeamLink.getAttribute('href')).toBe('/about#about-team');
  });
});
