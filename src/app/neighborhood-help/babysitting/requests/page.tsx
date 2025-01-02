"use client";

import React, { useEffect, useState } from "react";
import { RequestCard } from "../components/RequestCard";
import { useBabysittingRequests, useCreateBabysittingRequest } from "@/services/mutations/babysitting";
import useUserStore from "@/stores/userStore";
import { FaPlus } from "react-icons/fa";
import AddBabysittingRequest from "./AddForm";
import { NoLoansSection } from "@/components/Loans/NoLoansSection";
import pusherClient from "@/services/pusher";
import Loading from "@/components/animations/Loading";

function BabysittingPage() {
    const { user } = useUserStore();
    const communitiesIds = [...(user?.communities.map((com) => com._id) || []), user?.neighborhood._id];

    const { data: babysittingRequests, isLoading, error, refetch } = useBabysittingRequests(
        user
            ? [...user!.communities.map((community) => community._id)]
            : []
    );

    const [isAddFormOpen, setAddFormOpen] = useState(false);

    useEffect(() => {
        if (!communitiesIds || communitiesIds.length === 0) return;

        const channels = communitiesIds.map((community) => {
            const channel = pusherClient.subscribe(`babysitting_${community}`);
            channel.bind("new-request", () => {
                refetch();
            });
            channel.bind("delete-request", () => {
                refetch();
            });
            return channel;
        });

        return () => {
            channels.forEach((channel, index) => {
                channel.unbind_all();
                pusherClient.unsubscribe(`babysitting_${communitiesIds[index]}`);
            });
        };
    }, [communitiesIds, refetch]);

    if (isLoading) return <Loading height='low'/>;
    if (error) return <div>שגיאה בטעינת בקשות בייביסיטר</div>;

    return (
        <section className="relative">
            {/* Button for opening AddForm */}
            <button
                onClick={() => setAddFormOpen(true)}
                className="absolute top-7 left-5 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-500"
            >
                <FaPlus />
            </button>

            {/* AddForm */}
            {isAddFormOpen && (
                <AddBabysittingRequest isOpen={isAddFormOpen} onClose={() => setAddFormOpen(false)} />
            )}

            <div className="flex overflow-hidden flex-wrap gap-5 justify-start content-start items-center px-4 py-6 w-full bg-indigo-100 rounded-2xl min-h-[669px] max-md:max-w-full">
                {babysittingRequests?.length || 0 > 0 ? (
                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {babysittingRequests?.map((request) => (
                            <RequestCard key={request._id} request={request} />
                        ))}
                    </main>
                ) : (
                    <section className="w-full">
                        <NoLoansSection
                            title="אין בקשות פעילות"
                            description="כרגע אין בקשות לבייביסטר באזורך"
                        />
                    </section>
                )}
            </div>
        </section>
    );
}

export default BabysittingPage;
