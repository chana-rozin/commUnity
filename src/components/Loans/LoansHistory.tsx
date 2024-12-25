"use client";
import React from "react";
import useUserStore from '@/stores/userStore';
import { useLoansHistoryByUser } from '@/services/mutations/loans';
import { getTimeDifference } from "@/utils/dates";
import { ItemCard } from './ItemCard'; 
import { Loan } from "@/types/loan.type";
import { NoLoansSection } from "./NoLoansSection";

export const LoansHistory: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const { data: loansHistory, isLoading, error } = useLoansHistoryByUser(user?._id || "");
  const borrowedItems = loansHistory?.filter(loan => loan.borrower._id === user?._id) || [];
  const lentItems = loansHistory?.filter(loan => loan.lender?._id === user?._id) || [];
  
  if (isLoading) return <div>טוען פריטים...</div>;
  if (error) return <div>שגיאה בטעינת הלוואות</div>;
  


  return (
    <section className="flex overflow-hidden flex-wrap gap-5 px-4 py-6 w-full bg-indigo-100 rounded-2xl min-h-[669px] max-md:max-w-full">
      {/* Borrowed Items Section */}
      <div className="flex overflow-hidden grow shrink items-center self-stretch px-4 py-px my-auto text-lg font-bold leading-10 bg-white rounded-2xl min-h-[43px] min-w-[240px] text-neutral-950 w-[686px] max-md:max-w-full">
        <h2 className="self-stretch my-auto min-h-[42px]">
           פריטים ששאלתי בעבר
        </h2>
      </div>
      
      {borrowedItems.length > 0 ? (
        borrowedItems.map((item: Loan) => (
          <div key={item._id} className="flex flex-wrap shrink gap-1.5 items-start self-stretch my-auto h-50 w-[220px]">
            <ItemCard 
              title={item.item}
              daysAgo={getTimeDifference(item.LoanDate || new Date)}
              userName={`${item.lender?.first_name} ${item.lender?.last_name}` || undefined}
              address={`${item.lender?.address.street} ${item.lender?.address.houseNumber}`}
              isBorrowed={true}
            />
          </div>
        ))
      ) : (
        <NoLoansSection 
          title="אין היסטוריית שאילות" 
          description="כרגע אין פריטים ששאלת מאחרים" 
        />
      )}

      {/* Lent Items Section */}
      <div className="flex overflow-hidden grow shrink items-center self-stretch px-4 my-auto text-lg font-bold leading-10 bg-white rounded-2xl min-h-[42px] min-w-[240px] text-neutral-950 w-[683px] max-md:max-w-full">
        <h2 className="self-stretch my-auto min-h-[42px]">
          פריטים שהשאלתי בעבר
        </h2>
      </div>
      
      {lentItems.length > 0 ? (
        lentItems.map((item: Loan) => (
          <div key={item._id} className="flex flex-wrap shrink gap-1.5 items-start self-stretch my-auto h-60 w-[220px]">
            <ItemCard 
              title={item.item}
              daysAgo={getTimeDifference(item.LoanDate || new Date)}
              userName={`${item.borrower.first_name} ${item.borrower.last_name}`}
              address={`${item.borrower.address.street} ${item.borrower.address.houseNumber}`}
              isBorrowed={false}
            />
          </div>
        ))
      ) : (
        <NoLoansSection 
          title="אין היסטוריית השאלות " 
          description="כרגע אין פריטים שהשאלת לאחרים" 
        />
      )}
    </section>
  );
};
