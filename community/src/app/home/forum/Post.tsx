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
      className="flex flex-col p-5 w-full bg-white rounded-2xl cursor-pointer" 
      onClick={onClick} // Attach onClick handler
    >
      {/* Post content */}
      <div className="flex relative flex-wrap gap-4 items-start w-full text-xs">
        <div className="flex z-0 flex-col justify-center items-end my-auto w-36">
          <div className="text-base font-semibold text-neutral-950">{creatorId}</div>
          <div className="font-medium leading-none text-neutral-500">{"ff"}</div>
          <div className="flex gap-2 items-center w-full leading-none max-w-[144px]">
            <div className="flex overflow-hidden gap-1.5 items-center self-stretch my-auto font-medium text-black whitespace-nowrap">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/692f163df525a91b97030c50d0f0e38b3d11bbb7a79424fe9cfaea48a1d9297f?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[15px]"
              />
              <div className="self-stretch my-auto">{likedBy.length}</div>
            </div>
            <div className="flex gap-1 justify-center items-center self-stretch my-auto text-neutral-950">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bd7943f9cd8cf6430654cdea38cf0282c2f1e92e5dc28dacc089e37e7dae0ff?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
              />
              <div className="self-stretch my-auto">{date.getDate()}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-base leading-6 text-right text-neutral-950">
        {content}
      </div>
      <div className="flex flex-wrap gap-10 justify-between items-center mt-4 w-full text-neutral-950">
        <div className="flex gap-3 justify-center items-center self-stretch my-auto text-xs font-bold tracking-normal leading-6">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/aec2e1f1f6a76eb3cb491967953d79f2e60ff2c9b128bbd6ac6a72922a01fa3a?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto aspect-[2.69] w-[86px]"
          />
          <div className="self-stretch my-auto">{comments?.length} תגובות </div>
        </div>
        <div className="flex gap-5 items-start self-stretch my-auto text-base font-medium leading-none whitespace-nowrap">
          <button className="flex gap-3 items-center p-2 bg-neutral-100 rounded-[50px]">
            <div className="self-stretch my-auto">אהבתי</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2eb907e4d5a46a12062719c794ef0c8e7ce1001b27bac3c8aaa9fdb84287318?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
            />
          </button>
          <button className="flex gap-3 items-center p-2 bg-neutral-100 rounded-[50px]">
            <div className="self-stretch my-auto">שמור</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/580659e4ec9fec1933077fa175896b6428ff410cb160f48dc402e83b9cf7c848?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
