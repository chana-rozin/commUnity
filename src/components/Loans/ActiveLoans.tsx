import * as React from 'react';
import { ItemCard } from './ItemCard';
const borrowedItems = [
    {
      title: '3 ביצים M',
      daysAgo: 4,
      userName: 'דוד מרום',
      address: 'שד\' ירושלים 25',
      isBorrowed: true
    },
    {
      title: '3 ביצים M',
      daysAgo: 4,
      userName: 'דוד מרום',
      address: 'שד\' ירושלים 25',
      isBorrowed: true
    },
    {
      title: '3 ביצים M',
      daysAgo: 4,
      userName: 'דוד מרום',
      address: 'שד\' ירושלים 25',
      isBorrowed: true
    }
  ];
  
  const lentItems = [
    {
      title: '3 ביצים M',
      daysAgo: 4,
      userName: 'דוד מרום',
      address: 'שד\' ירושלים 25',
      isBorrowed: false
    },
    {
      title: '3 ביצים M',
      daysAgo: 4,
      userName: 'דוד מרום',
      address: 'שד\' ירושלים 25',
      isBorrowed: false
    },
    {
      title: '3 ביצים M',
      daysAgo: 4,
      userName: 'דוד מרום',
      address: 'שד\' ירושלים 25',
      isBorrowed: false
    }
  ];
export const ActiveLoans: React.FC = ({}) => {
  return (
  <section className="flex overflow-hidden flex-wrap gap-5 justify-center content-center items-center px-4 py-6 w-full bg-indigo-100 rounded-2xl min-h-[669px] max-md:max-w-full">
    <div className="flex overflow-hidden grow shrink items-center self-stretch px-4 py-px my-auto text-lg font-bold leading-10 bg-white rounded-2xl min-h-[43px] min-w-[240px] text-neutral-950 w-[686px] max-md:max-w-full">
      <h2 className="self-stretch my-auto min-h-[42px] w-[131px]">
        פריטים ששאלתי
      </h2>
    </div>
    
    {borrowedItems.map((item, index) => (
      <div key={`borrowed-${index}`} className="flex flex-wrap grow shrink gap-1.5 items-start self-stretch my-auto h-60 w-[184px]">
        <ItemCard {...item} onReturn={() => {}} />
      </div>
    ))}

    <div className="flex overflow-hidden grow shrink items-center self-stretch px-4 my-auto text-lg font-bold leading-10 bg-white rounded-2xl min-h-[42px] min-w-[240px] text-neutral-950 w-[683px] max-md:max-w-full">
      <h2 className="self-stretch my-auto min-h-[42px]">
        פריטים שהשאלתי
      </h2>
    </div>

    {lentItems.map((item, index) => (
      <div key={`lent-${index}`} className="flex flex-wrap grow shrink gap-1.5 items-start self-stretch my-auto h-60 w-[184px]">
        <ItemCard {...item} onRemind={() => {}} />
      </div>
    ))}
  </section>
  );
};