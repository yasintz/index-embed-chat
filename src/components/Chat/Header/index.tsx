import { RefreshCcw } from 'react-feather';

type ChatHeaderProps = {
  photo: string;
  onReset: () => void;
};

const ChatHeader = ({ photo, onReset }: ChatHeaderProps) => {
  return (
    <div className="flex w-full justify-between pb-2">
      <button
        className="
        flex items-center justify-center text-sm leading-3 font-medium outline-none
        rounded-md bg-white px-2.5 py-1.5 text-gray-900 shadow-sm
        ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto
        dark:bg-stone-800 dark:text-gray-300 dark:ring-transparent
        "
        onClick={onReset}
      >
        <RefreshCcw
          className="mr-2 stroke-gray-800 dark:stroke-gray-200"
          size={16}
          data-testid="reset-icon"
        />
        <span>Reset</span>
      </button>
      <img src={photo} className="w-8 h-8 rounded-sm" />
    </div>
  );
};

export default ChatHeader;
