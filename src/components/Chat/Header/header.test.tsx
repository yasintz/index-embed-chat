import { expect, it, vi, describe } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ChatHeader from '.';

describe('ChatHeader', () => {
  it('renders without errors', () => {
    const { getByText, getByTestId } = render(
      <ChatHeader photo="test-photo" onReset={() => {}} />
    );

    expect(getByText('Reset')).toBeInTheDocument();
    expect(getByTestId('reset-icon')).toBeInTheDocument();
  });

  it('calls the onReset function when the reset button is clicked', () => {
    const mockOnReset = vi.fn();
    const { getByText } = render(
      <ChatHeader photo="test-photo" onReset={mockOnReset} />
    );

    const resetButton = getByText('Reset');

    fireEvent.click(resetButton);

    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });
});
