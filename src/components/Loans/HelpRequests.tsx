"use client";
import React, { useState } from "react";
import { FaHeart, FaPlus } from "react-icons/fa";
import { ItemCard } from "./ItemCard";
import { useOpenLoansByCommunity, useLendItem, useCreateLoan } from "@/services/mutations/loans";
import { getTimeDifference } from "@/utils/dates";
import useUserStore from "@/stores/userStore";
import { Loan } from "@/types/loan.type";
import { AddForm } from "../Forms/AddForm";
import { z } from "zod";

const loanSchema = z.object({
  item: z.string().min(1, "יש להזין פריט"),
  createdDate: z.date(),
  borrowerId: z.string(),
  LoanDate: z.date().nullable(),
  active: z.boolean(),
  AuthorizedIds: z.array(z.string()),
});

export const HelpRequests: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const { data: helpRequests, isLoading, error } = useOpenLoansByCommunity(user?.neighborhoodId || "");
  const lendItemMutation = useLendItem();
  const createLoanMutation = useCreateLoan();

  const [isAddFormOpen, setAddFormOpen] = useState(false);

  if (isLoading) return <p>טוען בקשות עזרה...</p>;
  if (error) return <p className="text-red-500">שגיאה בטעינת בקשות עזרה</p>;

  const handleCreateLoan = (data: Partial<Loan>) => {
    createLoanMutation.mutate(data);
    setAddFormOpen(false);
  };

  return (
    <section className="relative">
      {/* Button for opening AddForm */}
      <button
        onClick={() => setAddFormOpen(true)}
        className="absolute top-5 left-5 bg-indigo-600 text-white p-3 rounded-full shadow-lg"
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
            borrowerId: user?._id,
            LoanDate: null,
            active: true,
            AuthorizedIds: user?.neighborhoodId ? [user?.neighborhoodId] : [],
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
              userName={request.borrowerId}
              address=""
              isBorrowed={false}
              buttonContent="מעוניין לעזור"
              ButtonIcon={FaHeart}
              onButtonClick={() =>
                lendItemMutation.mutate({
                  loanId: request._id,
                  user: user,
                })
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};
