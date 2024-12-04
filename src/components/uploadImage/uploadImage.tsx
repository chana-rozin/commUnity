"use client";
import * as React from 'react';
import { ImageUploadProps } from './types';
import { CldUploadWidget } from 'next-cloudinary';


export const ImageUpload: React.FC<ImageUploadProps> = ({
    onUpload,
    supportedFormats = "SVG, JPG, PNG (10mb each)",
    maxSize = 100,
    setImageUrl,

}) => {

    const handleSuccess = (result: any, { widget }: any) => {
        if (result.info?.secure_url) {
            setImageUrl(result.info.secure_url); // Save temporarily
        }
        console.log('success', result.info);
    };

    return (
        // By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery
        <div className=" min-h-[200px] flex overflow-hidden flex-col flex-1 shrink justify-center p-6 mt-10 w-full bg-white border border-dashed basis-0 border-slate-300 min-w-[240px] rounded-[32px] max-md:px-5 max-md:max-w-full" >
            <div className="flex flex-col w-full max-md:max-w-full ">
                <div className="flex gap-2.5 justify-center items-center self-center w-12 h-12 bg-violet-50 min-h-[48px] rounded-[123px]">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9311452257510dca100639a813361c48d14e6928c3b76c24b8544f21e23f7f7?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                        alt=""
                        className="object-contain self-stretch my-auto w-6 aspect-square"
                    />
                </div>
                <div className="flex flex-col justify-center mt-6 w-full max-md:max-w-full">
                    <div className="flex gap-1 justify-center items-center w-full text-base tracking-normal leading-none max-md:max-w-full">
                        <div className="overflow-hidden gap-2.5 self-stretch my-auto font-medium text-slate-600">
                            כדי להעלות את הקובץ או לגרור.
                        </div>
                        <CldUploadWidget
                            uploadPreset="community" // Replace with your actual preset name
                            onSuccess={handleSuccess}
                        >
                            {({ open }: { open: () => void }) => (
                                <button className="self-stretch my-auto font-bold text-center text-indigo-600" tabIndex={0} onClick={() => {
                                    open();
                                }}>לחץ כאן</button>
                            )}
                        </CldUploadWidget>
                    </div>
                    <div className="mt-2 text-sm font-medium tracking-normal leading-none text-center text-slate-400 max-md:max-w-full">
                        {supportedFormats}
                    </div>
                </div>
            </div>
        </div>
    );
};