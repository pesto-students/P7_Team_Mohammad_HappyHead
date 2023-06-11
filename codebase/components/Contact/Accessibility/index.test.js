import React from 'react';
import { render } from '@testing-library/react';
import Accessibility from './Accessibility';
import Header from '../../Layout/Header/Index';
import Footer from '../../Layout/Footer/Index';
import AccessibilityPage from '../../Contact/Accessibility/Accessibility';

jest.mock('../../Layout/Header/Index', () => () => <div>Mocked Header</div>);
jest.mock('../../Layout/Footer/Index', () => () => <div>Mocked Footer</div>);
jest.mock('../../Contact/Accessibility/Accessibility', () => () => <div>Mocked AccessibilityPage</div>);

describe('Accessibility', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Accessibility />);

    expect(getByText('Mocked Header')).toBeInTheDocument();
    expect(getByText('Mocked AccessibilityPage')).toBeInTheDocument();
    expect(getByText('Mocked Footer')).toBeInTheDocument();
  });
});
