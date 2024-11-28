import { useState } from 'react';
//import { v4 as uuidv4 } from 'uuid';
import { Post } from '@/types/post.type';

const ForumInput = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const newPost: Post = {
        id: "123",
        creatorId: 'Anonymous', // TODO: Replace with actual user authentication
        communityId: '',
        createdDate: new Date(),
        title: '',
        content: text.trim(),
        images: [],
        comments: [],
        likedBy: [],
      };

      const response = await fetch('/api/pusher/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: 'forum', 
          event: 'new-message',
          message: newPost,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-10 items-center p-3 mt-8 max-w-full text-base font-medium text-right bg-violet-50 rounded-xl min-h-[48px] text-neutral-500 w-[737px]"
      role="form"
      aria-label="Add comment form"
    >
      <button
        type="submit"
        aria-label="Submit comment"
        className="object-contain shrink-0 self-stretch my-auto aspect-[1.08] w-[26px]"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a09aa0cbec71a377e4491ba498fb49d4c897d2fd081fdbec05ebe68894c70ec?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
          alt=""
          className="w-full h-full"
        />
      </button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="גם לך יש מה לומר? הוסף תגובה.."
        disabled={isLoading}
        className="grow shrink self-stretch my-auto w-[609px] max-md:max-w-full bg-transparent border-none outline-none"
        aria-label="Add your comment"
      />
    </form>
  );
};

export default ForumInput;