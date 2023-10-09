import { useEffect, useState } from 'react';
import useData from './hooks/useData';
import Chat from './components/Chat';
import IndexButton from './components/IndexButton';
import Modal from './components/Modal';
import { UserType } from './helpers/types';
import './index.css';

type IndexChatProps = {
  id: string;
  style: {
    darkMode: boolean;
  };
  user: UserType;
};

function IndexChat({ id: indexId, style, user }: IndexChatProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { message, setMessage, onSubmit, history, clearHistory } =
    useData(indexId);

  useEffect(() => {
    window.document.documentElement.setAttribute(
      'data-index-chat-theme',
      style.darkMode ? 'dark' : 'light'
    );
  }, [style.darkMode]);

  return (
    <>
      <IndexButton onClick={() => setIsChatOpen(true)} />
      <Modal open={isChatOpen} onClose={() => setIsChatOpen(false)}>
        <Chat
          message={message}
          onMessageChange={setMessage}
          onSubmit={onSubmit}
          user={user}
          assistantPhoto="https://avatars.githubusercontent.com/u/52932082"
          onReset={clearHistory}
          history={history.items}
        />
      </Modal>
    </>
  );
}

export default IndexChat;
