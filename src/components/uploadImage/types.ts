export interface ImageUploadProps {
    onUpload?: (file: File) => void;
    supportedFormats?: string;
    maxSize?: number;
    setImageUrl: React.Dispatch<React.SetStateAction<any>>;
}