import React, { useEffect, useState } from "react";
import { ActiveLoan } from "./ActiveLoan";
import { useActiveLoansByUser } from "@/services/mutations/loans";
import useUserStore from "@/stores/userStore";
import { NoLoansSection } from "../Loans/NoLoansSection";
import { pusherClient } from '@/services/pusher';

export function LoansNotificationsCard() {
  const user = useUserStore((state) => state.user);
  const { data: activeLoans, isLoading, error } = useActiveLoansByUser(user?._id || "");
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const channel = pusherClient.subscribe(`user-${user?._id}`);

    // Listen for loan reminders
    channel.bind("loan-reminder", (data: { message: string }) => {
      setNotifications((prev) => [...prev, data.message]);
    });

    return () => {
      pusherClient.unsubscribe(`user-${user?._id}`);
    };
  }, [user?._id]);

  const borrowedItems = activeLoans?.filter((loan) => loan.borrower._id === user?._id) || [];
  const lentItems = activeLoans?.filter((loan) => loan.lender?._id === user?._id) || [];

  return (
    <div className="flex flex-col mt-4 w-full bg-white rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-xl font-semibold text-black">השאלות פעילות</h2>
          <div className="text-xs text-neutral-500">
            {`${lentItems.length || 0} מושאל • ${borrowedItems.length || 0} שאול`}
          </div>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="bg-yellow-100 p-2 rounded-md mb-4">
          {notifications.map((note, index) => (
            <p key={index} className="text-yellow-700 text-sm">
              {note}
            </p>
          ))}
        </div>
      )}

      {/* Active Loans */}
      <div className="flex flex-col mt-4">
        {isLoading && <p className="text-center text-gray-500">טוען השאלות...</p>}
        {error && <p className="text-center text-red-500">שגיאה בטעינת הנתונים</p>}
        {activeLoans?.length ? (
          activeLoans?.map((loan) => <ActiveLoan key={loan._id} {...loan} />)
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
