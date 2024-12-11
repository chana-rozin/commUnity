import React from 'react'
import { verificationCodePopUpProps } from './step1/types';
import Popup from '../PopUp/PopUp';
import styles from './register.module.css'

const VerificationCodePopUp: React.FC<verificationCodePopUpProps> = ({ sendVerificationCode, email, checkVerificationCode, userGiveWrongCode, setUserGiveWrongCode, setVerificationPopUp }) => {
    const [code, setCode] = React.useState('');
    function handleSubmit(event: any) {
        event.preventDefault();
        checkVerificationCode(email, code);
    }
    function handleChange(event: any) {
        setCode(event.target.value);
        setUserGiveWrongCode(false);
    }
    function onClose(){
        setVerificationPopUp(false)
    }
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
                <div className={`relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 `} >
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        aria-label="Close Popup"
                    >
                        ✖
                    </button>
                    <div className={styles.popUpForm}>
                        {/* Popup Title */}
                        <h2 className="text-xl font-bold text-gray-900">קוד אימות</h2>

                        {/* Popup Content */}
                        <div className="mt-4 text-sm text-gray-700">
                            <form onSubmit={handleSubmit} className={styles.popUpForm}>
                                <input className={`flex-1 shrink self-stretch my-auto basis-0 text-neutral-500 outline-none ${styles.verificationInput}`} type="text" placeholder="הכנס את קוד האימות" onChange={handleChange} value={code}/>
                                {userGiveWrongCode && <span>הקוד שגוי</span>}
                                <button type='submit' className="gap-1 px-4 py-2 mt-16 ml-20 max-w-full text-base text-white bg-indigo-600 rounded-md w-[140px] max-md:mt-10">אמת את הקוד</button>
                                <br />
                                <p>לא קיבלת קוד?   <span onClick={() => sendVerificationCode(email)} >שלח שוב</span></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default VerificationCodePopUp;
