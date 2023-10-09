import { Send } from 'react-feather';
import cx from 'classnames';
import { useEffect, useRef } from 'react';

type ChatInputProps = {
  onSubmit: () => void;
  message: string;
  onMessageChange: (text: string) => void;
  disabled: boolean;
};

const ChatInput = ({
  message,
  disabled,
  onSubmit,
  onMessageChange,
}: ChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!message || disabled) {
      return;
    }
    onSubmit();
  };
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="pt-4">
      <div className="flex justify-between rounded border-2 border-gray-100 mb-4 p-2.5 gap-2 dark:border-gray-400">
        <input
          placeholder="Ask to all indexes"
          className={cx(
            'flex-1 outline-0 dark:bg-stone-900 dark:text-gray-200',
            disabled && 'pointer-events-none'
          )}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyDown={onKeyDown}
          ref={inputRef}
        />
        <Send
          size={24}
          onClick={handleSubmit}
          className={cx(
            message
              ? 'stroke-stone-900 dark:stroke-gray-200 cursor-pointer'
              : 'stroke-gray-200 dark:stroke-gray-400'
          )}
          data-testid="send-icon"
        />
      </div>
      <div className="flex flex-col items-end">
        <span className="text-gray-400 font-medium text-xs">
          Powered by{' '}
          <a
            className="text-gray-800 underline dark:text-gray-200"
            href="https://index.network"
            target="_blank"
          >
            index.network
          </a>
        </span>
      </div>
    </div>
  );
};

export default ChatInput;
