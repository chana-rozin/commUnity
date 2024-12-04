export interface ImageProps {
    src: string;
    className: string;
    alt: string;
}

export interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}