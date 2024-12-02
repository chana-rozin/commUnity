import * as React from 'react';
import { TabProps } from './types';

export const AuthTab: React.FC<TabProps> = ({ label, isActive }) => {
    return (
        <div className={`flex flex-1 shrink items-start self-stretch my-auto font-${isActive ? 'semibold' : 'medium'} basis-0`}>
            <div className={`flex flex-1 shrink items-start w-full ${isActive ? 'bg-violet-200' : 'bg-neutral-100'} basis-0 rounded-[99px]`}>
                <div className="flex-1 shrink gap-1 self-stretch p-2 w-full">
                    {label}
                </div>
            </div>
        </div>
    );
};