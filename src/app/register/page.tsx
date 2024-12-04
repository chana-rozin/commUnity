"use client"
import React, { useEffect } from 'react';
import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from '../../services/firebaseConfig'
import http from '../../services/http'
import Step1 from '../../components/register/step1/step1'
import Step2 from '../../components/register/step2/step2'
import Step3 from '../../components/register/step3/step3'
import Step4 from '../../components/register/step4/step4'
import { User } from '../../types/user.type'
import { Preference } from '@/types/general.type';



import VerificationCodePopUp from '../../components/register/verificationCodePopUp'
const googleProvider = new GoogleAuthProvider();



const AuthPage: React.FC = () => {


    const [email, setEmail] = useState('');
    const [verificationPopUp, setVerificationPopUp] = useState(false);
    const [step, setStep] = useState(1);
    const [user, setUser] = useState<any>(null);
    const [userGiveWrongCode, setUserGiveWrongCode] = useState(false);
    const [signUpBy, setSignUpBy] = useState<string>();
    useEffect(() => {
        console.log(user);

    }, [user])

    async function loginWithGoogle() {
        try {
            setSignUpBy('google');
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            setUser(user);
            console.log("User signed in:", user);
            setStep(2);
        } catch (error) {
            console.error("Error signing in:", error);
        }
    }

    async function loginWithEmailAndPassword(email: string, password: string) {
        setSignUpBy('email')
        setVerificationPopUp(true);
        setEmail(email);
        setUser({ email: email, password: password });
        sendVerificationCode(email);
    }

    async function sendVerificationCode(email: string) {
        debugger
        try {
            const result = http.post('/verify-email/send', { email: email })
        }
        catch (error) {
            console.error('Error sending verification code:', error);
        }
    }

    async function checkVerificationCode(email: string, code: string) {
        debugger
        try {
            const result = await http.post('/verify-email/check', { email: email, code: code })
            if (result.status === 200) {
                setStep(2);
                setVerificationPopUp(false);
            } else {
                setUserGiveWrongCode(true);
            }
            console.log(result);

        }
        catch (error) {
            console.error('Error sending verification code:', error);
            setUserGiveWrongCode(true);
        }
    }

    async function handleStep(data: object | null, more: boolean = true) {
        if (more) {
            if (step === 4) {
                signUp();
            }
            setStep((prev: number) => {
                return prev + 1
            });
        } else {

            setStep((prev: number) => {
                return prev - 1
            });
        }
        if (data !== null) {
            setUser((prev: object) => {
                return { ...prev, ...data }
            })
        }
        return;
    }
    
    async function signUp() {
        debugger
        console.log(user);

        const preferences: Preference =
        {
            email_notifications: true,
            minyan_notifications: true,
            event_notifications: true
        };
        let newUser: User = {
            first_name: user.firstName,
            last_name: user.lastNname,
            email: user.email,
            address: user.address,
            phone_number: user.phoneNumber,
            profile_picture_url: user.imageUrl,
            neighborhoodId: "675042e6292054c85b9b65d6",
            communitiesIds: [],
            preferences: preferences,
            savedPostsIds: []
        }
        if (signUpBy === "google") {
            const result = await http.post('/register/google', newUser, {
                headers: {
                    Authorization: user.accessToken,
                    Uid: user.uid
                }
            });
        } else {
            const userWithPass = { ...newUser, password: user.password }
            const result = await http.post('/register/email', userWithPass);
        }

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
                {step === 1 ? <Step1 loginWithGoogle={loginWithGoogle} loginWithEmailAndPassword={loginWithEmailAndPassword} /> : step === 2 ?

                    <Step2 handleStep={handleStep} /> : step === 3 ? <Step3 handleStep={handleStep} /> : <Step4 handleStep={handleStep} />}
                {verificationPopUp && <VerificationCodePopUp sendVerificationCode={sendVerificationCode} email={email} checkVerificationCode={checkVerificationCode} userGiveWrongCode={userGiveWrongCode} setUserGiveWrongCode={setUserGiveWrongCode} />}
            </div>
        </div>
    );
};

export default AuthPage;