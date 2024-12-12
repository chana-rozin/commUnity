import * as React from "react";
import { ActiveLoan } from "./ActiveLoan";
import { Loan } from "@/types/loan.type";

const loans: Loan[] = [
  {
    _id: "1",
    lenderId: "user1",
    borrowerId: "674ed9fb04a9dba04cdfaea7",
    item: "2 שקיות חלב",
    createdDate: new Date("2023-12-01"),
    LoanDate: new Date("2023-12-01"),
    active: true,
    AuthorizedIds: [],
  },
  {
    _id: "2",
    lenderId: "674ed9fb04a9dba04cdfaea7",
    borrowerId: "user3",
    item: "קילו קמח",
    createdDate: new Date("2023-12-03"),
    LoanDate: new Date("2023-12-03"),
    active: true,
    AuthorizedIds: [],
  },
];

export function LoansNotificationsCard() {
  return (
    <div className="flex flex-col mt-4 w-full bg-white rounded-2xl">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-xl font-semibold text-black">השאלות פעילות</h2>
          <div className="text-xs text-neutral-500">
            {`${loans.length || 0} מושאל • ${loans.length || 0} שאול`}
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
      <div className="flex flex-col mt-4 ">
        {loans.map((loan) => (
          <ActiveLoan
            key={loan._id}
            {...loan}
          />
        ))}
      </div>
    </div>
  );
}
