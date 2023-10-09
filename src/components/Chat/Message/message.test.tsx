import { expect, it, describe } from 'vitest';
import { render } from '@testing-library/react';
import ChatMessage from './';
import { MessageType } from '../../../helpers/types';

const testMessage: MessageType = {
  id: '1',
  content: 'Test message content',
  error: false,
  role: 'user',
};

const testUser = {
  photo: 'https://www.example.com/user.jpeg',
};

const testAssistantPhoto = 'https://www.example.com/assistant.jpeg';

describe('ChatMessage', () => {
  it('renders user message', () => {
    const { getByText, getByTestId } = render(
      <ChatMessage
        message={testMessage}
        user={testUser}
        assistantPhoto={testAssistantPhoto}
      />
    );

    const imageEl = getByTestId('photo') as HTMLImageElement;

    expect(getByText('Test message content')).toBeInTheDocument();
    expect(imageEl).toBeInTheDocument();
    expect(imageEl.src).toBe(testUser.photo);
  });

  it('renders assistant message', () => {
    const assistantMessage: MessageType = {
      id: '1',
      content: 'Assistant message content',
      error: false,
      role: 'assistant',
    };

    const { getByText, getByTestId } = render(
      <ChatMessage
        message={assistantMessage}
        user={testUser}
        assistantPhoto={testAssistantPhoto}
      />
    );

    const imageEl = getByTestId('photo') as HTMLImageElement;

    expect(getByText('Assistant message content')).toBeInTheDocument();
    expect(imageEl).toBeInTheDocument();
    expect(imageEl.src).toBe(testAssistantPhoto);
  });

  it('renders an error message with error styles', () => {
    const errorMessage: MessageType = {
      id: '1',
      content: 'Error message content',
      error: true,
      role: 'assistant',
    };

    const { getByText } = render(
      <ChatMessage
        message={errorMessage}
        user={testUser}
        assistantPhoto={testAssistantPhoto}
      />
    );

    expect(getByText('OOPS! Something went wrong.')).toBeInTheDocument();
  });
});
