import * as React from "react";
import { RegistrationForm } from './form';
interface props{
    handleStep: (data: object) => void;
}
const Step2: React.FC<props> = ({handleStep}) => {
    return (
                
                <div className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col items-start mt-4 w-full text-right max-md:mt-10 max-md:max-w-full">
                        <div className="flex flex-col items-center self-stretch pl-20 w-full text-neutral-950 max-md:pl-5 max-md:max-w-full">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/26ce690498a69190885e0a6bd0022837d0b3360b9e209e47ee8c6d239e87edab?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                                alt="Logo"
                                className="object-contain gap-1 self-end w-full aspect-[5.32] min-h-[44px]"
                            />
                            <div className="mt-24 text-4xl font-bold max-md:mt-10">
                                איזה כיף שאת/ה כאן!
                            </div>
                            <div className="ml-10 text-base">
                                רק עוד כמה פרטים קטנים ואנחנו שם!
                            </div>
                        </div>
                        <RegistrationForm handleStep={handleStep}/>
                    </div>
                </div>
    );
};
export default Step2;