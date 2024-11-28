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
          {date.getDate()}
        </div>
      )}
      <div className="flex flex-wrap items-start mt-5 w-full max-md:max-w-full">
        <div className="flex flex-col flex-1 shrink items-end pr-3 basis-0 min-w-[240px] max-md:max-w-full">
          <div className="flex gap-5 items-center">
            <div className="self-stretch my-auto text-xs leading-none text-center text-neutral-500">
              {date.getDate()}
            </div>
            <div className="overflow-hidden self-stretch pr-1 my-auto text-base font-medium text-right text-neutral-800">
              {creatorId}
            </div>
          </div>
          <div className="max-w-full text-xs leading-4 text-right text-neutral-800 w-[565px] max-md:max-w-full">
            {content}
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/68b95c1707a8445652f77e217614fe7ec26ad8b08cd2f80fdc0fcd5190bb58e2?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
          alt=""
          className="object-contain shrink-0 aspect-square w-[31px]"
        />
      </div>
    </>
  );
};