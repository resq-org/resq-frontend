import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '@/app/page';

describe('Page', () => {
  it('renders the page', () => {
    render(<Page />);
    expect(screen.getByText(/테스트 컴포넌트/i)).toBeInTheDocument();
  });
});
