import * as React from 'react';

export interface PostProps {
  creatorId: string;
  createdDate: Date | string;
  content: string;
  commentCount: number;
  likedBy: string[];
  comments?: Comment[];
  onClick: () => void; 
}

export const PostComp: React.FC<PostProps> = ({
  creatorId,
  likedBy,
  createdDate,
  content,
  comments,
  onClick,  
}) => {
  const date = createdDate instanceof Date ? createdDate : new Date(createdDate);

  return (
    <div
      className="flex flex-col p-4 w-full bg-white rounded-2xl cursor-pointer"
      onClick={onClick}
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
          <div className="text-xs text-neutral-500">{`${new Date().getDate()-date.getDate()} דקות • ${comments?.length} תגובות`}</div>
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
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/692f163df525a91b97030c50d0f0e38b3d11bbb7a79424fe9cfaea48a1d9297f?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
              alt="User Avatar"
              className="w-5 h-5 rounded-full border-2 border-white"
            />
          </div>
          <span className="text-xs text-neutral-500">{`23 אנשים אהבו`}</span>
        </div>
  
        {/* Right: Actions */}
        <div className="flex gap-5">
          <button className="flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full">
            <span className="text-sm">אהבתי</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2eb907e4d5a46a12062719c794ef0c8e7ce1001b27bac3c8aaa9fdb84287318?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
              alt="Like Icon"
              className="w-4 h-4"
            />
          </button>
          <button className="flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full">
            <span className="text-sm">שמור</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/580659e4ec9fec1933077fa175896b6428ff410cb160f48dc402e83b9cf7c848?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
              alt="Save Icon"
              className="w-4 h-4"
            />
          </button>
        </div>
      </div>
    </div>
  );
  
};
