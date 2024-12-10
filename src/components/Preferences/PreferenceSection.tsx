import * as React from "react";
import { PreferenceSection as PreferenceSectionType } from "../../types/PreferencesPage.type";

interface PreferenceSectionProps {
    section: PreferenceSectionType;
    onPreferenceChange: (index: number, isEnabled: boolean) => void;
}

export function PreferenceSection({ section, onPreferenceChange }: PreferenceSectionProps) {
    return (
        <div className="flex flex-wrap gap-8 py-8 items-start self-stretch w-full max-md:max-w-full border-b border-solid border-b-slate-200">
            <div className="flex flex-col py-3.5 text-sm min-w-[240px] w-[260px]">
                <div className="flex flex-col w-full">
                    <div className="gap-1 w-full font-bold tracking-normal leading-none whitespace-nowrap text-slate-800">
                        {section.title}
                    </div>
                    <div className="mt-1 leading-relaxed text-right text-slate-600">
                        {section.description}
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end min-w-[240px] w-[520px] max-md:max-w-full">
                {section.preferences.map((preference, index) => (
                    <div key={index} className={index > 0 ? "mt-4" : ""}>
                        <div className="flex gap-4 px-3 py-3.5 max-w-full text-sm text-right bg-white rounded-xl min-h-[68px] w-[346px]">
                            <input
                                type="checkbox"
                                name={`preference-${preference.title}`}
                                value="enabled"
                                checked={preference.isEnabled}
                                onChange={e => onPreferenceChange(index, e.target.checked)}
                                className="appearance-none flex shrink-0 w-4 h-4 bg-white rounded border border-solid border-stone-300 cursor-pointer checked:bg-indigo-500 checked:border-indigo-500 checked:ring-2 checked:ring-white"
                            />
                            <div className="flex flex-col min-h-[42px] min-w-[240px]">
                                <div className="font-semibold tracking-normal leading-none text-slate-800">
                                    {preference.title}
                                </div>
                                <div className="leading-relaxed text-slate-600">
                                    {preference.description}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}