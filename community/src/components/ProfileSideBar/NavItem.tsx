import * as React from "react";
import { NavItemProps } from "@/types/general.type";


export const NavItem: React.FC<NavItemProps> = ({ icon, text, isActive }) => {
    return (
        <div className="flex gap-2 items-center py-2 w-full">
            <img
                loading="lazy"
                src={icon}
                alt=""
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
            />
            <div className={`self-stretch my-auto text-${isActive?"indigo-500":"gray-400"}`}>{text}</div>
        </div>
    );
};