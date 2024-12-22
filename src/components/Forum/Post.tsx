import * as React from "react";
import { useState } from "react";
import { getTimeDifference } from "@/utils/dates";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { Creator } from "@/types/general.type"

export interface PostProps {
  creator: Creator;
  createdDate: Date | string;
  content: string;
  images: string[];
  commentCount: number;
  likesCount: number;
  liked: boolean;
  saved: boolean;
  onLike?: (isCurrentlyLiked: boolean) => void;
  onSave?: () => void;
}

export const PostComp: React.FC<PostProps> = ({ creator, likesCount: initialLikesCount, createdDate, content,
  commentCount, liked, saved, images, onLike, onSave,
}) => {
  const [isSaved, setIsSaved] = useState(saved);
  const [isSaving, setIsSaving] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLiked, setIsLiked] = useState(liked);
  const [isLiking, setIsLiking] = useState(false);
  const date = createdDate instanceof Date ? createdDate : new Date(createdDate);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiking) return;
    setIsLiking(true);

    try {
      setIsLiked(!isLiked);
      setLikesCount((current) => (isLiked ? current - 1 : current + 1));
      if (onLike) {
        await onLike(isLiked);
      }
    } catch (error) {
      setIsLiked(isLiked);
      setLikesCount((current) => (isLiked ? current + 1 : current - 1));
      console.error("Like action failed:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaving) return;
    setIsSaving(true);
    try {
      setIsSaved(!isSaved);
      if (onSave) {
        await onSave();
      }
    } catch (error) {
      setIsSaved(isSaved);
      console.error("Save action failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col p-4 mb-4 w-full bg-white rounded-2xl cursor-pointer">
      {/* Header Section */}
      <div className="flex gap-4 items-start mb-4">
        <div className="flex items-center gap-3">
          <img src={creator?.profile_picture_url? creator.profile_picture_url : ""} alt="User avatar" className="w-10 h-10 rounded-full object-cover" />
        </div>
        <div className="flex flex-col items-start">
          <div className="text-sm font-semibold text-neutral-950">{creator?.first_name?`${creator.first_name} ${creator.last_name}`:"אנונימי"}</div>
          <div className="text-xs text-neutral-500">
            {`${getTimeDifference(date)} • ${commentCount} תגובות`}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="text-base leading-6 text-right text-neutral-950 mb-4">
        {content}
      </div>

      {/* Images Section */}
      {images?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 rounded-lg overflow-hidden">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Post image ${index + 1}`} className="w-full h-auto rounded-lg object-cover" />
          ))}
        </div>
      )}

      {/* Bottom Section */}
      <div className="flex justify-between items-center w-full mt-4">
        {/* Left: Likes */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            <BiLike className="w-4 h-4 text-gray-500" />
          </div>
          <span className="text-xs text-neutral-500">{`${likesCount} אנשים אהבו`}</span>
        </div>

        {/* Right: Actions */}
        <div className="flex gap-5">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${isLiked
                ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                : "bg-neutral-100 hover:bg-neutral-200"
              }`}
          >
            <span className="text-sm">אהבתי</span>
            {isLiked ? (
              <BiSolidLike className="w-4 h-4" />
            ) : (
              <BiLike className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${isSaved
                ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                : "bg-neutral-100 hover:bg-neutral-200"
              }`}
          >
            <span className="text-sm">שמור</span>
            {isSaved ? (
              <TiStarFullOutline className="w-4 h-4" />
            ) : (
              <TiStarOutline className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
