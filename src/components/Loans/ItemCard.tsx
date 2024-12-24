import * as React from 'react';
import { IconType } from 'react-icons';
import { MdLocationOn } from 'react-icons/md';

export interface ItemCardProps {
  title: string;
  daysAgo: string;
  userName: string;
  address: string;
  isBorrowed: boolean;
  buttonContent?: string;
  ButtonIcon?: IconType; 
  onButtonClick?: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  title,
  daysAgo,
  userName,
  address,
  isBorrowed,
  buttonContent,
  ButtonIcon,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col  flex-1 shrink items-start py-5 pr-5 w-full bg-white rounded-2xl basis-0">
      <div className="gap-4 self-stretch w-full text-lg font-bold leading-10 text-neutral-950">
        {title}
      </div>
      <div className="flex gap-1 justify-center items-center mt-1 text-xs leading-none text-neutral-950">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4b714c3a243138b43c183bef3a3550903636ed03a96f3f029d4f629ae737d3c?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
        />
        <div className="self-stretch my-auto">לפני {daysAgo}</div>
      </div>
      <div className="flex gap-4 items-start mt-2 w-full max-w-xs">
        <div className="flex gap-4 items-start w-80 min-w-[240px]">
          <div className="flex flex-row justify-center items-start">
            <div className="text-base mt-1 font-bold leading-none text-indigo-600">
              {isBorrowed ? "המשאיל:" : "השואל:"}
            </div>
            <div className="flex flex-col mr-2">
              <div className="text-base font-semibold text-neutral-950">
                {userName ? userName : "עוד לא נמצא:("}
              </div>
              <div className="flex items-center gap-1 text-xs font-medium leading-none text-neutral-500">
            <MdLocationOn className="w-4 h-4 text-neutral-500" />
            <span>{address}</span>
          </div>
            </div>
          </div>
        </div>
      </div>
      {buttonContent && ButtonIcon && onButtonClick && (
        <div className="flex gap-3 mt-8 items-center self-stretch w-full text-base font-medium leading-none text-neutral-100">
          <button
            onClick={onButtonClick}
            className="flex gap-3 items-center p-3 bg-indigo-600 rounded-[50px] hover:bg-indigo-500"
          >
            <span className="self-stretch my-auto">{buttonContent}</span>
            <ButtonIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
