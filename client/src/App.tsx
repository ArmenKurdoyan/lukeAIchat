import React, { useState, useEffect } from 'react';
import { axiosInstance } from './api/axiosInstance.ts';
import { Chat } from './components/Chat.tsx';
import ensureUniqueUserId from './utils/uIdGen.ts';
import { formatCreatedAt } from './utils/dateFormater.ts';

import './App.css';

interface ChatProps {
  id: number;
  createdAt: string;
}

export const App: React.FC = () => {
  const [chats, setChats] = useState<ChatProps[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const getId = async () => {
      const uid = await ensureUniqueUserId();
      setUserId(uid);
    };

    getId();
  }, []);

  useEffect(() => {
    fetchChats();
  }, [userId]);

  const fetchChats = async (): Promise<void> => {
    if (userId) {
      try {
        const response = await axiosInstance.get<ChatProps[]>(
          `/chat/user/${userId}`,
        );
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    }
  };

  const createChat = async (): Promise<void> => {
    try {
      const response = await axiosInstance.post<ChatProps>('/chat/start', {
        userId: userId,
      });
      setChats((prev) => [...prev, response.data]);
      fetchChats();
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  if (!userId) {
    return <div>Random user is is being set, please wait.</div>;
  }

  return (
    <div className="app">
      <div className="chat-list-section">
        <h2>Chats</h2>
        <button onClick={createChat}>Start New Chat</button>
        <div className="chat-list-wrapper">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={
                selectedChatId === chat.id
                  ? 'chat-list-item-active'
                  : 'chat-list-item'
              }
            >
              Chat {formatCreatedAt(chat.createdAt)}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-window">
        {selectedChatId ? (
          <Chat chatId={selectedChatId} />
        ) : (
          <h2>Select a chat to start messaging</h2>
        )}
      </div>
    </div>
  );
};
