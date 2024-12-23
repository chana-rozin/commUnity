"use client"
import React from 'react';
import { AuthButton } from '../../components/register/step1/AuthButton'
import { AuthTab } from '../../components/register/step1/AuthTab'
import OpeningImage from '../../components/OpeningImage/OpeningImage'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from '@/services/firebaseConfig'
import { useRouter } from 'next/navigation';
import { z, ZodObject } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { form, formTypesSchema } from "@/schemas/loginFormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import http from '../../services/http'
import useUserStore from '@/stores/userStore';
import FormPopUp from '@/components/PopUp/AuthPopUp'



const loginFormSchema = z
    .object({
        email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
        password: z.string().min(8, { message: 'Be at least 8 characters long' }).regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' }).regex(/[0-9]/, { message: 'Contain at least one number.' }).regex(/[^a-zA-Z0-9]/, { message: 'Contain at least one special character.', }).trim()
    })

type LoginTypesSchema = z.infer<typeof loginFormSchema>;

const googleProvider = new GoogleAuthProvider();
const formObj = {
    input: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim()
}

const Login: React.FC = () => {
    const [userExists, setUserExists] = React.useState(true);
    const [remember, setRemember] = React.useState(false);
    const [verificationPopUp, setVerificationPopUp] = React.useState<boolean>(false);
    const [newPasswordPopUp, setNewPasswordPopUp] = React.useState<boolean>(false);
    const [verifyError, setVerifyError] = React.useState<string | null>(null)
    const [newPassError, setNewPassError] = React.useState<string | null>(null);
    const [forgetPasswordError, setForgetPasswordError] = React.useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<LoginTypesSchema>({ resolver: zodResolver(loginFormSchema) });
    const [showPassword, setShowPassword] = React.useState(false);
    const emailValue = watch("email");

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
                setUserExists(false);
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
    const onSubmit: SubmitHandler<any> = async (data) => {
        debugger
        loginWithEmail(data.email, data.password);
    }

    async function handleForgetPassword() {
        if (emailValue) {
            if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue) &&
                emailValue.length >= 8 &&
                /[a-zA-Z]/.test(emailValue) &&
                /[0-9]/.test(emailValue) &&
                /[^a-zA-Z0-9]/.test(emailValue))) {
                setForgetPasswordError('נא להכניס כתובת מייל תקנית')
            } else {
                try {
                    setForgetPasswordError(null)
                    const userExist = await http.post(`/login/${emailValue}`)
                    if (userExist) {
                        sendVerificationCode(emailValue);
                    }

                }
                catch (error) {
                    setForgetPasswordError('יש שגיאה בנתונים')
                    console.error('Error sending password reset code:', error);
                }
            }

        } else {
            setForgetPasswordError('נא להכניס כתובת מייל')
            console.error('Error: email value is required.');
        }
    }
    async function sendVerificationCode(email: string) {
        try {
            setVerificationPopUp(true);
            const result = http.post('/verify-email/send', { email: email })
        }
        catch (error) {
            console.error('Error sending verification code:', error);

        }
    }
    async function checkVerificationCode(email: string, code: string) {
        try {
            const result = await http.post('/verify-email/check', { email: email, code: code })
            if (result.status === 200) {
                setVerifyError(null)
                setVerificationPopUp(false);
                setNewPasswordPopUp(true);
            } else {
                setVerifyError('error checking code try again in a few seconds');
            }
            console.log(result);

        }
        catch (error: any) {
            console.error('Error sending verification code:', error);
            setVerifyError('הקוד שגוי , נסה שוב!');
        }
    }
    async function handlePasswordChange(email: string, password: string) {
        try {
            const result = await http.post('/passwords', { email: email, password: password });
            if (result.status === 200) {
                setNewPassError(null)
                setNewPasswordPopUp(false);
            }
            else {
                throw new Error(result.data);
            }
        } catch (error) {
            setNewPassError('שינוי סיסמה נכשל, נסה שוב')
        }
    }

    return (
        <div className=" py-10 px-9 bg-white max-h-[100%] max-md:px-5">
            <div className="flex gap-5 max-md:flex-col">
                <OpeningImage />
                <div className="align-center my-0 mx-auto">
                    <div className="flex flex-col ml-5 max-h-[100vh] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col items-start w-full max-md:mt-10 max-md:max-w-full">
                            <div className="flex overflow-hidden gap-1 justify-center items-center px-4 py-2.5 mt-5 max-w-full text-base tracking-normal text-center bg-neutral-100 min-h-[59px] rounded-[99px] text-neutral-950 w-[430px] max-md:mt-10">
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
                                <span className="bg-neutral-100 text-indigo-900" onClick={handleForgetPassword}>שכחתי סיסמא</span>
                                {forgetPasswordError && <span>{forgetPasswordError}</span>}
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
                <FormPopUp onSubmit={checkVerificationCode} inputRole={"קוד אימות"} isResend='לא קיבלת קוד? שלח שוב' resend={sendVerificationCode} inputError={verifyError} setInputError={setVerifyError} title='נשלח קוד אימות לכתובת המייל' isOpen={verificationPopUp} onClose={() => { setVerificationPopUp(false) }} data={emailValue} formObj={{ input: z.string().trim() }} />
                <FormPopUp onSubmit={handlePasswordChange} inputRole={"סיסמה חדשה"} isResend={newPassError} resend={sendVerificationCode} inputError={newPassError} setInputError={setNewPassError} title='הכנס סיסמה חדשה' isOpen={newPasswordPopUp} onClose={() => { setNewPasswordPopUp(false) }} data={emailValue} formObj={formObj} />
            </div>
        </div>
    );
};


export default Login; 