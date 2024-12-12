"use client";

import React from "react";
import { RequestCard } from "../components/RequestCard";
import { useBabysittingRequests, useCreateBabysittingRequest } from "@/services/mutations/babysitting";

function BabysittingPage() {
    const { data: babysittingRequests, isLoading, error } = useBabysittingRequests();
    const createRequestMutation = useCreateBabysittingRequest();

    const handleAddRequest = () => {
        const newRequest = {
            id: Date.now().toString(), // Example unique ID
            title: "New Babysitting Request",
            description: "Need a babysitter for the weekend.",
            date: new Date(),
        };
        createRequestMutation.mutate(newRequest);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading babysitting requests</div>;

    return (
        <div className="flex w-full self-stretch">
            <main className="flex w-full flex-wrap gap-5 justify-center content-start items-start self-start px-4 bg-indigo-100 rounded-2xl min-h-[669px]">
                {babysittingRequests?.map((request) => (
                    <RequestCard key={request._id} request={request} />
                ))}
            </main>
            <button
                onClick={handleAddRequest}
                className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Add Request
            </button>
        </div>
    );
}

export default BabysittingPage;
