import * as React from 'react'; 
import { FaRegBell, FaArrowLeft } from 'react-icons/fa';
import { ItemCard } from './ItemCard'; 
import { NoLoansSection } from "./NoLoansSection";
import { useActiveLoansByUser, useReturnLoan, useRemindBorrower } from '@/services/mutations/loans';
import useUserStore from '@/stores/userStore'; 
import { getTimeDifference } from "@/utils/dates";
import { Loan } from '@/types/loan.type';
import Loading from '@/components/animations/Loading';


export const ActiveLoans: React.FC = ({}) => {
  const user = useUserStore((state) => state.user);
  const { data: activeLoans, isLoading, error } = useActiveLoansByUser(user?._id || '');
  const returnLoanMutation = useReturnLoan();
  const remindBorrowerMutation = useRemindBorrower(); 
  const borrowedItems = activeLoans?.filter(loan => loan.borrower._id === user?._id) || [];
  const lentItems = activeLoans?.filter(loan => loan.lender?._id === user?._id) || [];
  console.log(borrowedItems);
  if (isLoading) return <Loading height='Low'/>;
  if (error) return <div>שגיאה בטעינת הלוואות</div>;
  
  return (
    <section className="flex overflow-hidden flex-wrap gap-5 px-4 py-6 w-full bg-indigo-100 rounded-2xl min-h-[669px] max-md:max-w-full">
      {/* Borrowed Items Section */}
      <div className="flex overflow-hidden grow shrink items-center self-stretch px-4 py-px my-auto text-lg font-bold leading-10 bg-white rounded-2xl min-h-[43px] min-w-[240px] text-neutral-950 w-[686px] max-md:max-w-full">
        <h2 className="self-stretch my-auto min-h-[42px] w-[131px]">
          פריטים ששאלתי
        </h2>
      </div>
      
      {borrowedItems.length > 0 ? (
        borrowedItems.map((item) => (
          <div key={item._id} className="flex flex-wrap shrink gap-1.5 items-start self-stretch my-auto h-60 w-[220px]">
            <ItemCard 
              title={item.item}
              daysAgo={getTimeDifference(item.LoanDate || new Date())}
              userName={item.lender?`${item.lender?.first_name} ${item.lender?.last_name}`:undefined}
              address={`${item.lender?.address.street} ${item.lender?.address.houseNumber}`}
              isBorrowed={true}
              buttonContent={item.lender ? "החזרתי!" : "בטל השאלה" }
              ButtonIcon={FaArrowLeft}
              onButtonClick={() => returnLoanMutation.mutate({
                loanId: item._id,
                userId: user?._id || ''
              })}
            />
          </div>
        ))
      ) : (
        <NoLoansSection 
          title="אין הלוואות פעילות" 
          description="כרגע אין פריטים ששאלת מאחרים" 
        />
      )}

      {/* Lent Items Section */}
      <div className="flex overflow-hidden grow shrink items-center self-stretch px-4 my-auto text-lg font-bold leading-10 bg-white rounded-2xl min-h-[42px] min-w-[240px] text-neutral-950 w-[683px] max-md:max-w-full">
        <h2 className="self-stretch my-auto min-h-[42px]">
          פריטים שהשאלתי
        </h2>
      </div>
      
      {lentItems.length > 0 ? (
        lentItems.map((item:Loan) => (
          <div key={item._id} className="flex flex-wrap shrink gap-1.5 items-start self-stretch my-auto h-60 w-[220px]">
            <ItemCard 
              title={item.item}
              daysAgo={getTimeDifference(item.LoanDate || new Date())}
              userName={`${item.borrower.first_name} ${item.borrower.last_name}`}
              address={`${item.borrower.address.street} ${item.borrower.address.houseNumber}`}
              isBorrowed={false}
              buttonContent="שלח תזכורת"
              ButtonIcon={FaRegBell}
              onButtonClick={() => remindBorrowerMutation.mutate({ 
                loanId: item._id,
                lenderId: item.lender?._id || '',
                borrowerId: item.borrower._id,
                item: item.item,
                lenderName:`${item.lender?.first_name} ${item.lender?.last_name}`
              })}
              />
          </div>
        ))
      ) : (
        <NoLoansSection 
          title="אין השאלות פעילות" 
          description="כרגע אין פריטים שהשאלת לאחרים" 
        />
      )}
    </section>
  );
};