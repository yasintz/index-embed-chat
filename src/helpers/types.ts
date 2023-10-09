export type UserType = {
  photo: string;
};

export type MessageType = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  aiStream?: boolean;
  error?: boolean;
};
