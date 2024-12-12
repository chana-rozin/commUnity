import { useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IoBookOutline } from "react-icons/io5";


import { MinyanCardProps } from "./types";

export const MinyanCard: React.FC<MinyanCardProps> = ({
    location,
    time,
    attendeeCount,
    totalCount,
    hasMinyan,
    iconSrc
}) => {
    const [memberNum, setMemberNum] = useState(1);
    function handleHadMember() {
        setMemberNum((prev) => {
            return prev + 1;
        });
    }
    const maxValue = 10;
    return (
        <div className="flex flex-col grow shrink self-stretch my-auto rounded-none w-[179px]">
            <div className="flex flex-col px-5 py-6 w-full bg-white rounded-2xl">
                <div className="flex gap-1 items-start px-px w-full text-xs leading-none min-h-[16px] text-neutral-950">
                    <img loading="lazy" src={iconSrc} className="object-contain shrink-0 w-4 aspect-square" alt="" />

                    <div className="flex gap-1 justify-center items-center">
                        <div className="flex shrink-0 self-stretch my-auto w-3 h-3" />
                        <div className="self-stretch my-auto">{location}</div>
                    </div>
                </div>
                <div className="flex gap-1 items-start px-px mt-1.5 w-full text-xs leading-none whitespace-nowrap min-h-[16px] text-neutral-950">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/120ddf15d806c54e628dfaa6c733b32561ea84541d64940e7d83b32dab2ce78c?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b" className="object-contain shrink-0 w-4 aspect-square" alt="" />
                    <div className="flex gap-1 justify-center items-center">
                        <div className="flex shrink-0 self-stretch my-auto w-3 h-3" />
                        <div className="self-stretch my-auto">{time}</div>
                    </div>
                </div>

                <div style={{ width: 100, height: 100, margin: '2rem auto 0', }}>
                    <CircularProgressbar
                        minValue={0}
                        maxValue={10}
                        value={memberNum}
                        text={`${memberNum}/10`}
                        strokeWidth={6}
                        circleRatio={0.75} // Make it half a circle
                        styles={buildStyles({
                            rotation: 0.63, // Rotate to start from the bottom
                            pathColor: "#5E47D2", // Progress path color
                            trailColor: "#E9EDF0", // Background trail color
                            textColor: "#404040", // Text color
                            textSize: "16px", // Text size
                        })}
                    />
                </div>
                {memberNum < 10 ? (
                    <div className="flex gap-5 items-start self-center mt-5 text-base font-medium leading-none text-neutral-100">
                        <div className="gap-2 self-stretch px-2.5 py-2 bg-indigo-600 rounded-[50px]" onClick={handleHadMember}>
                            מצטרף בעז"ה
                        </div>
                    </div>
                ) : (
                    <div className="gap-1 self-center mt-7 text-base leading-none">
                        מוזמן להצטרף!
                    </div>)}
            </div>
        </div>
    );
};