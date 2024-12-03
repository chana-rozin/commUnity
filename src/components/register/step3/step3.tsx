import * as React from "react";
import { ImageUpload } from "./imageUpload";
import { NavigationButton } from "./navigateBtn";

const Step3: React.FC = () => {
    return (

        <div className="flex flex-col ml-5 w-[46%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start mt-4 w-full max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-col self-stretch pl-16 w-full text-right text-neutral-950 max-md:pl-5 max-md:max-w-full">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/26ce690498a69190885e0a6bd0022837d0b3360b9e209e47ee8c6d239e87edab?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                        alt=""
                        className="object-contain gap-1 self-end w-full aspect-[5.32] min-h-[44px]"
                    />
                    <div className="self-start mt-32 ml-14 text-3xl font-bold max-md:mt-10">
                        תמונה אחת שווה אלף מילים!
                    </div>
                    <div className="self-center mt-1.5 -ml-0.5 text-base w-[374px]">
                        רוצה שהשכנים יזהו אותך? הוסיפ/י תמונת פרופיל מתאימה (לבחירתך).
                    </div>
                </div>
                <ImageUpload />
                <div className="flex gap-3 items-start mt-16 max-md:mt-10" />
                <div className="flex gap-5 justify-between mt-9 ml-10 max-w-full text-base font-medium text-center text-white whitespace-nowrap w-[472px] max-md:mt-10">
                    <NavigationButton label="דלג" />
                    <NavigationButton label="הקודם" />
                </div>
            </div>
        </div>

    );
};

export default Step3;