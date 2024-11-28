import * as React from 'react';

export interface CommentProps {
  creatorId: string;
  content: string;
  createdDate: Date;
}

export const CommentComp: React.FC<CommentProps> = ({
  creatorId,
  createdDate,
  content,
}) => {
    const date = createdDate instanceof Date ? createdDate : new Date(createdDate);

    return (
        <>
          {createdDate && (
            <div className="px-16 pt-6 pb-3.5 w-full text-xs font-medium leading-none text-center text-neutral-500 max-md:px-5 max-md:max-w-full">
              {`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`} {/* Replace with your formatted date */}
            </div>
          )}
          <div className="flex items-start mt-5 w-full max-md:max-w-full">
            {/* Left Avatar */}
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/68b95c1707a8445652f77e217614fe7ec26ad8b08cd2f80fdc0fcd5190bb58e2?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
              alt=""
              className="object-contain shrink-0 aspect-square w-[31px] ml-3"
            />
      
            {/* Right Content */}
            <div className="flex flex-col flex-1 shrink items-start pr-3 basis-0 min-w-[240px] max-md:max-w-full">
              {/* Name and Time */}
              <div className="flex items-center gap-2">
                <div className="overflow-hidden pr-1 text-base font-medium text-right text-neutral-800">
                  {creatorId}
                </div>
                <div className="text-xs leading-none text-center text-neutral-500">
                  {`${date.getHours()}:${date.getMinutes()}`} {/* Replace with formatted time */}
                </div>
              </div>
      
              {/* Comment Content */}
              <div className="mt-1 text-xs leading-4 text-right text-neutral-800 max-w-[565px] max-md:max-w-full">
                {content}
              </div>
            </div>
          </div>
        </>
      );
      
};