import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api/axiosInstance.ts";
import { socket } from "../api/socket.ts";
import "./Chat.css";

interface Message {
  id: number;
  chatId: number;
  sender: "user" | "ai";
  content: string;
  createdAt: string;
}

interface ChatProps {
  chatId: number;
}

export const Chat: React.FC<ChatProps> = ({ chatId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    socket.on("newMessage", (message: Message) => {
      if (message.chatId === chatId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [chatId]);

  const fetchMessages = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get<Message[]>(
        `/chat/${chatId}/messages`
      );

      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (): Promise<void> => {
    if (!input) return;

    const newMessage: Message = {
      id: Date.now(),
      chatId,
      sender: "user",
      content: input,
      createdAt: new Date().toISOString(),
    };

    try {
      setMessages((prev) => [...prev, newMessage]);
      setLoading(true);

      const response = await axiosInstance.post<Message>("/chat/message", {
        chatId,
        content: input,
        sender: "user",
      });

      fetchMessages();

      setMessages((prev) =>
        prev.map((msg) => (msg.id === newMessage.id ? response.data : msg))
      );

      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.sender === "ai" ? "ai" : "user"}`}
          >
            {msg.sender === "ai" ? (
              <div
                className="html-content"
                dangerouslySetInnerHTML={{ __html: msg.content }}
              ></div>
            ) : (
              msg.content
            )}
          </div>
        ))}
        {loading && (
          <div className="message ai">
            <div className="spinner"></div>
          </div>
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
