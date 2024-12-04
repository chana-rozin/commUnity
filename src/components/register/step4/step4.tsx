import React from 'react';
import { ImageComponent } from './image';
import { NavigationButton } from '../step3/navigateBtn';
import { Button } from './btn';
interface step4Props{
    handleStep: (imageUrl: object | null, more?: boolean) => void;
}
const Step4: React.FC<step4Props> = ({handleStep}) => {
    return (
        <div className="overflow-hidden py-10 pr-9 pl-16 bg-white max-md:px-5">
            <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col mt-4 max-md:mt-10 max-md:max-w-full">
                        <div className="flex flex-col self-end max-w-full w-[234px]">
                            <ImageComponent
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/26ce690498a69190885e0a6bd0022837d0b3360b9e209e47ee8c6d239e87edab?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                                className="object-contain gap-1 w-full aspect-[5.32] min-h-[44px]"
                                alt="Logo"
                            />
                            <ImageComponent
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f25ded15993c604bb32cd92eb2a5df2ddd1aea9ba049eb1c6708fbaa997c7c35?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                                className="object-contain mt-32 ml-9 rounded-none aspect-[1.02] w-[82px] max-md:mt-10 max-md:ml-2.5"
                                alt=""
                            />
                        </div>
                        <div className="self-start mt-8 ml-20 text-5xl font-bold text-right text-neutral-950 max-md:max-w-full max-md:text-4xl">
                            מזל טוב, אתם בפנים!
                        </div>
                        <div className="flex flex-col items-center pr-20 pb-3 pl-6 mt-6 w-full font-medium text-right max-md:px-5 max-md:max-w-full">
                            <div className="self-start text-3xl text-neutral-950 max-md:max-w-full">
                                עכשיו זה הזמן להתחבר, לשתף, ולהיות חלק מקהילה תוססת ומשפחתית ב-CommUnity!
                            </div>
                            <NavigationButton label="הקודם" onClick={() => { handleStep(null, false) }} />
                            <Button onClick={() => { handleStep(null, true) }} className="gap-1 px-4 py-2 mt-16 ml-20 max-w-full text-base text-white bg-indigo-600 rounded-md w-[140px] max-md:mt-10">
                                המשך לאתר
                            </Button>
                            <ImageComponent
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8003bab8e2fa60343c63c22a247c0e689c6edb6b1b39218588b31ac3335be3b3?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                                className="object-contain z-10 mt-0 -ml-0.5 w-4 aspect-[1.07]"
                                alt=""
                            />
                        </div>
                        <ImageComponent
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dffe0858e67c21d41cca7fa80b46bdf89e1c792c0d94830d5094e23a5337e085?apiKey=7db810be59414fad871df25414a5c08b&"
                            className="object-contain w-full rounded-none aspect-[1.02] max-w-[50px]"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Step4;