import * as React from 'react';
export interface ItemCardProps {
    title: string;
    daysAgo: number;
    userName: string;
    address: string;
    isBorrowed: boolean;
    onReturn?: () => void;
    onRemind?: () => void;
  }
export const ItemCard: React.FC<ItemCardProps> = ({
  title,
  daysAgo,
  userName,
  address,
  isBorrowed,
  onReturn,
  onRemind
}) => {
  return (
    <div className="flex flex-col flex-1 shrink items-start py-5 pr-5 w-full bg-white rounded-2xl basis-0">
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
        <div className="self-stretch my-auto">לפני {daysAgo} ימים</div>
      </div>
      <div className="flex gap-4 items-start mt-2 w-full max-w-xs">
        <div className="flex gap-4 items-start w-80 min-w-[240px]">
          <div className="flex flex-row justify-center items-start">
            <div className="text-base mt-1 font-bold leading-none text-indigo-600">
            {isBorrowed ? "השואל:":"המשאיל:"}
            </div>
            <div className="flex flex-col mr-2">
            <div className="text-base font-semibold text-neutral-950">
              {userName}
            </div>
            <div className="text-xs font-medium leading-none text-neutral-500">
              {address}
            </div>
            </div>
          </div>
          
        </div>
      </div>
      <div className="flex gap-3 mt-8 items-center self-stretch w-full text-base font-medium leading-none text-neutral-100">
        <div className="flex items-center">
          {isBorrowed ? (
            <button
              onClick={onReturn}
              className="flex gap-3 items-center p-3 bg-indigo-600 rounded-[50px]">
              <span className="self-stretch my-auto">החזרתי!</span>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c3802ac905fb5f7158ac32beb79d55b28a3351cb29b01bbfd7788ea91e194f9?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto aspect-[1.05] w-[21px]"
              />
            </button>
          ) : (
            <button
              onClick={onRemind}
              className="flex gap-3 items-center p-3 bg-indigo-600 rounded-[50px]">
              <span className="self-stretch my-auto">שלח תזכורת</span>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d53b1afc94110826def449651948a7b71edd55f5c2771140a16ff41b409b905d?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};