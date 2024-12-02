import React from 'react'
import { verificationCodePopUpProps } from './types';

const VerificationCodePopUp: React.FC<verificationCodePopUpProps> = ({ sendVerificationCode , code , setCode}) => {
    function handleChange(event: any){
        setCode(event.target.value);
    }
    return (
        <div>
            <h2>Verification Code</h2>
            <input type="text" placeholder="Enter verification code" onChange={handleChange} value={code}/>
            <button>Submit</button>
            <p>Didn't receive a code? Resend in {60} seconds</p>
            <button onClick={() => sendVerificationCode()}>Resend</button>
        </div>
    )
}
export default VerificationCodePopUp;
