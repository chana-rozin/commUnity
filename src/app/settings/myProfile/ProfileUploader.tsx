import * as React from "react";

export const ProfileUploader: React.FC = () => {
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleDrag = React.useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = React.useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFiles(files);
        }
    }, []);

    const handleFiles = (files: FileList) => {
        const file = files[0];
        if (file && file.type.match(/^image\/(jpeg|png|svg\+xml)$/)) {
            // Handle file upload logic here
        }
    };

    return (
        <div
            className={`flex w-[444px] overflow-hidden flex-col justify-center p-6 bg-white border border-dashed  ${isDragging ? 'border-indigo-600' : 'border-slate-300'
                } rounded-[32px] `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    fileInputRef.current?.click();
                }
            }}
        >
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/svg+xml"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                aria-label="העלאת תמונת פרופיל"
            />
            <div className="flex flex-col w-full">
                <div className="flex gap-2.5 justify-center items-center self-center w-12 h-12 bg-violet-50 min-h-[48px] rounded-[123px]">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9311452257510dca100639a813361c48d14e6928c3b76c24b8544f21e23f7f7?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611"
                        alt=""
                        className="object-contain self-stretch my-auto w-6 aspect-square"
                        aria-hidden="true"
                    />
                </div>
                <div className="flex flex-col justify-center mt-6 w-full">
                    <div className="flex gap-1 justify-center items-center w-full text-base tracking-normal leading-none">
                        <span className="overflow-hidden gap-2.5 self-stretch my-auto font-medium text-slate-600">
                            כדי להעלות את הקובץ או לגרור.
                        </span>
                        <span className="self-stretch my-auto font-bold text-center text-indigo-600">
                            לחץ כאן
                        </span>
                    </div>
                    <div className="mt-2 text-sm font-medium tracking-normal leading-none text-center text-slate-400">
                        SVG, JPG, PNG (10mb each) :פורמטים נתמכים
                    </div>
                </div>
            </div>
        </div>
    );
};