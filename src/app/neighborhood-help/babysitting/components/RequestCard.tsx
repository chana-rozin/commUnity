import * as React from 'react';
import { BabysittingRequest } from '../types';
import { Babysitting } from '@/types/babysitting.type'
import { type } from 'os';
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { CiClock1 } from "react-icons/ci";
import { FaChildren } from "react-icons/fa6"; import { PiLadderSimpleLight } from "react-icons/pi";
import { MdOutlineHouse } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import useUserStore from '@/stores/userStore';
import { useBabysit } from '@/services/mutations/babysitting';

interface RequestCardProps {
    request: Babysitting;
}

export function RequestCard({ request }: RequestCardProps) {

    const {user} = useUserStore();
    const { mutate: babysit } = useBabysit(); // Get the mutate function from useBabysit hook

    const offerToBabysit = () => {
        if (!user) {
            console.error("User is not logged in.");
            return;
        }

        babysit({ requestId: request._id, user: user }, {
            onSuccess: () => {
                console.log("Successfully offered to babysit!");
            },
            onError: (error) => {
                console.error("Failed to offer to babysit:", error);
            },
        });
    };

    const date = new Date(request.date);

    // Format to a human-readable date
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    return (
        <div className="flex flex-col  flex-1 shrink items-start py-5 pr-5 w-full bg-white rounded-2xl basis-0">
            <div className="flex flex-col py-5 pr-5 w-full bg-white rounded-2xl">
                <h2 className="gap-4 self-stretch w-full text-lg font-bold leading-10 text-neutral-950">
                    {`${request.requester.first_name} ${request.requester.last_name}`}
                </h2>
                <div className="flex flex-col gap-2 mt-1 text-xs leading-4 text-right text-stone-500">
                    <div title='תאריך' className="flex items-center text-sm font-semibold leading-5 text-stone-500 gap-2">
                        <HiOutlineCalendarDays className='text-indigo-500' />
                        {formattedDate}
                    </div>
                    <div title='שעה' className="flex items-center text-sm font-semibold leading-5 text-stone-500 gap-2">
                        <CiClock1 className='text-indigo-500' />
                        {request.time.start}-{request.time.end}
                    </div>
                    <div title="מס' ילדים" className="flex items-center text-sm font-semibold leading-5 text-stone-500 gap-2">
                        <FaChildren className='text-indigo-500' />
                        {request.childrenNumber}
                    </div>
                    <div title='טווח גילאים' className="flex items-center text-sm font-semibold leading-5 text-stone-500 gap-2">
                        <PiLadderSimpleLight className='text-indigo-500' />
                        {request.ageRange}
                    </div>
                    <div title='כתובת' className="flex items-center text-sm font-semibold leading-5 text-stone-500 gap-2">
                        <MdOutlineHouse className='text-indigo-500' />
                        {' '}{request.address.street} {request.address.houseNumber} {request.address.city}
                    </div>
                    <div title='הערות' className="flex items-center text-sm font-semibold leading-5 text-stone-500 gap-2">
                        <BiPencil className='text-indigo-500' />
                        {' '}{request.notes?.length ? request.notes : "אין הערות"}
                    </div>

                </div>
                <div className="flex gap-4 mt-1 w-80 max-w-full min-h-[42px]" />
                <div className="flex gap-3 justify-end mt-1 w-full text-base font-medium leading-none text-neutral-100">
                    <div className="flex gap-5 ">
                        <button
                            className="flex gap-3 items-center p-2 ml-6 bg-indigo-600 rounded-[50px]"
                            aria-label="הצע לשמרטף"
                            onClick={offerToBabysit}
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