"use client";
import * as React from "react";
import useUserStore from "@/stores/userStore";
import { useCreatePost } from "@/services/mutations/forum";
import { Post } from "@/types/post.type";
import { ImageUpload } from "@/components/uploadImage/uploadImage";

export const NewPostInput: React.FC = () => {
  const [text, setText] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [showImageUpload, setShowImageUpload] = React.useState(false);
  const user = useUserStore((state) => state.user);

  const createPostMutation = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim() && !imageUrl) {
      console.error("Cannot submit an empty post");
      return;
    }

    const postData: Partial<Post> = {
      content: text,
      title: text.slice(0, 50),
      createdDate: new Date(),
      images: imageUrl ? [imageUrl] : [],
      comments: [],
      likedBy: [],
      creatorId: user?._id,
    };

    createPostMutation.mutate(postData, {
      onSuccess: () => {
        setText("");
        setShowImageUpload(false);
        setImageUrl(null);
      },
      onError: (err) => {
        console.error(err instanceof Error ? err.message : "Failed to create post");
      },
    });
  };

  return (
    <div className="flex flex-col p-5 mt-4 mb-4 w-full font-medium bg-white rounded-2xl text-neutral-950 max-md:max-w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {/* Profile Picture */}
        <div className="flex gap-4 items-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8591468def0ca3dfa10517b7eff16bf4ac52321869a9c501d891cc98883401c"
            alt="User avatar"
            className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square rounded-full"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 p-3 bg-violet-50 rounded-xl min-h-[80px] border-none outline-none resize-none "
            placeholder="התחל דיון חדש.."
            aria-label="התחל דיון חדש"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-5 mt-3 max-w-full">
          <button
            type="button"
            onClick={() => setShowImageUpload(!showImageUpload)}
            className="flex gap-2 items-center px-4 py-2 text-sm leading-none text-indigo-600 border border-neutral-200 rounded-md hover:bg-neutral-100 transition-colors"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f1ea1511ee451d3c926e8a799eec79171aa269e978949d3ab6f252f4c28e9e2"
              alt="Add Image"
              className="object-contain w-5 h-5"
            />
            תמונה
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm leading-none text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors"
          >
            שלח
          </button>
        </div>

        {/* Image Upload Component */}
        {showImageUpload && (
          <div className="mt-4">
            <ImageUpload setImageUrl={setImageUrl} />
            {imageUrl && (
              <div className="mt-3">
                <img
                  src={imageUrl}
                  alt="Uploaded preview"
                  className="max-w-full h-auto rounded-lg border border-neutral-200"
                />
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};
