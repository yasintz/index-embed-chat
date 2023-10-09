import { useEffect, useRef } from 'react';
import { MessageType, UserType } from '../../helpers/types';
import ChatHeader from './Header';
import ChatInput from './Input';
import ChatMessage from './Message';
import NoActivities from './no-activities';

type ChatProps = {
  user: UserType;
  assistantPhoto: string;
  onReset: () => void;
  history: MessageType[];
  message: string;
  onMessageChange: (text: string) => void;
  onSubmit: () => void;
};

const Chat = ({
  user,
  history,
  message,
  assistantPhoto,
  onReset,
  onMessageChange,
  onSubmit,
}: ChatProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastItem = history[history.length - 1];
  const initialScrollRef = useRef(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current?.scrollHeight,
      ...(initialScrollRef.current && {
        behavior: 'smooth',
      }),
    });
    initialScrollRef.current = true;
  }, [history.length, lastItem?.content]);

  return (
    <div
      className={
        'w-full max-w-lg p-4 flex flex-col bg-white dark:bg-stone-900 rounded-lg h-[35rem]'
      }
    >
      <ChatHeader photo={user.photo} onReset={onReset} />
      <div
        className="flex-1 overflow-y-auto"
        ref={scrollRef}
        data-testid="scroll-container"
      >
        {history.length === 0 && (
          <div>
            <NoActivities />
            <div className="text-gray-700 dark:text-gray-200 text-center mt-6 text-xl w-2/3 m-auto font-bold">
              Your responses will align with all Ceramic Network’s indexes.
            </div>
          </div>
        )}
        {history.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            user={user}
            assistantPhoto={assistantPhoto}
          />
        ))}
      </div>
      <ChatInput
        onSubmit={onSubmit}
        message={message}
        onMessageChange={onMessageChange}
        disabled={history.some((item) => item.aiStream)}
      />
    </div>
  );
};

export default Chat;
