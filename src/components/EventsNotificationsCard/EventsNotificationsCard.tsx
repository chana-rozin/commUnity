import * as React from "react";
import { EventCard } from "./EventCard";
import { Event } from "@/types/event.type";

const eventData: Event[] = [
    {
      _id: "1",
      name: "פסטיבל הקיץ השנתי",
      description: "אירוע קיץ מלא במוזיקה, אוכל ופעילויות לכל המשפחה.",
      date: new Date("2024-08-15T18:00:00"),
      location: "פארק הירקון, תל אביב",
      createdDate: new Date(),
      active: true,
      AuthorizedIds: ["101", "102", "103"],
    },
    {
      _id: "2",
      name: "כנס טכנולוגיה וחדשנות",
      description: "כנס המתמקד בחדשנות טכנולוגית ומפגשים עם יזמים מובילים.",
      date: new Date("2024-10-10T09:00:00"),
      location: "מרכז הכנסים הבינלאומי, ירושלים",
      createdDate: new Date(),
      active: true,
      AuthorizedIds: ["201", "202", "203"],
    },
    {
      _id: "3",
      name: "שוק אמנים ויצירה",
      description: "שוק אומנות ויצירה עם יצירות ייחודיות, אוכל ושיעורי יצירה.",
      date: new Date("2024-07-05T10:00:00"),
      location: "כיכר העיר, חיפה",
      createdDate: new Date(),
      active: true,
      AuthorizedIds: ["301", "302", "303"],
    },
    {
      _id: "4",
      name: "מרוץ לילה",
      description: "מרוץ לילה מיוחד לאור הכוכבים עם מסלול מואר ושפע של הפתעות.",
      date: new Date("2024-09-20T20:00:00"),
      location: "טיילת החוף, אילת",
      createdDate: new Date(),
      active: false,
      AuthorizedIds: ["401", "402", "403"],
    },
  ];

export function EventsNotificationsCard() {
  return (
    <div className="flex flex-col p-5 mt-4 w-full bg-white rounded-2xl">
      <div className="flex gap-4 justify-center items-center w-full">
        <button 
          className="gap-1 self-stretch px-4 py-2 my-auto text-sm font-medium leading-none text-center text-indigo-600 bg-violet-50 border border-violet-300 border-solid rounded-[56px]"
          aria-label="ספר לי עוד על האירועים"
        >
          ספר לי עוד
        </button>
        <div className="flex flex-col flex-1 shrink items-end self-stretch my-auto basis-8">
          <h2 className="text-base tracking-tight leading-none text-black">
            אירועים
          </h2>
          <div className="mt-2 text-xs font-medium leading-none text-right text-black">
            3 אירועים השבוע
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-4 w-full">
        {eventData.map((event, index) => (
          <div key={index} className={index > 0 ? "mt-2" : ""}>
            <EventCard {...event} />
          </div>
        ))}
      </div>
    </div>
  );
}