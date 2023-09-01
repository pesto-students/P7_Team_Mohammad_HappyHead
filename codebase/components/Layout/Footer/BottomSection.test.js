import { render, screen } from '@testing-library/react';
import BottomSection from './BottomSection';

describe('BottomSection', () => {
  test('renders social media icons', () => {
    render(<BottomSection />);
    
    // Check if the social media icons are rendered
    const facebookIcon = screen.getByRole('img', { name: 'Facebook' });
    expect(facebookIcon).toBeInTheDocument();

    const twitterIcon = screen.getByRole('img', { name: 'Twitter' });
    expect(twitterIcon).toBeInTheDocument();

    const instagramIcon = screen.getByRole('img', { name: 'Instagram' });
    expect(instagramIcon).toBeInTheDocument();
  });

  test('renders copyright text', () => {
    render(<BottomSection />);
    
    // Check if the copyright text is rendered
    const copyrightText = screen.getByText(/© \d{4} Your App. All rights reserved./);
    expect(copyrightText).toBeInTheDocument();
  });
});
