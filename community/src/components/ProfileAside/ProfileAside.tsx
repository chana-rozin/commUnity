"use client";
import * as React from "react";
import useUserStore from "@/stores/userStore";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getNeighborhood } from "@/services/neighborhoods";
import { getCommunity } from "@/services/communities";
import { useParams } from "next/navigation";

interface ProfileLink {
    href: string;
    text: string;
    isActive: boolean;
}

export const ProfileAside: React.FC<{ saved: boolean }> = ({ saved = false }) => {
    const [links, setLinks] = useState<ProfileLink[]>([]);
    const user = useUserStore((state) => state.user);
    const { communityId, neighborhoodId } = useParams();

    useEffect(() => {
        if (!user) return;

        const fetchLinks = async () => {
            try {
                const communityLinks = await Promise.all(
                    user.communitiesIds.map(async (id) => {
                        const community = await getCommunity(id);
                        return {
                            href: `community/${community._id}`,
                            text: community.name,
                            isActive: communityId === community._id,
                        };
                    })
                );

                const neighborhood = await getNeighborhood(user.neighborhoodId);
                const neighborhoodLink = {
                    href: `neighborhood/${neighborhood._id}`,
                    text: neighborhood.name,
                    isActive: neighborhoodId === neighborhood._id,
                };

                setLinks([neighborhoodLink, ...communityLinks]);
            } catch (error) {
                console.error("Failed to fetch communities or neighborhood:", error);
            }
        };

        fetchLinks();
    }, [user, communityId, neighborhoodId]);

    if (!user) return null;

    const { first_name, last_name, address, profile_picture_url } = user;

    return (
        <main className="flex flex-col justify-center items-center w-full bg-white rounded-2xl min-h-[678px]">
            <div className="flex flex-col text-center justify-center items-center mt-5 max-w-full w-[131px]">
                <img
                    loading="lazy"
                    src={
                        profile_picture_url ||
                        "https://cdn.builder.io/api/v1/image/assets/TEMP/38450d9390fdb4ad03074d5f3395be324567170775fc0c6290182e6d99bbe05d?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611"
                    }
                    alt={`Profile picture of ${first_name} ${last_name}`}
                    className="object-contain aspect-square w-[67px] rounded-full"
                />
                <div className="flex flex-col justify-center items-center mt-3.5">
                    <div className="text-base text-neutral-950">{`${first_name} ${last_name}`}</div>
                    <div className="text-xs font-medium leading-none text-neutral-400">
                        {`${address.street} ${address.houseNumber}`}
                    </div>
                </div>
                <Link
                    className="gap-1 self-stretch px-4 py-2 mt-3.5 text-sm font-medium leading-none text-center text-white bg-indigo-600 rounded-md"
                    aria-label="View my profile"
                    href="/myProfile"
                >הפרופיל שלי
                </Link>
            </div>

            <nav className="flex text-center flex-col justify-between items-center mt-8 text-sm leading-none whitespace-nowrap bg-white min-h-[54px]">
                <Link
                    className={`${saved ? "text-gray-400" : "text-indigo-500"}`}
                    href="/home"
                >בית
                </Link>
                <Link
                    className={`${!saved ? "text-gray-400" : "text-indigo-500"}`}
                    href="/saved"
                >שמורים
                </Link>
            </nav>

            <section className="flex flex-col self-stretch pl-6 mt-8 w-full text-base text-neutral-950">
                {links.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className="flex justify-end gap-2 items-center pb-5 py-2 w-full">
                        <div
                            className={`self-stretch my-auto ${item.isActive ? "text-indigo-500" : ""}`}
                        >{item.text}
                        </div>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/24acf9bf6b6d6b7b96d2a34130f075c7cb5b6d35335de6e5f985ebc2d6a2c515?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611"
                            alt=""
                            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                        />
                    </Link>
                ))}
            </section>
        </main>
    );
};
