import * as React from "react";
import { RegistrationForm } from './form';
import styles from '../register.module.css'
interface props {
    handleStep: (data: object) => void;
}
const Step2: React.FC<props> = ({ handleStep }) => {
    return (

        <div className="align-center my-0 mx-auto">
            <div className="flex flex-col items-start mt-4 w-full text-right max-md:mt-5 max-md:max-w-full">
                    <RegistrationForm handleStep={handleStep} />
            </div >
        </div >
    );
};
export default Step2;