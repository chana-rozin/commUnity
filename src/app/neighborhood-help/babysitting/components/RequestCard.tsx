import * as React from 'react';
import { BabysittingRequest } from '../types';
import { Babysitting } from '@/types/babysitting.type'
import { type } from 'os';

interface RequestCardProps {
    request: Babysitting;
}

export function RequestCard({ request }: RequestCardProps) {

    const date = new Date(request.date);

    // Format to a human-readable date
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    return (
        <div className="flex flex-col grow shrink h-60 w-[184px]">
            <div className="flex flex-col py-5 pr-5 w-full bg-white rounded-2xl">
                <h2 className="gap-4 self-stretch w-full text-lg font-bold leading-10 text-neutral-950">
                    {request.requester.name}
                </h2>
                <div className="gap-1 mt-1 text-xs leading-4 text-right text-stone-500">
                    <span className="text-sm font-semibold leading-5 text-stone-500">
                        תאריך:
                    </span>
                    <span className="dir-ltr text-sm leading-4 text-stone-500">
                        {' '}{formattedDate}, {request.time.start}-{request.time.end}
                    </span>
                    <br />
                    <span className="text-sm font-semibold leading-5 text-stone-500">
                        מספר ילדים:
                    </span>
                    <span className="text-sm leading-4 text-stone-500">
                        {' '}{request.childrenNumber}
                    </span>
                    <br />
                    <span className="text-sm font-semibold leading-5 text-stone-500">
                        גילאים:{' '}
                    </span>
                    <span className="text-sm leading-4 text-stone-500">{request.ageRange}</span>
                    <br />
                    <span className="text-sm font-semibold leading-5 text-stone-500">
                        כתובת:
                    </span>
                    <span className="text-sm leading-4 text-stone-500">
                        {' '}{request.address.street} {request.address.houseNumber} {request.address.city}
                    </span>
                    <br/>
                    <span className="text-sm font-semibold leading-5 text-stone-500">
                        הערות:
                    </span>
                    <span className="text-sm leading-4 text-stone-500 overflow-hidden whitespace-warp truncate w-[80%]">
                        {' '}{request.notes}
                    </span>

                </div>
                <div className="flex gap-4 mt-1 w-80 max-w-full min-h-[42px]" />
                <div className="flex gap-3 justify-end mt-1 w-full text-base font-medium leading-none text-neutral-100">
                    <div className="flex gap-5 ">
                        <button
                            className="flex gap-3 items-center p-2 ml-6 bg-indigo-600 rounded-[50px]"
                            aria-label="הצע לשמרטף"
                        >
                            <span className="self-stretch my-auto">רוצה לשמרטף!</span>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c3802ac905fb5f7158ac32beb79d55b28a3351cb29b01bbfd7788ea91e194f9?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611"
                                alt=""
                                className="object-contain shrink-0 self-stretch my-auto aspect-[1.05] w-[21px]"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}