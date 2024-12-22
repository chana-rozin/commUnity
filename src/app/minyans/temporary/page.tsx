"use client"
import * as React from "react";
import { PrayerSection } from "../../../components/minyans/Section";
import { MinyanCardProps } from "../../../components/minyans/types";


const minyanData = {
    shacharit: [
        {
            location: "חבקוק 15, משפחת דוד",
            time: "09:00",
            attendeeCount: 5,
            totalCount: 10,
            hasMinyan: false,
            iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/35555a49a291213f30df4f00aaa4a68e13b58778ccc143af0174191b0ebf4704?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
        },
        {
            location: "חבקוק 15, משפחת דוד",
            time: "09:00",
            attendeeCount: 10,
            totalCount: 10,
            hasMinyan: true,
            iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/35555a49a291213f30df4f00aaa4a68e13b58778ccc143af0174191b0ebf4704?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
        },
        {
            location: "חבקוק 15, משפחת דוד",
            time: "09:00",
            attendeeCount: 5,
            totalCount: 10,
            hasMinyan: false,
            iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/35555a49a291213f30df4f00aaa4a68e13b58778ccc143af0174191b0ebf4704?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
        }
    ] as MinyanCardProps[],
    mincha: [
        {
            location: "חבקוק 15, משפחת דוד",
            time: "09:00",
            attendeeCount: 5,
            totalCount: 10,
            hasMinyan: false,
            iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4104cc3a9a56316000c02e07241655caed99b191fd4d1b470c4e8be2e69fcaf?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
        },
        {
            location: "חבקוק 15, משפחת דוד",
            time: "09:00",
            attendeeCount: 10,
            totalCount: 10,
            hasMinyan: true,
            iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4104cc3a9a56316000c02e07241655caed99b191fd4d1b470c4e8be2e69fcaf?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
        },
        {
            location: "חבקוק 15, משפחת דוד",
            time: "09:00",
            attendeeCount: 5,
            totalCount: 10,
            hasMinyan: false,
            iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4104cc3a9a56316000c02e07241655caed99b191fd4d1b470c4e8be2e69fcaf?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
        }
    ] as MinyanCardProps[],
    arvit: [
        {
            location: "חבקוק 15, משפחת דוד",
            time: "09:00",
            attendeeCount: 5,
            totalCount: 10,
            hasMinyan: false,
            iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4104cc3a9a56316000c02e07241655caed99b191fd4d1b470c4e8be2e69fcaf?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
        },
        {
            location: "חבקוק 15, משפחת דוד",
            time: "09:00",
            attendeeCount: 10,
            totalCount: 10,
            hasMinyan: true,
            iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4104cc3a9a56316000c02e07241655caed99b191fd4d1b470c4e8be2e69fcaf?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
        },
        {
            location: "חבקוק 15, משפחת דוד",
            time: "09:00",
            attendeeCount: 5,
            totalCount: 10,
            hasMinyan: false,
            iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4104cc3a9a56316000c02e07241655caed99b191fd4d1b470c4e8be2e69fcaf?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
        }
    ] as MinyanCardProps[]
};
const Minyans: React.FC = () => {
    return (
            <div className="flex flex-col items-end bg-violet-50 max-w-[775px]">
                <div className="flex flex-col justify-center items-center p-4 w-full bg-indigo-100 rounded-2xl max-md:max-w-full">
                    <div className="flex flex-wrap gap-1 items-start px-px w-full max-w-[733px] max-md:max-w-full">
                        <div className="flex flex-col w-7">
                            <div className="flex flex-col justify-center items-start p-0.5 bg-neutral-200 rounded-[100px]">
                                <div className="flex shrink-0 w-3 h-3 bg-white rounded-full fill-white" />
                            </div>
                        </div>
                        <div className="flex gap-1 justify-center items-center text-xs leading-none text-neutral-950">
                            <div className="flex shrink-0 self-stretch my-auto w-3 h-3" />
                            <div className="self-stretch my-auto">הפעל חיפוש לפי מיקום</div>
                        </div>
                    </div>
                    <PrayerSection title="שחרית" minyans={minyanData.shacharit} />
                    <PrayerSection title="מנחה" minyans={minyanData.mincha} />
                    <PrayerSection title="ערבית" minyans={minyanData.arvit} />
                </div>
            </div>
    
    );
};

export default Minyans;