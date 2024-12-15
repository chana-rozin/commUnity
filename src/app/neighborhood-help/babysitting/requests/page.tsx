"use client";

import React, { useState } from "react";
import { RequestCard } from "../components/RequestCard";
import { useBabysittingRequests, useCreateBabysittingRequest } from "@/services/mutations/babysitting";
import useUserStore from "@/stores/userStore";
import { FaPlus } from "react-icons/fa";
import { AddForm } from "@/components/Forms/AddForm";
import { Babysitting } from "@/types/babysitting.type";
import babysittingSchema from "./babysittingSchema";
import { NoLoansSection } from "@/components/Loans/NoLoansSection"

function BabysittingPage() {
    const { user } = useUserStore();
    const { data: babysittingRequests, isLoading, error } = useBabysittingRequests([
        user!.neighborhoodId,
        ...user!.communitiesIds
    ]);
    const createRequestMutation = useCreateBabysittingRequest();

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
                <AddForm
                    schema={babysittingSchema}
                    initialValues={{
                        date: new Date(),
                        time: { start: "00:00", end: "00:00" },
                        address: {
                            neighborhood: user!.address.neighborhood,
                            street: user!.address.street,
                            city: user!.address.city,
                            houseNumber: user!.address.houseNumber,
                        },
                        childrenNumber: 1,
                        ageRange: "",
                        notes: "",
                        AuthorizedIds: [],
                    }}
                    hiddenFields={{ requester: { id: user!._id!, name: `${user!.first_name} ${user?.last_name}` } }}
                    onSubmit={handleCreateBabysitting}
                    title="הוספת בקשת בייביסיטר"
                    isOpen={true}
                    onClose={() => setAddFormOpen(false)}
                />
            )}

            {/* Main Content */}
            {babysittingRequests?.length || 0 > 0 ?
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
