import React from 'react';
import { ImageComponent } from './image';
import { NavigationButton } from '../step3/navigateBtn';
import { Button } from './btn';
import Logo from '../logo'
import styles from '../register.module.css'
interface step4Props {
    handleStep: (imageUrl: object | null, more?: boolean) => void;
    signUp: () => void;
}
const Step4: React.FC<step4Props> = ({ handleStep, signUp }) => {
    return (
        <div className={styles.step1Container}>
            <div className="flex flex-col mt-4 max-md:mt-10 max-md:max-w-full">
                <Logo />
                
                <ImageComponent
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dffe0858e67c21d41cca7fa80b46bdf89e1c792c0d94830d5094e23a5337e085?apiKey=7db810be59414fad871df25414a5c08b&"
                            className="object-contain w-full rounded-none aspect-[1.02] max-w-[50px]"
                            alt=""
                        />
                <h1 className="mt-9 text-5xl font-bold text-right text-neutral-950 w-[50%] self-center">
                    מזל טוב, אתם בפנים!
                </h1>
                <ImageComponent
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f25ded15993c604bb32cd92eb2a5df2ddd1aea9ba049eb1c6708fbaa997c7c35?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                                className="object-contain self-center rounded-none aspect-[1.02] w-[30px] max-md:mt-10 max-md:ml-2.5"
                    alt=""
                />
                <p className="self-start mt-0 text-4xl text-right text-neutral-950 w-[80%] self-center">
                    עכשיו זה הזמן להתחבר, לשתף, ולהיות חלק מקהילה תוססת ומשפחתית ב-CommUnity!
                </p>
                <ImageComponent
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f25ded15993c604bb32cd92eb2a5df2ddd1aea9ba049eb1c6708fbaa997c7c35?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                                className="object-contain self-end rounded-none aspect-[1.02] w-[82px] max-md:mt-10 max-md:ml-2.5"
                                alt=""
                            />
                <div className="flex gap-5 justify-between mt-9 ml-10 max-w-full text-base font-medium text-center text-white whitespace-nowrap w-[100%] max-md:mt-10">
                    <NavigationButton label="הקודם" onClick={() => { handleStep(null, false) }}  />
                    <ImageComponent
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dffe0858e67c21d41cca7fa80b46bdf89e1c792c0d94830d5094e23a5337e085?apiKey=7db810be59414fad871df25414a5c08b&"
                            className="object-contain self-center rounded-none aspect-[1.02] w-[30px] max-md:mt-10 max-md:ml-2.5"
                    alt=""
                />
                    <NavigationButton label="אישור הרשמה"  onClick={() => { signUp() }}  />
                </div>
                {/* <Button onClick={() => { handleStep(null, false) }} className="gap-1 px-4 py-2 mt-16 ml-20 max-w-full text-base text-white bg-indigo-600 rounded-md w-[140px] max-md:mt-10">הקודם</Button>
                <Button onClick={() => { signUp() }} className="gap-1 px-4 py-2 mt-16 ml-20 max-w-full text-base text-white bg-indigo-600 rounded-md w-[140px] max-md:mt-10">
                    אישור הרשמה
                </Button> */}
                <ImageComponent
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dffe0858e67c21d41cca7fa80b46bdf89e1c792c0d94830d5094e23a5337e085?apiKey=7db810be59414fad871df25414a5c08b&"
                            className="object-contain self-center rounded-none aspect-[1.02] w-[30px] max-md:mt-10 max-md:ml-2.5"
                    alt=""
                />
            </div>
        </div>
    );
};
export default Step4;

/**
 * 


                       
 */