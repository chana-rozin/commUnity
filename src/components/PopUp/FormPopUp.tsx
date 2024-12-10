import React from 'react'
import Popup from './PopUp';
import styles from './PopUp.module.css'
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

interface formPopUpProps {
    onSubmit: any;
    inputRole: string;
    isResend: string | null;
    resend: any;
    inputError: string | null;
    setInputError: React.Dispatch<React.SetStateAction<string | null>>;
    title: string;
    isOpen: boolean;
    onClose: () => void;
    data: any;
    formObj: {
        input: z.ZodString;
    }
}
const FormPopUp: React.FC<formPopUpProps> = ({ onSubmit, inputRole, isResend, resend, inputError, setInputError, title, isOpen, onClose, data, formObj }) => {
    const form = z.object(formObj);
    type formTypesSchema = z.infer<typeof form>;
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<formTypesSchema>({ resolver: zodResolver(form) });
    const [inputValue, setInputValue] = React.useState();
    function handleChange(event: any) {
        setInputValue(event.target.value);
        setInputError(null);
    }
    const handleSubmitForm: SubmitHandler<formTypesSchema> = async () => {
        if (errors?.input) {
            if (errors.input.message)
            return;
        }
        onSubmit(data, inputValue);
    }
    return (
        <Popup title={title} content={<form onSubmit={handleSubmit(handleSubmitForm)} >
            <input type="text" {...register("input")} value={inputValue} placeholder={inputRole} onChange={handleChange} className={`flex-1 shrink self-stretch my-auto basis-0 text-neutral-500 outline-none ${styles.input}`} />
            {(inputError) && <span>{inputError}</span>}
            {errors.input && <span>{errors.input.message}</span>}
            <button type="submit" className="gap-1 px-4 py-2 mt-16 ml-20 max-w-full text-base text-white bg-indigo-600 rounded-md w-[140px] max-md:mt-10">אישור</button>
            {isResend && <span onClick={resend} >{isResend}</span>}
        </form>} isOpen={isOpen} onClose={onClose} />
    )
}

export default FormPopUp;
