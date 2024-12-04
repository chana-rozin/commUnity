import * as React from 'react';
import { useState } from 'react';
import { BiLike, BiSolidLike } from "react-icons/bi";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";

export interface PostProps {
  creatorId: string;
  createdDate: Date | string;
  content: string;
  commentCount: number;
  likesCount: number;
  liked: boolean;
  saved: boolean;
  onLike?: (isCurrentlyLiked: boolean) => void; 
  onSave?: () => void; 
}

export const PostComp: React.FC<PostProps> = ({ creatorId, likesCount: initialLikesCount, createdDate, content,
  commentCount, liked, saved, onLike, onSave,
}) => {
    const [isSaved, setIsSaved] = useState(saved);
    const [isSaving, setIsSaving] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikesCount);
    const [isLiked, setIsLiked] = useState(liked);
    const [isLiking, setIsLiking] = useState(false);
  const date = createdDate instanceof Date ? createdDate : new Date(createdDate);

  const getTimeDifference = (pastDate: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - pastDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 60) {
      return `${diffMinutes} דקות`;
    } else if (diffHours < 24) {
      return `${diffHours} שעות`;
    } else {
      return `${diffDays} ימים`;
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    if (isLiking) return;
    setIsLiking(true);

    try {
      setIsLiked(!isLiked);
      setLikesCount(current => isLiked ? current - 1 : current + 1);

      if (onLike) {
        await onLike(isLiked); 
      }
    } catch (error) {
      setIsLiked(isLiked);
      setLikesCount(current => isLiked ? current + 1 : current - 1);
      console.error('Like action failed:', error);
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
    } catch (error){
        setIsSaved(isSaved);
        console.error('Save action failed:', error);
    }finally {
        setIsSaving(false);
    }
  };
    
  return (
    <div
      className="flex flex-col p-4 mb-4 w-full bg-white rounded-2xl cursor-pointer"
    >
      {/* Header Section */}
      <div className="flex gap-4 items-start mb-4">
        {/* Left: Actions */}
        <div className="flex items-center gap-3">
          <button>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/68b95c1707a8445652f77e217614fe7ec26ad8b08cd2f80fdc0fcd5190bb58e2?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
              alt="Bookmark"
              className="w-10 h-10"
            />
          </button>
        </div>
        {/* Right: User Info */}
        <div className="flex flex-col items-start">
          <div className="text-sm font-semibold text-neutral-950">{creatorId}</div>
          <div className="text-xs text-neutral-500">
          {`${getTimeDifference(date)} • ${commentCount} תגובות`}
          </div>
        </div>
      </div>
  
      {/* Content Section */}
      <div className="text-base leading-6 text-right text-neutral-950 mb-4">
        {content}
      </div>
  
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
            className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
              isLiked 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'bg-neutral-100'
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
            className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
                isSaved 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'bg-neutral-100'
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
