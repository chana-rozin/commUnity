"use client";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { ItemCard } from './ItemCard';
import { useOpenLoansByCommunity, useLendItem } from '@/services/mutations/loans';
import useUserStore from '@/stores/userStore';
import { Loan } from '@/types/loan.type';

export const HelpRequests: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const { data: helpRequests, isLoading, error } = useOpenLoansByCommunity(user?.neighborhoodId || "");
  const lendItemMutation = useLendItem();

  if (isLoading) return (
    <section className="flex flex-wrap gap-5 justify-center items-center px-4 py-6 w-full bg-indigo-100 rounded-2xl min-h-[669px] max-md:max-w-full">
      <p className="text-neutral-700">טוען בקשות עזרה...</p>
    </section>
  );

  if (error) return (
    <section className="flex flex-wrap gap-5 justify-center items-center px-4 py-6 w-full bg-indigo-100 rounded-2xl min-h-[669px] max-md:max-w-full">
      <p className="text-red-500">שגיאה בטעינת בקשות עזרה</p>
    </section>
  );

  return (
    <section className="flex overflow-hidden flex-wrap gap-5 justify-start content-start items-center px-4 py-6 w-full bg-indigo-100 rounded-2xl min-h-[669px] max-md:max-w-full">
      {helpRequests && helpRequests.length > 0 ? (
        helpRequests.map((request: Loan) => (
          <div 
            key={request._id} 
            className="flex flex-wrap grow shrink gap-1.5 items-start self-stretch my-auto h-60 w-[184px]"
          >
            <ItemCard 
              title={request.item}
              daysAgo={Math.ceil((new Date().getTime() - new Date(request.createdDate).getTime()) / (1000 * 3600 * 24))}
              userName={request.borrowerId}
              address=""
              isBorrowed={false}
              buttonContent="מעוניין לעזור"
              ButtonIcon={FaHeart}
              onButtonClick={() => lendItemMutation.mutate({ 
                loanId: request._id,
                user: user
              })}
            />
          </div>
        ))
      ) : (
        <p className="text-neutral-700">אין בקשות לעזרה כרגע.</p>
      )}
    </section>
  );
};
