"use client"
import * as React from "react";
import { PreferenceSection } from "./PreferenceSection";
import { PreferenceSection as PreferenceSectionType } from "./types";
import { sectionsData } from "./utils";

const PreferencesPage: React.FC = () => {
    const [sections] = React.useState<PreferenceSectionType[]>(sectionsData);

    const handlePreferenceChange = (sectionIndex: number, preferenceIndex: number, isEnabled: boolean) => {
        // Handle preference change
    };

    const handleSave = () => {
        // Handle save
    };

    const handleCancel = () => {
        // Handle cancel
    };

    return (
        <main className="flex flex-col items-end self-stretch pt-4 pr-4 pb-28 bg-white rounded-2xl max-md:pb-24" role="main">
            <div className="flex flex-col pt-8 pl-8 w-full h-[744px] max-w-[1096px] max-md:pl-5 max-md:max-w-full">
                <header className="flex gap-4 items-center self-stretch pb-5 w-full leading-none text-right border-b border-solid border-b-slate-200 max-md:max-w-full">
                    <div className="flex flex-col flex-1 shrink self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                        <h1 className="text-lg font-bold tracking-normal text-slate-800 max-md:max-w-full">
                            העדפות השימוש
                        </h1>
                        <div className="mt-1 text-xs text-slate-600 max-md:max-w-full">
                            כאן תוכל לשנות את העדפות השימוש שלך
                        </div>
                    </div>
                </header>

                <div className="flex flex-col items-end w-full min-h-[712px] max-md:max-w-full">
                    {sections.map((section, index) => (
                        <React.Fragment key={index}>
                            <PreferenceSection
                                section={section}
                                onPreferenceChange={(preferenceIndex, isEnabled) =>
                                    handlePreferenceChange(index, preferenceIndex, isEnabled)
                                }
                            />
                            {index < sections.length - 1 && (
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c68f5f69a052657c59c6ca453d645b4ce525e97c9d0a2976ccacff71c358da3?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611"
                                    alt=""
                                    className="object-contain mt-8 w-full aspect-[1000] stroke-[1px] stroke-slate-200"
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="flex gap-2 items-start self-start mt-6 text-sm font-bold tracking-normal leading-none">
                    <button
                        onClick={handleSave}
                        className="flex overflow-hidden gap-2 justify-center items-center px-4 py-2.5 text-white bg-indigo-600 rounded-[1234px]"
                    >
                        <span className="self-stretch my-auto">שמור שינויים</span>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/be2cee3fb50f34680134c6d99a00e4dba01cc6102e91d86a470b54a43ffb740e?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611"
                            alt=""
                            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                        />
                    </button>
                    <button
                        onClick={handleCancel}
                        className="flex overflow-hidden gap-2 justify-center items-center px-4 py-2.5 whitespace-nowrap border border-solid border-slate-300 rounded-[1234px] text-slate-600"
                    >
                        <span className="self-stretch my-auto">ביטול</span>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4713f7beb10966f3e3d9cb208bcdf41eddf7c1ccdf82297fe442808accfc6d0?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611"
                            alt=""
                            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                        />
                    </button>
                </div>
            </div>
        </main>
    );
}

export default PreferencesPage;