import React from 'react'

function OpeningImage() {
    return (
        <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow pt-9 w-full bg-violet-200 rounded-[29px] max-md:mt-10 max-md:max-w-full">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/14eeaecd4f86cd90fe9fdf0fa65bd9406c9378edb4720d15456e6c9de723554f?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                    alt=""
                    className="object-contain self-end mr-20 w-7 aspect-[1.04] fill-violet-950 max-md:mr-2.5"
                />
                <div className="flex z-10 flex-col pl-9 mt-5 max-md:pl-5 max-md:max-w-full">
                    <div className="ml-3.5 text-4xl leading-[52px] text-neutral-950 w-[504px] max-md:ml-2.5">
                        Find a job through <span>your community</span>
                    </div>
                    <div className="flex relative flex-col items-end px-20 pt-8 mt-14 min-h-[622px] pb-[519px] max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:mr-0 max-md:max-w-full">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/10981eef531602d3195110b5fbd05e04c9634e30b640e35b9731f0eccd72859c?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                            alt="Community illustration"
                            className="object-cover absolute inset-0 size-full"
                        />
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/91b072e0810434fb0c49002aac4ad24a27c5aa2f78e4a9e07dae616f6469cf22?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                            alt=""
                            className="object-contain mb-0 aspect-[1.07] fill-violet-950 w-[78px] max-md:mb-2.5"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OpeningImage;
