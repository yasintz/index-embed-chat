import { useState } from 'react';
import useHistory from './useHistory';
import { getChatResponse } from '../clients/api/chat-stream';

export default function useData(indexId: string) {
  const { history, pushItem, updateItem, markAsError, clearHistory } =
    useHistory();
  const [message, setMessage] = useState('');

  const onSubmit = async () => {
    const id = Math.random().toString(36).substring(2, 7);
    const answerId = `answer-${id}`;
    try {
      pushItem({
        id,
        content: message,
        role: 'user',
      });
      setMessage('');

      let aiResponse = '';
      pushItem({
        id: answerId,
        content: aiResponse,
        role: 'assistant',
        aiStream: true,
      });
      await getChatResponse({
        indexId,
        historyItems: history.items,
        message: message,
        onData: (streamMessage) => {
          aiResponse += streamMessage;
          updateItem(answerId, { content: aiResponse });
        },
      });

      updateItem(answerId, { aiStream: false });
    } catch (error) {
      markAsError(answerId);
    }
  };

  return {
    onSubmit,
    history,
    clearHistory,
    message,
    setMessage,
  };
}
