import { expect, it, describe, beforeAll, vi } from 'vitest';
import { render } from '@testing-library/react';
import Chat from './';
import { MessageType } from '../../helpers/types';

const sampleUser = {
  photo: 'https://www.example.com/user.jpeg',
};
const sampleAssistantPhoto = 'https://www.example.com/assistant.jpeg';
const sampleHistory: MessageType[] = [
  {
    id: '1',
    content: 'Hello, this is a test message 1',
    role: 'user',
  },
  {
    id: '2',
    content: 'Hello, this is a test message 2',
    role: 'assistant',
  },
];

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Element.prototype.scrollTo = vi.fn() as any;
});

describe('Chat', () => {
  it('renders without errors with no chat history', () => {
    const { getByText, getByTestId } = render(
      <Chat
        user={sampleUser}
        assistantPhoto={sampleAssistantPhoto}
        onReset={() => {}}
        history={[]}
        message=""
        onMessageChange={() => {}}
        onSubmit={() => {}}
      />
    );

    expect(
      getByText('Your responses will align with all Ceramic Network’s indexes.')
    ).toBeInTheDocument();
    expect(getByTestId('no-activities')).toBeInTheDocument();
  });

  it('renders chat history messages', () => {
    const { getByText } = render(
      <Chat
        user={sampleUser}
        assistantPhoto={sampleAssistantPhoto}
        onReset={() => {}}
        history={sampleHistory}
        message=""
        onMessageChange={() => {}}
        onSubmit={() => {}}
      />
    );

    expect(getByText('Hello, this is a test message 1')).toBeInTheDocument();
    expect(getByText('Hello, this is a test message 2')).toBeInTheDocument();
  });

  it('scrolls to the bottom when new message is added', () => {
    const { rerender, getByTestId } = render(
      <Chat
        user={sampleUser}
        assistantPhoto={sampleAssistantPhoto}
        onReset={() => {}}
        history={sampleHistory}
        message=""
        onMessageChange={() => {}}
        onSubmit={() => {}}
      />
    );

    const scrollContainer = getByTestId('scroll-container') as HTMLDivElement;

    Object.defineProperty(scrollContainer, 'scrollHeight', {
      get() {
        return 100;
      },
    });

    const updatedHistory: MessageType[] = [
      ...sampleHistory,
      { id: '3', content: 'New message', role: 'assistant' },
    ];
    rerender(
      <Chat
        user={sampleUser}
        assistantPhoto={sampleAssistantPhoto}
        onReset={() => {}}
        history={updatedHistory}
        message=""
        onMessageChange={() => {}}
        onSubmit={() => {}}
      />
    );

    expect(scrollContainer.scrollTo).toHaveBeenCalledWith({
      top: 100,
      behavior: 'smooth',
    });
  });
});
