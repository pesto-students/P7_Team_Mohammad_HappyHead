import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';
import '@testing-library/jest-dom';


describe('Connect component', () => {
  it('renders page sections correctly', () => {
    render(<About />);
    
    const heading = screen.getByRole('heading', { level: 3, name: /connect with experts/i });
    expect(heading).toBeInTheDocument();
    
    // Check if the centered subtext is rendered
    const subtext = screen.getByText(/happyhead provides users with a convenient and reliable way to connect/i);
    expect(subtext).toBeInTheDocument();
  });
});







