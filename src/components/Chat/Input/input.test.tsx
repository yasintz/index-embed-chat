import { expect, it, vi, describe } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ChatInput from '.';

describe('ChatInput', () => {
  it('renders without errors', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ChatInput message="" onSubmit={() => {}} onMessageChange={() => {}} />
    );

    expect(getByPlaceholderText('Ask to all indexes')).toBeInTheDocument();
    expect(getByTestId('send-icon')).toBeInTheDocument();
  });

  it('calls the onSubmit function when the send button is clicked', () => {
    const mockOnSubmit = vi.fn();
    const { getByTestId } = render(
      <ChatInput
        message="Test message"
        onSubmit={mockOnSubmit}
        onMessageChange={() => {}}
      />
    );

    const sendButton = getByTestId('send-icon');

    fireEvent.click(sendButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('updates the message when the input value changes', () => {
    const mockOnMessageChange = vi.fn();
    const { getByPlaceholderText } = render(
      <ChatInput
        message=""
        onSubmit={() => {}}
        onMessageChange={mockOnMessageChange}
      />
    );

    const inputElement = getByPlaceholderText('Ask to all indexes');

    fireEvent.change(inputElement, { target: { value: 'New message' } });

    expect(mockOnMessageChange).toHaveBeenCalledWith('New message');
  });

  it('calls the onSubmit function when the "Enter" key is pressed', () => {
    const mockOnSubmit = vi.fn();
    const { getByPlaceholderText } = render(
      <ChatInput
        message="Test message"
        onSubmit={mockOnSubmit}
        onMessageChange={() => {}}
      />
    );

    const inputElement = getByPlaceholderText('Ask to all indexes');

    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('does not call the onSubmit function when the "Send" button is clicked with an empty message', () => {
    const mockOnSubmit = vi.fn();
    const { getByTestId } = render(
      <ChatInput
        message=""
        onSubmit={mockOnSubmit}
        onMessageChange={() => {}}
      />
    );

    const sendButton = getByTestId('send-icon');

    fireEvent.click(sendButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
