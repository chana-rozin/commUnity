"use client";

import React, { useEffect, useState } from "react";
import { RequestCard } from "../components/RequestCard";
import { useBabysittingRequests, useCreateBabysittingRequest } from "@/services/mutations/babysitting";
import useUserStore from "@/stores/userStore";
import { FaPlus } from "react-icons/fa";
import AddBabysittingRequest from "./AddForm";
import { Babysitting } from "@/types/babysitting.type";
import babysittingSchema from "./babysittingSchema";
import { NoLoansSection } from "@/components/Loans/NoLoansSection"
import { useCommunities, useNeighborhood } from "@/services/mutations/profileAside";
import { Community } from "@/types/community.type";
import { getNeighborhood } from "@/services/neighborhoods";
import { Neighborhood } from "@/types/neighborhood.types";

function BabysittingPage() {
    const { user } = useUserStore();
    const { data: babysittingRequests, isLoading, error } = useBabysittingRequests([
        user!.neighborhoodId,
        ...user!.communitiesIds
    ]);
    const createRequestMutation = useCreateBabysittingRequest();
    const { data: communities = [] } = useCommunities();
    const { data: neighborhood } = useNeighborhood();
    const communitiesCluster = communities?[{id: neighborhood!._id, name: neighborhood!.name},...communities.map((el:Community)=>({id:el._id, name:el.name}))]:[];

    const [isAddFormOpen, setAddFormOpen] = useState(false);

    // Handles form submission and mutation
    const handleCreateBabysitting = (newRequest: Partial<Babysitting>) => {
        createRequestMutation.mutate({
            ...newRequest,
            requester: {
                id: user!._id!,
                name: `${user!.first_name} ${user?.last_name}`,
            },
            babysitter: undefined,
        });
        setAddFormOpen(false);
    };


    if (isLoading) return <div>טוען בקשות בייביסיטר</div>;
    if (error) return <div>שגיאה בטעינת בקשות בייביסיטר</div>;

    return (
        <div className="relative flex flex-col w-full h-full ">
            {/* Add Request Button */}
            <button
                onClick={() => setAddFormOpen(true)}
                className="absolute top-7 left-5 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-500"
            >
                <FaPlus />
            </button>
            {/* AddForm */}
            {isAddFormOpen && (
                <AddBabysittingRequest
                isOpen={isAddFormOpen}
                communities={communitiesCluster}
                onSubmit={handleCreateBabysitting}
                onClose={()=>setAddFormOpen(false)}
            />
            )}

            {/* Main Content */}
            {isLoading? <div>טוען בקשות בייביסיטר</div>:
            error? <div>שגיאה בטעינת בקשות בייביסיטר</div>:
            babysittingRequests?.length || 0 > 0 ?
                <main className="flex w-full flex-wrap gap-5 justify-center content-start items-start self-start px-4 bg-indigo-100 rounded-2xl min-h-[669px]">
                    {babysittingRequests?.map((request) => (
                        <RequestCard key={request._id} request={request} />
                    ))}
                </main>
                : <section className="">
                    <NoLoansSection
                        title="אין בקשות פעילות"
                        description="כרגע אין בקשות לבייביסטר באזורך"
                    /></section>}
        </div>
    );
}

export default BabysittingPage;
