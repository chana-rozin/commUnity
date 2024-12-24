"use client";
import React, { useState } from "react";
import { Community } from '@/types/community.type'
import CommunityComp from '@/components/Communities/CommunityComp'
import { FaHeart, FaPlus } from "react-icons/fa";
import AddCommunity from "@/components/Communities/AddCommunity";
import { useCommunities } from "@/services/mutations/communities";
const communities: Community[] = [{
    name: "חיים חביב 1",
    _id: "123",
    adminId: ["admin"],
    description: "הקבוצה של הבנין ",
    imageUrl: "",
    members: [{
        _id: "1234",
        first_name: "John",
        last_name: "Doe",
        profile_picture_url: "bhjbv"
    },
    {
        _id: "1234",
        first_name: "Yael",
        last_name: "Shira",
        profile_picture_url: "bhjbv"
    }
    ]
}, {
    name: "משפחה בהפרעה",
    adminId: ["admin"],
    members: [{
        _id: "1234",
        first_name: "John",
        last_name: "Doe",
        profile_picture_url: "bhjbv"


    }],
    _id: "456",
    description: "משפחת גליק בקרית יובל",
    imageUrl: ""
}]
const ProfilePage: React.FC = () => {
    const [cummunityToPresent, setCommunityToPresent] = useState<null | Community>(null);
    const [addFormOpen, setAddFormOpen] = useState<boolean>(false)
    // const { data: communities, isLoading, error, refetch } = useCommunities();


    function handleclick(community: Community) {
        setCommunityToPresent(community);
    }
    function handleAddFormSubmit() {

    }
    function handleExitCommunity(){

    }
    return (
        <>
            <div className="flex flex-col items-end self-stretch p-16 bg-white rounded-2xl">
                <div className="flex flex-col w-full max-md:px-5">
                    <header className="border-b border-solid border-b-slate-200 pb-4">
                        <h1 className="font-bold text-2xl">הקהילות שלי</h1>
                        <p>כאן תוכל לראות את פרטי הקהילות שלך</p>
                    </header>
                    {addFormOpen && <AddCommunity isOpen={addFormOpen} handleAddFormSubmit={handleAddFormSubmit} setIsOpen={setAddFormOpen}/>}
                    {!cummunityToPresent?
                        <div>
                            <button 
                                onClick={() => setAddFormOpen(true)}
                                className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-500 flex items-center justify-center mx-auto cursor-pointer"
                            >
                                <FaPlus />
                            </button>                            {
                                communities?.map((c: Community) => {
                                    return (
                                        <section onClick={() => handleclick(c)} className="flex flex-wrap gap-8 items-start self-stretch w-full text-sm max-md:max-w-full mt-7 border-b border-solid border-b-slate-200 cursor-pointer p-4 rounded-md">
                                            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjyZ79mCAHGozBeewv6tXKVgt9QFPRrRmv0Q&s"} alt="profile" className="w-10 h-10 rounded-full object-cover" />
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
                        <CommunityComp community={cummunityToPresent} setCommunityToPresent={setCommunityToPresent} handleExitCommunity={handleExitCommunity}/>
                    }
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
