"use client"
import React from 'react';
import {AuthButton} from '../../components/register/step1/AuthButton'
import {AuthTab} from '../../components/register/step1/AuthTab'
import OpeningImage from '../../components/OpeningImage/OpeningImage'
import VerificationCodePopUp from '../../components/register/verificationCodePopUp'
import Logo from '../../components/register/'


const signUp: React.FC = () => {


    return (
        <div className="overflow-hidden py-10 pr-9 pl-16 bg-white max-md:px-5">
            <div className="flex gap-5 max-md:flex-col">
            <OpeningImage />

                <div className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col items-start mt-4 w-full max-md:mt-10 max-md:max-w-full">
                        
                        <div className="flex overflow-hidden gap-1 justify-center items-center px-4 py-2.5 mt-14 max-w-full text-base tracking-normal text-center bg-neutral-100 min-h-[59px] rounded-[99px] text-neutral-950 w-[430px] max-md:mt-10">
                            <AuthTab label="היכנס" isActive={true} />
                            <AuthTab label="הירשם" isActive={false} />
                        </div>

                        <form className="flex flex-col w-full max-w-[430px]">
                            <h1 className="mt-9 text-3xl font-bold text-right text-neutral-950">
                                ברוכים הבאים ל-CommUnity!
                            </h1>
                            <p className="self-center mt-1 ml-16 text-base text-right text-neutral-950">
                                איזה כיף שחזרת!
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
                                >הכנס
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
                        {userExists && <span>יש טעות בנתונים, יכול להיות שלא נרשמת? הרשם</span>}
                    </div>
                </div>
                {verificationPopUp && <VerificationCodePopUp sendVerificationCode={sendVerificationCode} email={email} checkVerificationCode={checkVerificationCode} userGiveWrongCode={userGiveWrongCode} setUserGiveWrongCode={setUserGiveWrongCode} />}
            </div>
        </div>
    );
};


export default signUp;