import React from 'react';

function OpeningImage() {
    return (
        <div className="flex flex-col justify-between py-9 w-[50%] max-h-[100%] bg-violet-200 rounded-[29px] max-md:mt-10 max-md:max-w-full">
            <img
                loading="lazy"
                alt="logo"
                src='/assets/commUnity.png'
                className='relative object-contain w-full max-h-[200px]' // Constrain the height
            />
            <div className="flex relative px-20 pt-8 justify-center">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/10981eef531602d3195110b5fbd05e04c9634e30b640e35b9731f0eccd72859c?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                    alt="Community illustration"
                    className="object-contain max-w-full max-h-[300px]" // Prevent the image from exceeding its container
                />
            </div>
        </div>
    );
}

export default OpeningImage;
