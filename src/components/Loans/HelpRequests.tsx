"use client";
import React, { useState } from "react";
import { FaHeart, FaPlus } from "react-icons/fa";
import { ItemCard } from "./ItemCard";
import { useOpenLoansByCommunity, useLendItem, useCreateLoan } from "@/services/mutations/loans";
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
      <button
        onClick={() => setAddFormOpen(true)}
        className="absolute top-2 right-2 bg-indigo-600 text-white p-3 rounded-full shadow-lg"
      >
        <FaPlus />
      </button>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {helpRequests?.map((request: Loan) => (
          <ItemCard
            key={request._id}
            title={request.item}
            daysAgo={Math.ceil((new Date().getTime() - new Date(request.createdDate).getTime()) / (1000 * 3600 * 24))}
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
    </section>
  );
};
