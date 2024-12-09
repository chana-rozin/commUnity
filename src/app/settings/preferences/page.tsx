"use client"
import * as React from "react";
import { PreferenceSection } from "../../../components/Preferences/PreferenceSection";
import { PreferenceSection as PreferenceSectionType } from "../../../types/PreferencesPage.type";
import { sectionsData, getPreferencesObj, setSectionsPreferences } from "../../../utils/preferences";
import useUserStore from "@/stores/userStore";
import { updateUser } from "@/services/users";
import { useEffect } from "react";
import {toast} from 'react-toastify';



const PreferencesPage: React.FC = () => {
    const [sections, setSections] = React.useState<PreferenceSectionType[]>(sectionsData);
    const { user, setUser } = useUserStore();

    useEffect(() => {
        if (user)
            setSections(setSectionsPreferences(user!, sections));
    }, [user])

    const handlePreferenceChange = (sectionIndex: number, preferenceIndex: number, isEnabled: boolean) => {
        const sectionsCopy = [...sections];
        sectionsCopy[sectionIndex].preferences[preferenceIndex].isEnabled = isEnabled;
        setSections(sectionsCopy);
        console.log('sectionsCopy: ', sectionsCopy);
    };

    const handleSave = async () => {
        try{
        const updatedPreferences = getPreferencesObj(sections);
        const updatedUser = { ...user!, preferences: updatedPreferences };
        delete updatedUser._id;
        await updateUser(user!._id!, updatedUser)
        setUser({ ...user!, preferences: updatedPreferences });
        toast.success("העדפות נשמרו בהצלחה");
        }catch{
            toast.error("שגיאה בעת עדכון העדפות");
        }
    };

    const handleCancel = () => {
        setSections(setSectionsPreferences(user!, sections));
    };

    return (
        <main className="flex flex-col items-end self-stretch p-16 bg-white rounded-2xl max-md:pb-24" role="main">
            <div className="flex flex-col w-full max-w-[1096px] max-md:pl-5 max-md:max-w-full">
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

                <div className="flex flex-col items-end w-full max-md:max-w-full">
                    {sections.map((section, index) => (
                        <React.Fragment key={index}>
                            <PreferenceSection
                                section={section}
                                onPreferenceChange={(preferenceIndex, isEnabled) =>
                                    handlePreferenceChange(index, preferenceIndex, isEnabled)
                                }
                            />
                        </React.Fragment>
                    ))}
                </div>

                <div className="flex gap-2 justify-end mt-6 text-sm font-bold tracking-normal leading-none">
                    <button
                        onClick={handleSave}
                        className="flex overflow-hidden gap-2 justify-center items-center px-4 py-2.5 text-white bg-indigo-500 rounded-[1234px]"
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