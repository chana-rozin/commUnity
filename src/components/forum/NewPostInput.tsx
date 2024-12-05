import * as React from "react";
import useUserStore from "@/stores/userStore";
import { useCreatePost } from "@/services/mutations/forum";
import { Post } from "@/types/post.type";

export interface ActionButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex gap-3 items-center p-2 whitespace-nowrap border border-solid border-neutral-200 rounded-[50px] hover:bg-neutral-100 transition-colors"
    >
      <img
        loading="lazy"
        src={icon}
        alt={label}
        className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
      />
      <div className="self-stretch my-auto pl-4">{label}</div>
    </button>
  );
};

export const NewPostInput: React.FC = () => {
  const [text, setText] = React.useState("");
  const [selectedAction, setSelectedAction] = React.useState<string | null>(null);
  const user = useUserStore((state) => state.user);

  const createPostMutation = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      console.error("Cannot submit an empty post");
      return;
    }

    const postData: Partial<Post> = {
      content: text,
      title: text.slice(0, 50),
      createdDate: new Date(),
      images: selectedAction === 'image' ? [] : undefined,
      comments: [],
      likedBy: [],
      creatorId: user?._id,
    };

    createPostMutation.mutate(postData, {
      onSuccess: () => {
        setText("");
        setSelectedAction(null);
      },
      onError: (err) => {
        console.error(err instanceof Error ? err.message : "Failed to create post");
      },
    });
  };

  const handleActionSelect = (action: string) => {
    setSelectedAction(action);
  };

  return (
    <div className="flex flex-col p-5 mt-4 mb-4 w-full font-medium bg-white rounded-2xl text-neutral-950 max-md:max-w-full">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-center w-full text-base text-right max-md:max-w-full">
        <label htmlFor="discussionInput" className="sr-only">התחל דיון חדש</label>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8591468def0ca3dfa10517b7eff16bf4ac52321869a9c501d891cc98883401c?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
        />
        <input
          id="discussionInput"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 shrink gap-2.5 self-stretch p-3 my-auto bg-violet-50 rounded-xl min-w-[240px] max-md:max-w-full border-none outline-none"
          placeholder="התחל דיון חדש.."
          aria-label="התחל דיון חדש"
        />
      </form>        
        
      <div className="flex gap-5 mt-3 max-w-full text-base leading-none w-[404px]">
        <ActionButton
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/c90f84387b0fb15e5cda12ef3a844a33fdc6b9e464dc6b521127ee70b43b0601?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
          label="כתוב מאמר"
          onClick={() => handleActionSelect("article")}
        />
        <ActionButton
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/67ace55c122ff42c1bfc5875a9a4ac21ea13b38199880b6602e31d23173f516e?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
          label="לינק"
          onClick={() => handleActionSelect("link")}
        />
        <ActionButton
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/8f1ea1511ee451d3c926e8a799eec79171aa269e978949d3ab6f252f4c28e9e2?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
          label="תמונה"
          onClick={() => handleActionSelect("image")}
        />
        <button 
          type="submit"
          className="gap-1 self-stretch px-4 py-2 text-sm leading-none text-center text-white whitespace-nowrap bg-indigo-600 rounded-md"
          onClick={handleSubmit}
        >
          שלח
        </button>
      </div>
    </div>
  );
};