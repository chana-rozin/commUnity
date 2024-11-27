"use client"
import { useEffect, useState, useRef } from 'react';
import { pusherClient } from '@/services/pusher';
import ForumMessage from './ForumMessage';
import ForumInput from './ForumInput';
import { ForumMessageType } from '@/types/forum';

const ForumPage = () => {
  // State to store messages
  const [messages, setMessages] = useState<ForumMessageType[]>([]);
  
  // Ref to automatically scroll to the latest message
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Scroll to the bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Subscribe to Pusher channel when component mounts
  useEffect(() => {
    // Create a channel subscription
    const channel = pusherClient.subscribe('forum');

    channel.bind('new-message', (data: any) => {
        console.log('Received message:', data); // Debug log
        setMessages((prev) => [...prev, data.message]);
      });

    // Cleanup subscription when component unmounts
    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe('forum');
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-lg">
      {/* Messages container with scrolling */}
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <ForumMessage 
            key={`${index}-${message.text}`} 
            message={message} 
          />
        ))}
        {/* Invisible div to enable scrolling to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area at the bottom */}
      <ForumInput />
    </div>
  );
};

export default ForumPage;