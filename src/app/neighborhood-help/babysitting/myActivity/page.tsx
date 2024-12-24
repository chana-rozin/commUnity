"use client";

import React, { useEffect, useState } from "react";
import { RequestCard } from "../components/RequestCard";
import { useBabysittingRequests, useCreateBabysittingRequest, useRequestsByUser } from "@/services/mutations/babysitting";
import useUserStore from "@/stores/userStore";
import { FaPlus } from "react-icons/fa";
import AddBabysittingRequest from "../requests/AddForm";
import { NoLoansSection } from "@/components/Loans/NoLoansSection";
import { pusherClient } from "@/services/pusher";
import { Babysitting } from "@/types/babysitting.type";

function BabysittingPage() {
    const { user } = useUserStore();
    const [myRequests, setMyRequests] = useState<Babysitting[]>([]);
    const [myBabysits, setMyBabysits] = useState<Babysitting[]>([]);
    const communitiesIds = [...(user?.communities.map((com) => com._id) || []), user?.neighborhood._id];

    const { data: babysittingRequests, isLoading, error, refetch } = useRequestsByUser(
        user
            ? [user!.neighborhood._id, ...user!.communities.map((community) => community._id)]
            : []
        , user?._id || ""
    );

    useEffect(() => {
        if (babysittingRequests && user) {
            const myRequests = babysittingRequests.filter(req => req.requester._id === user._id);
            const myBabysits = babysittingRequests.filter(req => req.babysitter?._id === user._id);
            setMyRequests(myRequests);
            setMyBabysits(myBabysits);
        }
    }, babysittingRequests);

    // useEffect(() => {
    //     if (!communitiesIds || communitiesIds.length === 0) return;

    //     const channels = communitiesIds.map((community) => {
    //         const channel = pusherClient.subscribe(`babysitting_${community}`);
    //         channel.bind("new-request", () => {
    //             refetch();
    //         });
    //         channel.bind("delete-request", () => {
    //             refetch();
    //         });
    //         return channel;
    //     });

    //     return () => {
    //         channels.forEach((channel, index) => {
    //             channel.unbind_all();
    //             pusherClient.unsubscribe(`babysitting_${communitiesIds[index]}`);
    //         });
    //     };
    // }, [communitiesIds, refetch]);

    if (isLoading) return <div>טוען בקשות בייביסיטר</div>;
    if (error) return <div>שגיאה בטעינת בקשות בייביסיטר</div>;

    return (
        <section className="relative w-auto">
            <section className="flex flex-wrap gap-5 justify-center content-center items-center px-4 py-6 w-full bg-indigo-100 rounded-2xl min-h-[669px] max-md:max-w-full">
                {/* Borrowed Items Section */}
                <div className="flex grow shrink items-center self-stretch px-4 py-px my-auto text-lg font-bold leading-10 bg-white rounded-2xl min-h-[43px] min-w-[240px] text-neutral-950 w-[686px] max-md:max-w-full">
                    <h2 className="self-stretch my-auto min-h-[42px] w-[131px]">
                        הבקשות שלי
                    </h2>
                </div>

                {myRequests?.length || 0 > 0 ? (
                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {myRequests?.map((request) => (
                            <RequestCard key={request._id} request={request} />
                        ))}
                    </main>
                ) : (
                    <section>
                        <NoLoansSection
                            title="אין לך בקשות פעילות"
                            description="כרגע אין לך בקשות לבייביסטר"
                        />
                    </section>
                )}

                {/* Lent Items Section */}
                <div className="flex grow shrink items-center self-stretch px-4 my-auto text-lg font-bold leading-10 bg-white rounded-2xl min-h-[42px] min-w-[240px] text-neutral-950 w-[683px] max-md:max-w-full">
                    <h2 className="self-stretch my-auto min-h-[42px]">
                        קבעתי לשמרטף
                    </h2>
                </div>

                {myBabysits?.length || 0 > 0 ? (
                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {myBabysits?.map((request) => (
                            <RequestCard key={request._id} request={request} />
                        ))}
                    </main>
                ) : (
                    <section>
                        <NoLoansSection
                            title="אין שמרטפות"
                            description="כרגע לא קבעת שמרטפות"
                        />
                    </section>
                )}
            </section>
            {/* <div className="flex overflow-hidden flex-wrap gap-5 justify-start content-start items-center px-4 py-6 w-full bg-indigo-100 rounded-2xl min-h-[669px] max-md:max-w-full">
                {myRequests?.length || 0 > 0 ? (
                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {myRequests?.map((request) => (
                            <RequestCard key={request._id} request={request} />
                        ))}
                    </main>
                ) : (
                    <section>
                        <NoLoansSection
                            title="אין לך בקשות פעילות"
                            description="כרגע אין לך בקשות לבייביסטר"
                        />
                    </section>
                )}
            </div>
            <div className="flex overflow-hidden flex-wrap gap-5 justify-start content-start items-center px-4 py-6 w-full bg-indigo-100 rounded-2xl min-h-[669px] max-md:max-w-full">
                {myBabysits?.length || 0 > 0 ? (
                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {myBabysits?.map((request) => (
                            <RequestCard key={request._id} request={request} />
                        ))}
                    </main>
                ) : (
                    <section>
                        <NoLoansSection
                            title="אין שמרטפות"
                            description="כרגע לא קבעת שמרטפות"
                        />
                    </section>
                )}
            </div> */}
        </section>
    );
}

export default BabysittingPage;
