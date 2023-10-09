import { readStreamsFromResponse } from '../../helpers/streams';
import { MessageType } from '../../helpers/types';

export const getChatResponse = async ({
  message,
  onData,
  historyItems,
  indexId,
}: {
  message: string;
  onData: (message: string) => void;
  historyItems: MessageType[];
  indexId: string;
}) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<void>(async (res) => {
    const response = await fetch('https://index.network/api/chat_stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: historyItems
          .map((item) => ({
            role: item.role,
            content: item.content,
          }))
          .concat({
            role: 'user',
            content: message,
          }),
        id: 'random-b56998d5',
        indexes: [indexId],
      }),
    });

    readStreamsFromResponse({
      response,
      onData,
      onEnd: () => res(),
    });
  });
};
