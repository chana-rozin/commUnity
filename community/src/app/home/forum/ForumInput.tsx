import { useState } from 'react';
import { Comment } from '@/types/general.type';
import http from '@/services/http';

interface ForumInputProps {
    postId: string; 
  }
const ForumInput: React.FC<ForumInputProps> = ({postId}) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
        const newComment: Comment = {
          _id: `${text}123${Date.now()}`,
          creatorId: 'Anonymous', // TODO: Replace with actual user id
          content: text.trim(),
          createdDate: new Date(),
          likedBy: [],
        };

        await http.post('/pusher/send', {
            channel: `forum_${postId}`,
            //channel: `forum`,

            event: 'new-message',
            message: newComment,
        });

        await http.post(`/posts/${postId}/comments`,  newComment );

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
      className="flex flex-nowrap gap-4 items-center p-2 mt-8 max-w-full text-base font-medium text-right bg-violet-50 rounded-xl h-[48px] text-neutral-500 w-[737px]"
      role="form"
      aria-label="Add comment form"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="גם לך יש מה לומר? הוסף תגובה.."
        disabled={isLoading}
        className="grow shrink min-w-0 bg-transparent border-none outline-none"
        aria-label="Add your comment"
      />
  
      <button
        type="submit"
        aria-label="Submit comment"
        className="object-contain shrink-0 w-[26px] h-[26px]"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a09aa0cbec71a377e4491ba498fb49d4c897d2fd081fdbec05ebe68894c70ec?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
          alt=""
          className="w-full h-full"
        />
      </button>
    </form>
  );
  
};

export default ForumInput;