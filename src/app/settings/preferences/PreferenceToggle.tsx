import * as React from "react";
import { NotificationPreference } from "./types";

interface PreferenceToggleProps {
    preference: NotificationPreference;
    onChange: (isEnabled: boolean) => void;
}

export function PreferenceToggle({ preference, onChange }: PreferenceToggleProps) {
    return (
        <div className="flex gap-4 items-start px-3 py-3.5 max-w-full text-sm text-right bg-white rounded-xl min-h-[68px] w-[346px]">
            <div className="flex flex-col min-h-[42px] min-w-[240px]">
                <div className="font-semibold tracking-normal leading-none text-slate-800">
                    {preference.title}
                </div>
                <div className="leading-relaxed text-slate-600">
                    {preference.description}
                </div>
            </div>
            <div
                role="switch"
                tabIndex={0}
                aria-checked={preference.isEnabled}
                className="flex shrink-0 w-4 h-4 bg-white rounded border border-solid border-stone-300"
                onClick={() => onChange(!preference.isEnabled)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        onChange(!preference.isEnabled);
                    }
                }}
            />
        </div>
    );
}