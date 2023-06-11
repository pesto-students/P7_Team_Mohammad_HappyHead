import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from './ContactForm';

describe('Contact', () => {
  test('submits form correctly', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { getByLabelText, getByText } = render(<ContactForm />);

    // Fill in the form fields
    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText('Query'), { target: { value: 'Test query' } });

    // Submit the form
    fireEvent.click(getByText('Submit'));

   

  });
});