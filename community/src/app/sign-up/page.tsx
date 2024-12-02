"use client"
import * as React from 'react';
import { InputField } from '../../components/auth/InputField';
import { AuthButton } from '../../components/auth/AuthButton';
import { AuthTab } from '../../components/auth/AuthTab';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from '../../services/firebaseConfig'
import { z } from 'zod'
const googleProvider = new GoogleAuthProvider();
export const SignupFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
})


const AuthPage: React.FC = () => {

    const [inputs, setInputs] = React.useState({
        email: '',
        password: ''
    });
    async function loginWithGoogle() {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("User signed in:", user);
        } catch (error) {
            console.error("Error signing in:", error);
        }
    }

    async function loginWithEmailAndPassword() {

    }

    async function onSubmit(e: any) {
        e.preventDefault();
        console.log('onSubmit');
        loginWithEmailAndPassword();
    }

    function onInputChange(name: string, value: string) {
        setInputs(() => {
            return {
                ...inputs,
                [name]: value
            }
        })
    }
    return (
        <div className="overflow-hidden py-10 pr-9 pl-16 bg-white max-md:px-5">
            <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow pt-9 w-full bg-violet-200 rounded-[29px] max-md:mt-10 max-md:max-w-full">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/14eeaecd4f86cd90fe9fdf0fa65bd9406c9378edb4720d15456e6c9de723554f?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                            alt=""
                            className="object-contain self-end mr-20 w-7 aspect-[1.04] fill-violet-950 max-md:mr-2.5"
                        />
                        <div className="flex z-10 flex-col pl-9 mt-5 max-md:pl-5 max-md:max-w-full">
                            <div className="ml-3.5 text-4xl leading-[52px] text-neutral-950 w-[504px] max-md:ml-2.5">
                                Find a job through <span>your community</span>
                            </div>
                            <div className="flex relative flex-col items-end px-20 pt-8 mt-14 min-h-[622px] pb-[519px] max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:mr-0 max-md:max-w-full">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/10981eef531602d3195110b5fbd05e04c9634e30b640e35b9731f0eccd72859c?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                                    alt="Community illustration"
                                    className="object-cover absolute inset-0 size-full"
                                />
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/91b072e0810434fb0c49002aac4ad24a27c5aa2f78e4a9e07dae616f6469cf22?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                                    alt=""
                                    className="object-contain mb-0 aspect-[1.07] fill-violet-950 w-[78px] max-md:mb-2.5"
                                />
                            </div>
                        </div>
                    </div>
                </div>
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

                        <form className="flex flex-col w-full max-w-[430px]">
                            <h1 className="mt-9 text-3xl font-bold text-right text-neutral-950">
                                ברוכים הבאים ל-CommUnity!
                            </h1>
                            <p className="self-center mt-1 ml-16 text-base text-right text-neutral-950">
                                בואו נתחיל בצעד הראשון!
                            </p>

                            <div className="flex flex-col mt-11 gap-4 max-md:mt-10">
                                <InputField
                                    label="כתובת המייל שלך"
                                    type="email"
                                    value={inputs.email}
                                    id="email"
                                    name="email"
                                    onInputChange={onInputChange}
                                />
                                <InputField
                                    label="סיסמא"
                                    type="password"
                                    value={inputs.password}
                                    id="password"
                                    name="password"
                                    onInputChange={onInputChange}
                                    icon="https://cdn.builder.io/api/v1/image/assets/TEMP/2cf8a64ad474b7246d38d38dbabcd2e4c076d9ebf782d9b64f2dd9f881bb93b5?placeholderIfAbsent=true&apiKey=7db810be59414fad871df25414a5c08b"
                                />
                            </div>

                            <div className="flex flex-col mt-8">
                                <AuthButton type="submit" onClick={onSubmit}>בוא נתחיל</AuthButton>

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
            </div>
        </div>
    );
};

export default AuthPage;