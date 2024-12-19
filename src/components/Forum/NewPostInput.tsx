"use client";
import * as React from "react";
import useUserStore from "@/stores/userStore";
import { useCreatePost } from "@/services/mutations/forum";
import { Post } from "@/types/post.type";
import { ImageUpload } from "@/components/uploadImage/uploadImage";
import { FaImages } from "react-icons/fa6"

export const NewPostInput: React.FC = () => {
  const [text, setText] = React.useState("");
  const [images, setImages] = React.useState<string[]>([]);
  const [showImageUpload, setShowImageUpload] = React.useState(false);
  const user = useUserStore((state) => state.user);

  const createPostMutation = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim() && images.length === 0) {
      console.error("Cannot submit an empty post");
      return;
    }
    if(!user||!user?._id){
      throw new Error ("Please enter a user");
    }
    const postData: Partial<Post> = {
      content: text,
      title: text.slice(0, 50),
      createdDate: new Date(),
      images,
      comments: [],
      likedBy: [],
      creator: {
        _id: user._id
      },
      communitiesIds: [user?.neighborhood._id || ""] 
    };


    createPostMutation.mutate(postData, {
      onSuccess: () => {
        setText("");
        setShowImageUpload(false);
        setImages([]);
      },
      onError: (err) => {
        console.error(err instanceof Error ? err.message : "Failed to create post");
      },
    });
  };

  const handleImageUpload = (newImageUrl: string) => {
    if (images.length < 4) {
      setImages((prev) => [...prev, newImageUrl]);
    } else {
      console.warn("Maximum 4 images allowed.");
    }
  };

  return (
    <div className="flex flex-col p-5 mt-4 mb-4 w-full font-medium bg-white rounded-2xl text-neutral-950 max-md:max-w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {/* Profile Picture */}
        <div className="flex gap-4 items-center">
          <img
            loading="lazy"
            src={user?.profile_picture_url}
            alt="User avatar"
            className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square rounded-full object-cover"
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
        <div className="flex justify-between items-center gap-4 mt-3 w-full">
          <button type="button" onClick={() => setShowImageUpload(!showImageUpload)}
            className="flex gap-2 items-center px-5 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all"
          >
            <FaImages className="w-5 h-5 text-indigo-600" />
            הוסף תמונה
          </button>
          <button type="submit" className="flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all">
            פרסם
          </button>
        </div>


        {/* Image Upload Component */}
        {showImageUpload && (
          <div className="">
            <ImageUpload setImageUrl={handleImageUpload} />
          </div>
        )}

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 rounded-lg overflow-hidden mt-3">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Uploaded image ${index + 1}`}
                className="w-full h-auto rounded-lg object-cover"
              />
            ))}
          </div>
        )}
      </form>
    </div>
  );
};
