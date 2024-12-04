export interface ImageUploadProps {
    onUpload?: (file: File) => void;
    supportedFormats?: string;
    maxSize?: number;
}

export interface NavigationButtonProps {
    label: string;
    onClick?: () => void;
}