"use client";
import React, { useState } from "react";
import { Community } from '@/types/community.type'
import CommunityComp from '@/components/Communities/CommunityComp'
import { FaPlus } from "react-icons/fa";
import AddCommunity from "@/components/Communities/AddCommunity";
import useUserStore from "@/stores/userStore";
import { useCommunities, useCreateCommunity } from "@/services/mutations/communities";

const MyCommunitiesPage: React.FC = () => {
    const { user, setUser } = useUserStore();
    const [cummunityToPresent, setCommunityToPresent] = useState<null | Community>(null);
    const [addFormOpen, setAddFormOpen] = useState<boolean>(false)
    const { data: communities, isLoading, error, refetch } = useCommunities(user?._id || "");
    const addUserOptions = communities?.filter((c)=>c.main)[0]?.members||[];

    function handleclick(community: Community) {
        setCommunityToPresent(community);
    }
    function handleExitCommunity() {

    }
    if (isLoading) {
        return <div>טעינה...</div>
    }
    if (error) return <div>הייתה שגיאה בטעינת הקהילות: {error.message}</div>;
    return (
        <div className="flex flex-col items-end self-stretch p-16 bg-white rounded-2xl">
            <div className="flex flex-col w-full max-md:px-5">
                <header className="border-b border-solid border-b-slate-200 pb-4">
                    <h1 className="font-bold text-2xl">הקהילות שלי</h1>
                    <p>כאן תוכל לראות את פרטי הקהילות שלך</p>
                </header>
                {addFormOpen && <AddCommunity isOpen={addFormOpen} setIsOpen={setAddFormOpen} />}
                {!cummunityToPresent ?
                    <div>
                        <button
                            onClick={() => setAddFormOpen(true)}
                            className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-500 flex items-center justify-center mx-auto cursor-pointer"
                        >
                            <FaPlus />
                        </button>
                        {communities && communities.length > 0 && communities.map((c: Community) => {
                            return (
                                <section onClick={() => handleclick(c)} className="flex flex-wrap gap-8 items-start self-stretch w-full text-sm max-md:max-w-full mt-7 border-b border-solid border-b-slate-200 cursor-pointer p-4 rounded-md">
                                    <img src={c.imageUrl} alt="profile" className="w-10 rounded-full object-cover" />
                                    <h2 className=" inline">
                                        {c.name}
                                    </h2>
                                    <p className="inline">
                                        {c.description}
                                    </p>
                                </section>
                            )
                        })
                        }</div> :
                    <CommunityComp community={cummunityToPresent} setCommunityToPresent={setCommunityToPresent} addUserOptions={addUserOptions}/>
                }
            </div>
        </div>
    );
};

export default MyCommunitiesPage;
