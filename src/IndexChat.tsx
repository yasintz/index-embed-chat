import { useEffect } from 'react';
import { UserType } from './helpers/types';
import './index.css';

type IndexChatProps = {
  id: string;
  style: {
    darkMode: boolean;
  };
  user: UserType;
};

function IndexChat({ style }: IndexChatProps) {
  useEffect(() => {
    window.document.documentElement.setAttribute(
      'data-index-chat-theme',
      style.darkMode ? 'dark' : 'light'
    );
  }, [style.darkMode]);

  return <div>Hello world</div>;
}

export default IndexChat;
