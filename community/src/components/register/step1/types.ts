export interface InputFieldProps {
    label: string;
    type?: string;
    value: string;
    placeholder?: string;
    icon?: string;
    id: string;
    name: string;
    onInputChange: (name: string, value: string) => void;
}

export interface AuthButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    onClick?: (e:any) => void;
    type?: 'button' | 'submit';
}

export interface TabProps {
    label: string;
    isActive: boolean;
}

export interface verificationCodePopUpProps{
    sendVerificationCode: (email: string)=> void;
    email: string;
    checkVerificationCode: (email: string, code: string)=> void;
    userGiveWrongCode: boolean;
}