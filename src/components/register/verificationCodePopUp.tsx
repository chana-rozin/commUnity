import React from 'react'
import { verificationCodePopUpProps } from './step1/types';

const VerificationCodePopUp: React.FC<verificationCodePopUpProps> = ({ sendVerificationCode , email, checkVerificationCode, userGiveWrongCode, setUserGiveWrongCode}) => {
    const [code, setCode] = React.useState('');
    function handleSubmit(event: any){
        event.preventDefault();
        checkVerificationCode(email, code);
    }
    function handleChange(event: any){
        setCode(event.target.value);
        setUserGiveWrongCode(false);
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Verification Code</h2>
            <input type="text" placeholder="Enter verification code" onChange={handleChange} value={code}/>
            {userGiveWrongCode&&<span>הקוד שגוי</span>}
            <button type='submit'>Submit</button>
            <button onClick={() => sendVerificationCode(email)}>לא קיבלת קוד? שלח שוב</button>
        </form>
    )
}
export default VerificationCodePopUp;
