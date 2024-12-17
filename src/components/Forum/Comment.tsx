import * as React from 'react';
import {formatDate} from '@/utils/dates';
import { Creator } from '@/types/general.type';

export interface CommentProps {
  creator: Creator;
  content: string;
  createdDate: Date | string;
  previousDate?: Date | string; 
}

export const CommentComp: React.FC<CommentProps> = ({ creator, createdDate, content, previousDate,}) => {
  //-------TEMPORARY--------------------
  // Replace with a function to get the hebrew date and format it
  // Conversion function to ensure we always have a Date object
  const toDate = (dateInput: Date | string): Date => {
    if (dateInput instanceof Date) {
      return dateInput;
    }
    return new Date(dateInput);
  };

  // Safely convert dates
  const date = toDate(createdDate);
  const prevDate = previousDate ? toDate(previousDate) : undefined;
  
  // Function to check if two dates are on different days
  const isDifferentDay = (date1?: Date, date2?: Date) => {
    if (!date1 || !date2) return true;
    return (
      date1.getFullYear() !== date2.getFullYear() ||
      date1.getMonth() !== date2.getMonth() ||
      date1.getDate() !== date2.getDate()
    );
  };
  //----------------------------------------------------------------

  return (
    <>
      {/* Conditionally render date if it's a different day from the previous comment */}
      {(!prevDate || isDifferentDay(prevDate, date)) && (
        <div className="px-16 pt-6 pb-3.5 w-full text-xs font-medium leading-none text-center text-neutral-500 max-md:px-5 max-md:max-w-full">
          {formatDate(date)}
        </div>
      )}
      
      <div className="flex items-start mt-5 w-full max-md:max-w-full">
        {/* Avatar */}
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
              {creator.first_name? `${creator.first_name} ${creator.last_name}` : creator._id}
            </div>
            <div className="text-xs leading-none text-center text-neutral-500">
              {`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`}
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