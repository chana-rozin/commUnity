import * as React from "react";
import { RegistrationForm } from './form';
import styles from '../register.module.css'
import Logo from "../logo";
interface props {
    handleStep: (data: object) => void;
}
const Step2: React.FC<props> = ({ handleStep }) => {
    return (

        <div className={styles.step1Container}>
            <div className="flex flex-col items-start mt-4 w-full text-right max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-col items-center self-stretch pl-20 w-full text-neutral-950 max-md:pl-5 max-md:max-w-full">
                    <Logo/>
                    <div className="mt-24 text-4xl font-bold max-md:mt-10">
                        איזה כיף שאת/ה כאן!
                    </div>
                    <div className="ml-10 text-base">
                        רק עוד כמה פרטים קטנים ואנחנו שם!
                    </div>
                </div>
                <RegistrationForm handleStep={handleStep} />
            </div>
        </div>
    );
};
export default Step2;