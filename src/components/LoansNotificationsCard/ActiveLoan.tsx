import * as React from "react";
import { Loan } from "@/types/loan.type";
import { getTimeDifference } from "@/utils/dates";
import useUserStore from "@/stores/userStore";

export const ActiveLoan: React.FC<Loan> = ({
  _id,
  lenderId,
  borrowerId,
  item,
  createdDate,
  LoanDate,
  active,
}) => {
  const user = useUserStore((state) => state.user);
  const isLender = user?._id === lenderId;
  const roleText = isLender ? "המשאיל" : "השואל";

  return (
    <div className="flex w-full items-center justify-between pb-2.5 border-b border-solid border-b-neutral-100 min-h-[61px]">
      {/* Left Section: Item Info */}
      <div className="flex flex-col flex-1 items-start pl-2">
        <div className="text-sm mb-1 font-medium leading-none text-neutral-950">
          {item}
        </div>
        <div className="text-xs leading-none text-gray-400">
          {`${roleText}: ${isLender ? borrowerId : lenderId}`}
        </div>
      </div>

      {/* Right Section: Time Difference */}
      <div className="flex items-center gap-1">
        <img
          loading="lazy"
          src={
            "https://cdn.builder.io/api/v1/image/assets/TEMP/1bd7943f9cd8cf6430654cdea38cf0282c2f1e92e5dc28dacc089e37e7dae0ff?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
          }
          alt=""
          className="object-contain shrink-0 w-3 aspect-square"
        />
        <div className="text-xs text-neutral-950 whitespace-nowrap">
        {LoanDate ? getTimeDifference(new Date(LoanDate)) : "תאריך לא זמין"}
        </div>
      </div>
    </div>
  );
};
