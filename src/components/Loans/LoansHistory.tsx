"use client";
import React from "react";
import useUserStore from '@/stores/userStore';
import { useLoansHistoryByUser } from '@/services/mutations/loans';
import { ItemCard } from './ItemCard'; 
import { Loan } from "@/types/loan.type";
import { NoLoansSection } from "./NoLoansSection";

export const LoansHistory: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const { data: loansHistory, isLoading, error } = useLoansHistoryByUser(user?._id || "");
  const borrowedItems = loansHistory?.filter(loan => loan.borrowerId === user?._id) || [];
  const lentItems = loansHistory?.filter(loan => loan.lenderId === user?._id) || [];
  
  if (isLoading) return <div>טוען פריטים...</div>;
  if (error) return <div>שגיאה בטעינת הלוואות</div>;
  


  return (
    <section className="flex overflow-hidden flex-wrap gap-5 justify-center content-center items-center px-4 py-6 w-full bg-indigo-100 rounded-2xl min-h-[669px] max-md:max-w-full">
      {/* Borrowed Items Section */}
      <div className="flex overflow-hidden grow shrink items-center self-stretch px-4 py-px my-auto text-lg font-bold leading-10 bg-white rounded-2xl min-h-[43px] min-w-[240px] text-neutral-950 w-[686px] max-md:max-w-full">
        <h2 className="self-stretch my-auto min-h-[42px]">
           פריטים ששאלתי בעבר
        </h2>
      </div>
      
      {borrowedItems.length > 0 ? (
        borrowedItems.map((item: Loan) => (
          <div key={item._id} className="flex flex-wrap grow shrink gap-1.5 items-start self-stretch my-auto h-60 w-[184px]">
            <ItemCard 
              title={item.item}
              daysAgo={Math.ceil((new Date().getTime() - new Date(item.LoanDate).getTime()) / (1000 * 3600 * 24))}
              userName={item.lenderId || ''}
              address=""
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
          <div key={item._id} className="flex flex-wrap grow shrink gap-1.5 items-start self-stretch my-auto h-60 w-[184px]">
            <ItemCard 
              title={item.item}
              daysAgo={Math.ceil((new Date().getTime() - new Date(item.LoanDate).getTime()) / (1000 * 3600 * 24))}
              userName={item.borrowerId}
              address=""
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
