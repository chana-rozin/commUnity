import React from 'react'
import { AuthButton } from './AuthButton';
import { AuthTab } from './AuthTab';
import { zodResolver } from '@hookform/resolvers/zod';
import { firstformTypesSchema, firstformTypes } from './formStep1'
import { useForm,SubmitHandler } from "react-hook-form";

interface props {
    loginWithGoogle: () => void;
    loginWithEmailAndPassword: (email: string, password: string) => void;
}

const step1: React.FC<props>=({loginWithGoogle,loginWithEmailAndPassword})=> {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<firstformTypesSchema>({ resolver: zodResolver(firstformTypes) });
    
    const baseStyles = "gap-1 px-4 py-2 text-base font-medium text-center rounded-md w-full";
    const variantStyles = {
        primary: "bg-indigo-600 text-white",
        secondary: "bg-neutral-100 text-indigo-900"
    };

    const onSubmit: SubmitHandler<firstformTypesSchema> = async (data) =>{
        console.log('onSubmit');
        console.log(data);
        loginWithEmailAndPassword(data.email, data.password);
    }
    return (
        <div className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start mt-4 w-full max-md:mt-10 max-md:max-w-full">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/26ce690498a69190885e0a6bd0022837d0b3360b9e209e47ee8c6d239e87edab?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                    alt="Logo"
                    className="object-contain gap-1 self-end w-full aspect-[5.32] min-h-[44px]"
                />
                <div className="flex overflow-hidden gap-1 justify-center items-center px-4 py-2.5 mt-14 max-w-full text-base tracking-normal text-center bg-neutral-100 min-h-[59px] rounded-[99px] text-neutral-950 w-[430px] max-md:mt-10">
                    <AuthTab label="היכנס" isActive={false} />
                    <AuthTab label="הירשם" isActive={true} />
                </div>

                <form className="flex flex-col w-full max-w-[430px]" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="mt-9 text-3xl font-bold text-right text-neutral-950">
                        ברוכים הבאים ל-CommUnity!
                    </h1>
                    <p className="self-center mt-1 ml-16 text-base text-right text-neutral-950">
                        בואו נתחיל בצעד הראשון!
                    </p>

                    <div className="flex flex-col mt-11 gap-4 max-md:mt-10">
                        <div className="flex flex-col w-full">
                            <label htmlFor="email" className="text-base text-right text-neutral-700">כתובת המייל שלך</label>
                            <div className="flex overflow-hidden gap-1 items-center px-3 py-3 mt-1 w-full text-sm leading-none bg-white rounded-md border border-solid border-stone-300 min-h-[42px]">
                                <input className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-500 outline-none"
                                    placeholder="email"
                                    {...register("email")}
                                    type="email"
                                    id="email"
                                    name="email" />
                            </div>
                            {errors.email && <span>{errors.email.message}</span>}
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="password" className="text-base text-right text-neutral-700">סיסמא</label>
                            <div className="flex overflow-hidden gap-1 items-center px-3 py-3 mt-1 w-full text-sm leading-none bg-white rounded-md border border-solid border-stone-300 min-h-[42px]">
                                <input
                                    placeholder="password"
                                    {...register("password")}
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-500 outline-none"
                                />
                                <img
                                    loading="lazy"
                                    alt=""
                                    className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2cf8a64ad474b7246d38d38dbabcd2e4c076d9ebf782d9b64f2dd9f881bb93b5?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                                />
                            </div>
                            {errors.password && <span>{errors.password.message}</span>}
                        </div>
                    </div>

                    <div className="flex flex-col mt-8">
                        <button
                            type="submit"
                            className={`${baseStyles} ${variantStyles['primary']}`}
                        >בואו נתחיל
                        </button>

                        <div className="flex gap-2 items-center py-1.5 mt-4">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 bg-white rounded border border-solid border-stone-300"
                            />
                            <label htmlFor="remember" className="text-sm leading-none text-right text-neutral-700">
                                זכור אותי
                            </label>
                        </div>
                    </div>
                </form>

                <div className="flex relative flex-col mt-6 max-w-full text-sm leading-none whitespace-nowrap text-neutral-950 w-[430px]">
                    <div className="z-0 w-full border border-solid bg-neutral-200 border-neutral-200 min-h-[1px] max-md:max-w-full" />
                    <div className="absolute left-2/4 self-start px-5 bg-white -translate-x-2/4 translate-y-[0%]">
                        או
                    </div>
                </div>

                <AuthButton variant="secondary" onClick={() => { }}>
                    <div className="flex gap-2 items-start self-stretch my-auto">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/289ce14fcd0dec89c5c4c2462604dc6cec26b0f8e1d0c61a60a3eb37426b67bc?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                            alt="Google logo"
                            className="object-contain shrink-0 w-5 aspect-square"
                        />
                        <span onClick={loginWithGoogle}>הירשם עם גוגל</span>
                    </div>
                </AuthButton>
            </div>
        </div>
    )
}

export default step1
