import * as React from "react";
import { MinyanCard } from "./Card";
import { PrayerSectionProps } from "./types";

export const PrayerSection: React.FC<PrayerSectionProps> = ({ title, minyans, type='קבוע' }) => {
    return (
        <>
            <div className="flex overflow-hidden items-center px-4 py-px mt-4 max-w-full text-lg font-bold leading-10 whitespace-nowrap bg-white rounded-2xl min-h-[43px] text-neutral-950 w-[732px]">
                <div className="self-stretch my-auto min-h-[42px] w-[131px]">
                    {title}
                </div>
            </div>
            <div className="flex flex-wrap gap-5 justify-center items-center mt-4 max-w-full w-[731px]">
                {minyans.map((minyan, index) => (
                    <MinyanCard key={index} {...minyan} />
                ))}
            </div>
        </>
    );
};