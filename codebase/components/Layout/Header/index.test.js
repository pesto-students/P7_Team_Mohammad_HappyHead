import { render, screen } from '@testing-library/react';
import ResponsiveAppBar from './ResponsiveAppBar.js';

describe('ResponsiveAppBar', () => {
  test('renders logo and title', () => {
    render(<ResponsiveAppBar />);

    const logoElement = screen.getByRole('img', { name: 'AddReactionOutlined' });
    expect(logoElement).toBeInTheDocument();

    const titleElement = screen.getByText('HappyHead');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<ResponsiveAppBar />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const featuresLink = screen.getByRole('link', { name: 'Features' });
    expect(featuresLink).toBeInTheDocument();

    const contactLink = screen.getByRole('link', { name: 'Contact' });
    expect(contactLink).toBeInTheDocument();
  });

  // Add more tests for other functionality and behavior of the component
});
