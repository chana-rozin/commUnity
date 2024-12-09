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
                <div className="flex flex-col items-start mt-4 w-full max-md:mt-10 max-md:max-w-full">
                    <Logo />
                    <RegistrationForm handleStep={handleStep} />
                </div>
            </div >
        </div >
    );
};
export default Step2;