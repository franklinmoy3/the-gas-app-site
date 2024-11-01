import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../app/page';

describe('Page', () => {
  it('has a main', () => {
    render(<Page />);

    const target = screen.getByRole('main');

    expect(target).toBeInTheDocument();
  });
});
