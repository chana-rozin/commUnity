import * as React from "react";
import { Event } from "@/types/event.type";
import {formatDate} from '@/utils/dates';
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";


export const EventCard: React.FC<Event> = ({
    name,
    date,
    location,
  }) => {  return (
    <div className="flex gap-3 justify-center items-center p-3 w-full bg-violet-50 rounded-xl">
      <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto w-full basis-0 min-w-[240px]">
        <div className="flex flex-col justify-center items-end self-end text-xs leading-none text-neutral-950">
          <div className="font-medium text-gray-400">{formatDate(date)}</div>
          <div className="font-semibold">{name}</div>
          <div>{location}</div>
        </div>
        <div className="flex gap-10 justify-between items-center mt-2.5 w-full">
          {/* <div className="self-stretch my-auto text-xs leading-4 text-neutral-950">
            {event.participants} משתתפים
          </div> */}
          <div className="flex gap-2.5 items-start text-indigo-600 self-stretch my-auto w-4">
            <TiStarFullOutline className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}