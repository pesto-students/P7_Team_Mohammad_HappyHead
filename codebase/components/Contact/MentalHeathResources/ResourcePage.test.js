import { render } from '@testing-library/react';
import ResourcePage from './ResourcePage';
import '@testing-library/jest-dom';


describe('Resources Component', () => {
  test('renders the component without errors', () => {
    render(<ResourcePage />);
    // No error indicates successful rendering
  });

  test('displays the correct text content', () => {
    const { getByText } = render(<ResourcePage />);
    
    expect(getByText('Mental health resources')).toBeInTheDocument();
    expect(getByText('Looking for more help beyond meditation and mindfulness? These trusted mental health resources from India can provide you with extra support when you need it. Explore them below, and feel free to share this page with anyone you care about.')).toBeInTheDocument();
    expect(getByText('Vandrevala Foundation Helpline: 1-860-2662-345 / 91-22-2570-6666')).toBeInTheDocument();
    expect(getByText('Snehi Helpline: +91-22-2772-6773 / +91-22-2772-6774')).toBeInTheDocument();
    expect(getByText('iCall Helpline: 022-2556-3291 / 022-2556-3292')).toBeInTheDocument();
    expect(getByText('Sumaitri Helpline: 011-2338-9090')).toBeInTheDocument();
  });
});
