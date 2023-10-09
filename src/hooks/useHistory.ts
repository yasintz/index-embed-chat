import { useCallback, useEffect, useState } from 'react';
import { MessageType } from '../helpers/types';

type History = {
  createdAt: string;
  updatedAt: string;
  items: MessageType[];
  hydrated: boolean;
};

const localStorageKey = 'index-history-123';

function getItemsFromLocalStorage(): History | undefined {
  const historyCacheString = localStorage.getItem(localStorageKey);

  if (!historyCacheString) {
    return;
  }

  const data: History = JSON.parse(historyCacheString);

  const lastMessage = data.items[data.items.length - 1];

  const items =
    lastMessage?.role === 'user'
      ? data.items.slice(0, data.items.length - 1)
      : data.items;

  return {
    ...data,
    items,
    hydrated: true,
  };
}

function useHistory() {
  const [history, setHistory] = useState<History>(
    getItemsFromLocalStorage() || {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: [],
      hydrated: false,
    }
  );

  useEffect(() => {
    if (history.hydrated) {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({
          ...history,
          updatedAt: new Date().toISOString(),
        })
      );
    }
  }, [history]);

  const pushItem = useCallback((item: MessageType) => {
    setHistory((prev) => ({
      ...prev,
      items: [...prev.items, item],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory({
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: [],
      hydrated: true,
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setHistory((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.id !== id),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateItem = useCallback((id: string, item: Partial<MessageType>) => {
    setHistory((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.id === id
          ? {
              ...i,
              ...item,
            }
          : i
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const markAsError = useCallback((id: string) => {
    setHistory((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.id === id
          ? {
              ...i,
              error: true,
            }
          : i
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  return {
    history,
    pushItem,
    removeItem,
    clearHistory,
    updateItem,
    markAsError,
  };
}

export default useHistory;
