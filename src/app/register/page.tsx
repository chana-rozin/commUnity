"use client"
import React, { useEffect } from 'react';
import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from '@/services/firebaseConfig'
import http from '../../services/http'
import Step1 from '../../components/register/step1/step1'
import Step2 from '../../components/register/step2/step2'
import Step3 from '../../components/register/step3/step3'
import Step4 from '../../components/register/step4/step4'
import OpeningImage from '../../components/OpeningImage/OpeningImage'

import { User } from '../../types/user.type'
import { Preference } from '@/types/general.type';



import VerificationCodePopUp from '../../components/register/verificationCodePopUp'
const googleProvider = new GoogleAuthProvider();
import useUserStore from '@/stores/userStore';
import { useRouter } from 'next/navigation';



const signUp: React.FC = () => {


    const [email, setEmail] = useState('');
    const [verificationPopUp, setVerificationPopUp] = useState(false);
    const [step, setStep] = useState(1);
    const [user, setUser] = useState<any>(null);
    const [userGiveWrongCode, setUserGiveWrongCode] = useState(false);
    const [signUpBy, setSignUpBy] = useState<string>();
    const [userExists, setUserExists] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [googleImage, setGoogleImage] = useState<string|null>(null);
    const router = useRouter();

    async function loginWithGoogle() {
        try {
            debugger
            setSignUpBy('google');
            const result = await signInWithPopup(auth, googleProvider);
            let user:any = result.user;
            const userExist = await http.post(`/register/${user.email}`)
            setUserExists(false)
            setGoogleImage(user.photoURL)
            setUser(user);
            console.log("User signed in:", user);
            setStep(2);
        } catch (error: any) {
            if (error.status === 409) {
                setUserExists(true);
                return;
            }
            console.error("Error signing in:", error);
        }
    }

    async function loginWithEmailAndPassword(email: string, password: string) {
        debugger
        try {
            setSignUpBy('email')
            const userExist = await http.post(`/register/${email}`)
            setUserExists(false);
            setVerificationPopUp(true);
            setEmail(email);
            setUser({ email: email, password: password });
            sendVerificationCode(email);
        } catch (error: any) {
            if (error.status === 409) {
                setUserExists(true);
                return;
            }
            console.error("Error signing in:", error);
        }
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
        try {
            console.log(user);

            const preferences: Preference =
            {
                email_notifications: true,
                minyan_notifications: true,
                event_notifications: true,
                sound_alerts: false,
                ai_training_data: false,
                general_usage_data: false
            };
            let newUser: User = {
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                address: user.address,
                phone_number: user.phone,
                profile_picture_url: user.imageUrl,
                neighborhoodId: "675042e6292054c85b9b65d6",
                communitiesIds: [],
                preferences: preferences,
                savedPostsIds: [],
                savedEventsIds: []
            }
            var result;
            if (signUpBy === "google") {
                const userWithToken = { ...newUser, accessToken: user.accessToken }
                result = await http.post('/register/google', userWithToken);
            } else {
                const userWithPass = { ...newUser, password: user.password }
                result = await http.post('/register/email', userWithPass);
            }
            if (result.status !== 201) {
                throw new Error('Failed to add user to the database');
            }
            else {
                debugger
                newUser._id = result.data.insertedId;
                useUserStore.getState().setUser(newUser,rememberMe);
                router.push('/home');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="overflow-hidden py-10 pr-9 pl-16 bg-white max-md:px-5">
            <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
                    <OpeningImage />
                </div>

                {step === 1 ? <Step1 loginWithGoogle={loginWithGoogle} loginWithEmailAndPassword={loginWithEmailAndPassword} userExists={userExists} setRememberMe={setRememberMe} rememberMe={rememberMe}/> : step === 2 ?
                    <Step2 handleStep={handleStep} /> : step === 3 ? <Step3 handleStep={handleStep} googleImage={googleImage} /> : <Step4 handleStep={handleStep} signUp={signUp}/>}
                {verificationPopUp && <VerificationCodePopUp sendVerificationCode={sendVerificationCode} email={email} checkVerificationCode={checkVerificationCode} userGiveWrongCode={userGiveWrongCode} setUserGiveWrongCode={setUserGiveWrongCode} setVerificationPopUp={setVerificationPopUp}/>}
            </div>
        </div>
    );
};


export default signUp;