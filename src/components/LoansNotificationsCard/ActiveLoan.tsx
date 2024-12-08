import * as React from "react";
import {Loan} from '@/types/loan.type'
import { getTimeDifference } from "@/utils/dates";
import useUserStore from "@/stores/userStore";

export const ActiveLoan: React.FC<Loan> = ({
  _id,
  lenderID,
  borrowerID,
  item,
  createdDate,
  LoanDate,
  active,
}) => {
  const user = useUserStore((state) => state.user);
  const isLender = user?._id === lenderID;
  const roleText = isLender ? "המשאיל" : "השואל";

  return (
    <div className="flex w-full">
      <div className="flex flex-auto justify-between items-center pb-2.5 border-b border-solid border-b-neutral-100 min-h-[61px]">
        <div className="flex flex-col flex-1 shrink items-start self-stretch pl-2 my-auto w-full basis-0 min-w-[240px]">
          <div className="text-sm mb-1 font-medium leading-none text-neutral-950">
            {item}
          </div>
          <div className="text-xs leading-none text-gray-400">
            {`${roleText}: ${isLender ? borrowerID : lenderID}`}
          </div>
        </div>
      </div>
      <div className="flex z-10 gap-1 justify-center items-center my-auto mr-0 text-xs leading-none text-neutral-950">
        <img
          loading="lazy"
          src={"https://cdn.builder.io/api/v1/image/assets/TEMP/1bd7943f9cd8cf6430654cdea38cf0282c2f1e92e5dc28dacc089e37e7dae0ff?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"}
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
        />
        <div className="self-stretch my-auto">{getTimeDifference(LoanDate)}</div>
      </div>
    </div>
  );
};