import { useState } from 'react';
import { ForumMessageType } from '@/types/forum';

const ForumInput = () => {
  // State management for input, loading, and error states
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    // Prevent sending empty or whitespace-only messages
    if (!text.trim()) return;

    // Reset previous errors and set loading state
    setIsLoading(true);
    setError(null);

    try {
      // Send message to Pusher via API route
      const response = await fetch('/api/pusher/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: 'forum', 
          event: 'new-message',
          message: { 
            user: 'Anonymous', // TODO: Replace with actual user authentication
            text: text.trim() 
          } as ForumMessageType, 
        }),
      });

      // Throw an error if the response is not OK
      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Clear input after successful send
      setText('');
    } catch (err) {
      // Handle and display any errors that occur during sending
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error(err);
    } finally {
      // Always reset loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message"
          disabled={isLoading}
          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button 
          onClick={handleSubmit} 
          disabled={isLoading || !text.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md 
            hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed 
            transition-colors duration-200"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm animate-bounce">
          {error}
        </p>
      )}
    </div>
  );
};

export default ForumInput;