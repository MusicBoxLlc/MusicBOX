import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { getChatMessages, sendMessage } from '../../services/ChatService';

const ChatSystem = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Fetch chat messages
    getChatMessages(userId)
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching chat messages. Please try again later.');
        setLoading(false);
      });
  }, [userId]);

  const handleSendMessage = (newMessage) => {
    // Simulated sending of message to the backend
    const messageData = {
      senderId: userId,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    // Simulated API call to send message
    sendMessage(messageData)
      .then(sentMessage => {
        setMessages([...messages, sentMessage]); // Update the messages state with the new message
      })
      .catch(error => {
        setError('Error sending message. Please try again later.');
      });
  };

  return (
    <div className="chat-system">
      <h2>Chat System</h2>
      {loading ? (
        <p>Loading messages...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </div>
          <ChatInput onSendMessage={handleSendMessage} />
        </>
      )}
    </div>
  );
};

export default ChatSystem;
