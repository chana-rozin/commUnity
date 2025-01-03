import useUserStore from "@/stores/userStore";
import { useState } from 'react';
import { Comment } from '@/types/general.type';
import { useCreateComment } from '@/services/mutations/forum';

interface ForumInputProps {
  postId: string;
}
const NewCommentInput: React.FC<ForumInputProps> = ({ postId }) => {
  const [text, setText] = useState('');
  const user = useUserStore((state) => state.user);
  const createCommentMutation = useCreateComment(postId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) return;
    if (!user || !user._id) {
      throw new Error(`User ${user} not found`);
    }
    const newComment: Comment = {
      _id: `${text}123${Date.now()}`,
      creator: {
        _id: user._id,
        profile_picture_url: user.profile_picture_url,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      content: text.trim(),
      createdDate: new Date(),
      likedBy: [],
    };

    createCommentMutation.mutate(
      { postId, newComment },
      {
        onSuccess: () => setText(''),
        onError: (error) => {
          console.error('Failed to add comment:', error);
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-4 p-2 mt-8 mb-4 w-full max-w-full text-base font-medium bg-violet-50 rounded-xl h-[48px] text-neutral-500"
      role="form"
      aria-label="Add comment form"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="גם לך יש מה לומר? הוסף תגובה.."
        className="flex-grow bg-transparent border-none outline-none min-w-0 text-right"
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

export default NewCommentInput;