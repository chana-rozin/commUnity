import * as React from "react";
import { PreferenceSection as PreferenceSectionType } from "./types";
import { PreferenceToggle } from "./PreferenceToggle";

interface PreferenceSectionProps {
    section: PreferenceSectionType;
    onPreferenceChange: (index: number, isEnabled: boolean) => void;
}

export function PreferenceSection({ section, onPreferenceChange }: PreferenceSectionProps) {
    return (
        <div className="flex flex-wrap gap-8 items-start self-stretch w-full max-md:max-w-full">
            <div className="flex flex-col items-end min-w-[240px] w-[520px] max-md:max-w-full">
                {section.preferences.map((preference, index) => (
                    <div key={index} className={index > 0 ? "mt-4" : ""}>
                        <PreferenceToggle
                            preference={preference}
                            onChange={(isEnabled) => onPreferenceChange(index, isEnabled)}
                        />
                    </div>
                ))}
            </div>
            <div className="flex flex-col text-sm min-w-[240px] w-[260px]">
                <div className="flex flex-col w-full">
                    <div className="gap-1 w-full font-bold tracking-normal leading-none whitespace-nowrap text-slate-800">
                        {section.title}
                    </div>
                    <div className="mt-1 leading-relaxed text-right text-slate-600">
                        {section.description}
                    </div>
                </div>
            </div>
        </div>
    );
}