import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Metrics/i);
  expect(linkElement).toBeInTheDocument();
});
