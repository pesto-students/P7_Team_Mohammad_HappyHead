import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeroComponent from './HeroComponent.jsx';


import '@testing-library/jest-dom/extend-expect';


describe('HeroComponent', () => {
  test('renders the component', () => {
    render(<HeroComponent />);

    // Assert the presence of specific elements
    expect(screen.getByText('Your Chief Happiness Officer')).toBeInTheDocument();
    expect(screen.getByText('HappyHead')).toBeInTheDocument();
    expect(screen.getByText('Try for free')).toBeInTheDocument();
    expect(screen.getByText('Register as an Expert')).toBeInTheDocument();
    expect(screen.getByText("Already a user? Login")).toBeInTheDocument();

    // Assert the presence of icons
   
  });

  test('performs click event on buttons', () => {
    render(<HeroComponent />);

    // Simulate button clicks and assert the expected behavior
    const tryForFreeButton = screen.getByText('Try for free');
    const registerButton = screen.getByText('Register as an Expert');
    const loginLink = screen.getByText("Already a user? Login");

    userEvent.click(tryForFreeButton);
    // Assert the expected behavior after clicking the "Try for free" button

    userEvent.click(registerButton);
    // Assert the expected behavior after clicking the "Register as an Expert" button

   // userEvent.click(loginLink);
    // Assert the expected behavior after clicking the "Already a user? Login" link
  });
});
