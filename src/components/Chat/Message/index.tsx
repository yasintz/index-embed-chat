import cx from 'classnames';
import { MessageType, UserType } from '../../../helpers/types';
import BlinkCursor from './BlinkCursor';
import CopyButton from './CopyButton';

type ChatMessageProps = {
  message: MessageType;
  user: UserType;
  assistantPhoto: string;
};

const ChatMessage = ({ message, user, assistantPhoto }: ChatMessageProps) => {
  const { content, error } = message;
  const photo = message.role === 'assistant' ? assistantPhoto : user.photo;

  return (
    <div className="flex pb-5 border-b last:border-none dark:border-gray-400 mt-5 relative gap-3">
      <img src={photo} className="w-8 h-8 rounded" data-testid="photo" />
      {error && (
        <div className="absolute w-3 h-3 rounded-full bg-red-600 top-6 left-6" />
      )}

      <span
        className={cx(
          'font-medium text-base text-gray-700 dark:text-gray-300 text-start flex-1',
          {
            'bg-red-500 border border-red-500 rounded p-1 bg-opacity-5': error,
          }
        )}
      >
        {error ? (
          'OOPS! Something went wrong.'
        ) : (
          <>
            {content}
            {message.aiStream && <BlinkCursor />}
          </>
        )}
      </span>
      {!error && message.role === 'assistant' && (
        <CopyButton text={message.content} />
      )}
    </div>
  );
};

export default ChatMessage;
