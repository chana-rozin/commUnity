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
import LoadingPopUp from '@/components/animations/LoadingPopUp';
import FormPopUp from '@/components/PopUp/AuthPopUp';
import { z } from "zod";
import { User } from '../../types/user.type'
import { Preference } from '@/types/general.type';

const googleProvider = new GoogleAuthProvider();
import useUserStore from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const signUp: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [verificationPopUp, setVerificationPopUp] = useState(false);
    const [step, setStep] = useState(1);
    const [user, setUser] = useState<any>(null);
    const [userGiveWrongCode, setUserGiveWrongCode] = useState<null | string>(null);
    const [signUpBy, setSignUpBy] = useState<string>();
    const [userExists, setUserExists] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [googleImage, setGoogleImage] = useState<string | null>(null);
    const router = useRouter();

    async function loginWithGoogle() {
        try {
            setLoading(true);
            setSignUpBy('google');
            const result = await signInWithPopup(auth, googleProvider);
            let user: any = result.user;
            const userExist = await http.post(`/register/${user.email}`)
            setUserExists(false)
            setGoogleImage(user.photoURL)
            setUser(user);
            console.log("User signed in:", user);
            setLoading(false);
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
        try {
            setSignUpBy('email')
            setLoading(true);
            const userExist = await http.post(`/register/${email}`)
            setUserExists(false);
            setVerificationPopUp(true);
            setEmail(email);
            setUser({ email: email, password: password });
            setLoading(false);
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
        try {
            setLoading(true);
            const result = http.post('/verify-email/send', { email: email })
            setLoading(false);
        }
        catch (error) {
            console.error('Error sending verification code:', error);
        }
    }

    async function checkVerificationCode(userEmail: string, userCode: string) {
        try {
            setLoading(true);
            const result = await http.post('/verify-email/check', { email: userEmail, code: userCode })
            setLoading(false);
            if (result.status === 200) {
                setStep(2);
                setVerificationPopUp(false);
            } else {
                setUserGiveWrongCode(result.data.message);
            }
            console.log(result);

        }
        catch (error: any) {
            console.error('Error sending verification code:', error);
            setUserGiveWrongCode(error.message);
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
        try {
            setLoading(true);
            const preferences: Preference =
            {
                email_notifications: true,
                minyan_notifications: true,
                event_notifications: true,
                sound_alerts: false,
                ai_training_data: false,
                general_usage_data: false
            };
            const image = user.imageUrl ? user.imageUrl : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            let newUser: User = {
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                location: user.location,
                address: user.address,
                phone_number: user.phone,
                profile_picture_url: image,
                neighborhood: { _id: `${user.address.neighborhood},${user.address.city},${user.address.country}` },
                communities: [],
                preferences: preferences,
                savedPostsIds: [],
                savedEventsIds: [],
                notifications: []
            }
            var result;
            if (signUpBy === "google") {
                const userWithToken = { ...newUser, accessToken: user.accessToken }
                result = await http.post('/register/google', userWithToken);
            } else {
                const userWithPass = { ...newUser, password: user.password }
                result = await http.post('/register/email', userWithPass);
            }
            setLoading(false);
            if (result.status !== 201) {
                toast.success('קרתה שגיאה במהלך ההרשמה, נסה שוב מאוחר יותר!')
                throw new Error('Failed to add user to the database');
            }
            else {
                useUserStore.getState().setUser(result.data, rememberMe);
                router.push('/home');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="overflow-hidden py-10 px-9 bg-white max-md:px-5">
            {loading && <LoadingPopUp isOpen={loading} />}
            <div className="flex gap-5 max-md:flex-col">
                <OpeningImage />
                {step === 1 ? <Step1 loginWithGoogle={loginWithGoogle} loginWithEmailAndPassword={loginWithEmailAndPassword} userExists={userExists} setRememberMe={setRememberMe} rememberMe={rememberMe} setEmail={setEmail} /> : step === 2 ?
                    <Step2 handleStep={handleStep} /> : step === 3 ? <Step3 handleStep={handleStep} googleImage={googleImage} /> : <Step4 handleStep={handleStep} signUp={signUp} />}
                <FormPopUp onSubmit={checkVerificationCode} inputRole={"קוד אימות"} isResend='לא קיבלת קוד? שלח שוב' resend={sendVerificationCode} inputError={userGiveWrongCode} setInputError={setUserGiveWrongCode} title='נשלח קוד אימות לכתובת המייל' isOpen={verificationPopUp} onClose={() => { setVerificationPopUp(false) }} data={email} formObj={{ input: z.string() }} />
            </div>
        </div>
    );
};


export default signUp;