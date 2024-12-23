"use client";
import React, { useState } from "react";
import { FaHeart, FaPlus } from "react-icons/fa";
import { ItemCard } from "./ItemCard";
import { useOpenLoansByCommunity, useOfferHelp, useCreateLoan } from "@/services/mutations/loans";
import { getTimeDifference } from "@/utils/dates";
import useUserStore from "@/stores/userStore";
import { Loan } from "@/types/loan.type";
import { AddForm } from "../Forms/AddForm";
import { z } from "zod";

const loanSchema = z.object({
  item: z.string().min(1, "יש להזין פריט"),
  createdDate: z.date(),
  borrower: z.string(),
  LoanDate: z.date().nullable(),
  active: z.boolean(),
  AuthorizedIds: z.array(z.string()),
});

export const HelpRequests: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const { data: helpRequests, isLoading, error } = useOpenLoansByCommunity(user?.neighborhood._id || "");
  const offerHelpMutation = useOfferHelp();
  const createLoanMutation = useCreateLoan();

  const [isAddFormOpen, setAddFormOpen] = useState(false);

  if (isLoading) return <p>טוען בקשות עזרה...</p>;
  if (error) return <p className="text-red-500">שגיאה בטעינת בקשות עזרה</p>;

  const handleCreateLoan = (data: Partial<any>) => {
    createLoanMutation.mutate(data);
    setAddFormOpen(false);
  };

  return (
    <section className="relative">
      {/* Button for opening AddForm */}
      <button
        onClick={() => setAddFormOpen(true)}
        className="absolute top-7 left-5 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-500"
      >
        <FaPlus />
      </button>

      {/* AddForm */}
      {isAddFormOpen && (
        <AddForm
          schema={loanSchema}
          initialValues={{}}
          hiddenFields={{
            createdDate: new Date(),
            borrower: user?._id,
            LoanDate: null,
            active: true,
            AuthorizedIds: user?.neighborhood._id ? [user?.neighborhood._id] : [],
          }}
          onSubmit={handleCreateLoan}
          title="הוספת בקשת השאלה"
          isOpen={true}
          onClose={() => setAddFormOpen(false)}
        />
      )}
      <div className="flex overflow-hidden flex-wrap gap-5 justify-start content-start items-center px-4 py-6 w-full bg-indigo-100 rounded-2xl min-h-[669px] max-md:max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {helpRequests?.map((request: Loan) => (
            <ItemCard
              key={request._id}
              title={request.item}
              daysAgo={getTimeDifference(request.createdDate)}
              userName={`${request.borrower.first_name} ${request.borrower.last_name}`}
              address={`${request.borrower.address.street} ${request.borrower.address.houseNumber}`}
              isBorrowed={false}
              buttonContent="מעוניין לעזור"
              ButtonIcon={FaHeart}
              onButtonClick={() =>
                offerHelpMutation.mutate({
                  loanId: request._id,
                  lenderId: user?._id || "",
                  borrowerId: request.borrower._id
                })
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};
