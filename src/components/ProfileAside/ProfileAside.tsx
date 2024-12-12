"use client";
import * as React from "react";
import useUserStore from "@/stores/userStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Community } from "@/types/community.type";
import { useCommunities, useNeighborhood } from "@/services/mutations/profileAside";

export const ProfileAside: React.FC<{ categories: {name: string, href: string, isActive: boolean}[] }> = ({ categories }) => {
    const { user } = useUserStore();
    const { communityId, neighborhoodId } = useParams();
    const { data: communities = [] } = useCommunities();
    const { data: neighborhood } = useNeighborhood();

    const links = [
        {
            href: `/forum/${neighborhood?._id}`,
            text: neighborhood?.name,
            isActive: neighborhoodId === neighborhood?._id,
        },
        ...communities.map((community: Community) => ({
            href: `/forum/${community._id}`,
            text: community.name,
            isActive: communityId === community._id,
        })),
    ];

    if (!user) return null;

    const { first_name, last_name, address, profile_picture_url } = user;

    return (
        <main className="flex flex-col justify-center items-center w-full bg-white rounded-2xl py-10">
            <div className="flex flex-col text-center justify-center items-center mt-5 max-w-full w-[131px]">
                <img loading="lazy" src={profile_picture_url} alt={`Profile picture of ${first_name} ${last_name}`} className="object-contain aspect-square w-[67px] rounded-full object-cover"
                />
                <div className="flex flex-col justify-center items-center mt-3.5">
                    <div className="text-base text-neutral-950">{`${first_name} ${last_name}`}</div>
                    <div className="text-xs font-medium leading-none text-neutral-400">
                        {`${address.street} ${address.houseNumber}`}
                    </div>
                </div>
                <Link aria-label="View my profile" href="/settings/myProfile" className="gap-1 self-stretch px-4 py-2 mt-3.5 text-sm font-medium leading-none text-center text-white bg-indigo-600 rounded-md" >הפרופיל שלי</Link>
            </div>

            <nav className="flex text-center flex-col justify-between items-center mt-8 text-sm leading-none whitespace-nowrap bg-white min-h-[54px]">
                {categories.map((category, index)=>
                    <Link key={index} href={category.href} className={`${category.isActive? "text-indigo-500" : "text-gray-400"}`}>
                        {category.name}
                    </Link>
                )}
            </nav>

            <section className="flex flex-col self-stretch pl-6 mt-8 w-full text-base text-neutral-950">
                {(!neighborhood || !communities) ? <div className="flex justify-center">Loading...</div>
                    : links.map((item, index) => (
                        <Link key={index} href={item.href} className="flex justify-end gap-2 items-center pb-5 py-2 w-full">
                            <div className={`self-stretch my-auto ${item.isActive ? "text-indigo-500" : ""}`}>
                                {item.text}
                            </div>
                            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/24acf9bf6b6d6b7b96d2a34130f075c7cb5b6d35335de6e5f985ebc2d6a2c515?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611" alt="" className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]" />
                        </Link>
                    ))}
            </section>
        </main>
    );
};
