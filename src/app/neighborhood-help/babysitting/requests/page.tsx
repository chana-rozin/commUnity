"use client"
import React, {useState} from 'react';
import { RequestCard } from '../components/RequestCard';
import {Babysitting} from '@/types/babysitting.type'

function page() {

    const [babysittingRequests, setBabysittingRequests] = useState<Babysitting[]>([]);

    return (
        <div className="flex w-full self-stretch">
            <main className="flex w-full flex-wrap gap-5 justify-center content-start items-start self-start px-4 bg-indigo-100 rounded-2xl min-h-[669px]">
                {babysittingRequests.map((request, index) => (
                    <RequestCard key={index} request={request} />
                ))}
            </main>
        </div>
    );
}

export default page;