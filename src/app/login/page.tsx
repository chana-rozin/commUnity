"use client"
import React from 'react';
import { AuthButton } from '../../components/register/step1/AuthButton'
import { AuthTab } from '../../components/register/step1/AuthTab'
import OpeningImage from '../../components/OpeningImage/OpeningImage'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from '@/services/firebaseConfig'
import VerificationCodePopUp from '../../components/register/verificationCodePopUp'
import Logo from '../../components/register/logo'
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { form, formTypesSchema } from "@/schemas/loginFormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './login.module.css'
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import http from '../../services/http'
import useUserStore from '@/stores/userStore';
import { access } from 'fs';

const googleProvider = new GoogleAuthProvider();

const signUp: React.FC = () => {
    const [userExists, setUserExists] = React.useState(true);
    const [remember, setRemember] = React.useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<formTypesSchema>({ resolver: zodResolver(form) });
    const [showPassword, setShowPassword] = React.useState(false);

    const baseStyles = "gap-1 px-4 py-2 text-base font-medium text-center rounded-md w-full";
    const variantStyles = {
        primary: "bg-indigo-600 text-white",
        secondary: "bg-neutral-100 text-indigo-900"
    };
    async function loginWithGoogle() {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const googleUser: any = result.user;
            if (!googleUser) {
                setUserExists(false);
            }
            const userExist = await http.post(`/login/google`, {
                email: googleUser.email,
                accessToken: googleUser.accessToken,
            })
            setUserExists(true)
            if (!userExist.data.user) {
                setUserExists(false);
                return;
            }
            useUserStore.getState().setUser(userExist.data.user, remember);
            router.push('/home');
        } catch (error: any) {
            if (error.status === 409) {
                setUserExists(false);
                return;
            }
            else {
                console.error("Error signing in:", error);
            }
        }
    }
    async function loginWithEmail(email: string, password: string) {
        try {
            const userExist = await http.post(`/login/email`, {
                email: email,
                password: password
            })
            if (!userExist.data.user) {
                setUserExists(false);
                return;
            }
            setUserExists(true)
            useUserStore.getState().setUser(userExist.data.user, remember);
            router.push('/home');
        } catch (error: any) {
            if (error.status === 409) {
                setUserExists(false);
                return;
            }
            else {
                console.error("Error login in:", error);
            }
        }
    }
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    function goToSignUp() {
        router.push('/register');
    }

    const handleRememberMeBtn = (event: any) => {
        setRemember(event.target.checked); // Update state based on the checkbox value
    };
    const onSubmit: SubmitHandler<formTypesSchema> = async (data) => {
        debugger
        loginWithEmail(data.email, data.password);
    }
    return (
        <div className="overflow-hidden py-10 pr-9 pl-16 bg-white max-md:px-5">
            <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
                    <OpeningImage />
                </div>
                <div className={styles.formContainer}>
                    <div className="flex flex-col ml-5 w-[100%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col items-start mt-4 w-full max-md:mt-10 max-md:max-w-full">
                            <Logo />
                            <div className="flex overflow-hidden gap-1 justify-center items-center px-4 py-2.5 mt-14 max-w-full text-base tracking-normal text-center bg-neutral-100 min-h-[59px] rounded-[99px] text-neutral-950 w-[430px] max-md:mt-10">
                                <AuthTab label="היכנס" isActive={true} />
                                <AuthTab label="הירשם" isActive={false} onClick={goToSignUp} />
                            </div>
                            <form className="flex flex-col w-full max-w-[430px]" onSubmit={handleSubmit(onSubmit)}>
                                <h1 className="mt-9 text-3xl font-bold text-right text-neutral-950">
                                    איזה כיף שחזרת!
                                </h1>
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
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                name="password"
                                                className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-500 outline-none"
                                            />
                                            {showPassword ? <MdOutlineVisibility onClick={togglePassword} className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square text-neutral-500" /> :
                                                <MdOutlineVisibilityOff onClick={togglePassword} className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square text-neutral-500" />}
                                        </div>
                                        {errors.password && <span>{errors.password.message}</span>}
                                    </div>
                                </div>
                                <div className="flex flex-col mt-8">
                                    <button
                                        type="submit"
                                        className={`${baseStyles} ${variantStyles['primary']}`}>הכנס
                                    </button>
                                    <div className="flex gap-2 items-center py-1.5 mt-4">
                                        <input onChange={handleRememberMeBtn}
                                            type="checkbox"
                                            id="remember"
                                            className="w-4 h-4 bg-white rounded border border-solid border-stone-300"
                                            checked={remember}
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
                                    <span onClick={loginWithGoogle}>היכנס עם גוגל</span>
                                </div>
                            </AuthButton>
                            {!userExists && <span>יש טעות בנתונים, יכול להיות שלא נרשמת? הרשם</span>}
                        </div>
                    </div>
                </div>
                {/* {verificationPopUp && <VerificationCodePopUp sendVerificationCode={sendVerificationCode} email={email} checkVerificationCode={checkVerificationCode} userGiveWrongCode={userGiveWrongCode} setUserGiveWrongCode={setUserGiveWrongCode} />} */}
            </div>
        </div>
    );
};


export default signUp;