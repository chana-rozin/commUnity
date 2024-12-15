import * as React from "react";
import { ActiveLoan } from "./ActiveLoan";
import { useActiveLoansByUser } from '@/services/mutations/loans';
import useUserStore from '@/stores/userStore';
import { NoLoansSection } from "../Loans/NoLoansSection"; 

export function LoansNotificationsCard() {
  const user = useUserStore((state) => state.user);
  const { data: activeLoans, isLoading, error } = useActiveLoansByUser(user?._id || '');
  
  const borrowedItems = activeLoans?.filter(loan => loan.borrowerId === user?._id) || [];
  const lentItems = activeLoans?.filter(loan => loan.lenderId === user?._id) || [];
  

  return (
    <div className="flex flex-col mt-4 w-full bg-white rounded-2xl">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-xl font-semibold text-black">השאלות פעילות</h2>
          <div className="text-xs text-neutral-500">
            {`${lentItems.length || 0} מושאל • ${borrowedItems.length || 0} שאול`}
          </div>
        </div>
        <button
          className="self-center px-6 py-2 text-sm font-medium text-indigo-600 bg-violet-50 border border-violet-300 rounded-full whitespace-nowrap"
          onClick={() => {
            window.location.href = "/neighborhood-help/loans";
          }}
        >
          צפה בהכל
        </button>

      </div>
      <div className="flex flex-col mt-4">
        {isLoading && <p className="text-center text-gray-500">טוען השאלות...</p>}
        {error && <p className="text-center text-red-500">שגיאה בטעינת הנתונים</p>}
        {activeLoans?.length ? (
          activeLoans?.map((loan) => (
            <ActiveLoan key={loan._id} {...loan} />
          ))
        ) : (
          !isLoading && (
            <NoLoansSection
              title="אין השאלות פעילות"
              description="כרגע אין לך פריטים מושאלים או שאולים."
            />
          )
        )}
      </div>
    </div>
  );
}
