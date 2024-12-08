import * as React from "react";
import { ProfileSectionProps } from "@/types/profileComponent.type";

export const ProfileSection: React.FC<ProfileSectionProps> = ({
    title,
    description,
    children
}) => {
    return (
        <section className="flex flex-wrap gap-8 items-start self-stretch w-full text-sm max-md:max-w-full mt-7">
            <div className="flex flex-col min-w-[240px] w-[260px]">
                <div className="flex flex-col w-full">
                    <h2 className="gap-1 self-stretch w-full font-bold tracking-normal leading-none text-slate-800">
                        {title}
                    </h2>
                    <p className="mt-1 leading-relaxed text-right text-slate-600">
                        {description}
                    </p>
                </div>
            </div>
            {children}
        </section>
    );
};