import { Community } from '@/types/community.type'
import { FaArrowRightLong } from "react-icons/fa6";

import React from 'react'
interface CommunityCompProps {
  community: null | Community
  setCommunityToPresent: React.Dispatch<React.SetStateAction<Community | null>>;
  handleExitCommunity: (communityId: string)=>void;
}
const CommunityComp: React.FC<CommunityCompProps> = ({ community, setCommunityToPresent, handleExitCommunity }) => {
  if (!community)
    return null;
  function handleBack() {
    setCommunityToPresent(null);
  }
  return (
    <div>
      <FaArrowRightLong onClick={handleBack} className='cursor-pointer' />
      <h1 className='flex items-center justify-center '>{community.name}</h1>
      <div className='flex'>
        
        <button
          onClick={()=>handleExitCommunity(community._id)}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-500 justify-end cursor-pointer"
        >
          יציאה מהקבוצה
        </button>
      </div>
      {community.members.map((member) => {
        return (
          <section className="flex flex-wrap gap-8 items-start self-stretch w-full text-sm max-md:max-w-full mt-7 border-b border-solid border-b-slate-200 cursor-pointer p-4 rounded-md">
            <img src={member.profile_picture_url} alt="profile" className="w-10 h-10 rounded-full object-cover" />
            <h2 className=" inline">
              {`${member.first_name} ${member.last_name}`}
            </h2>
          </section>
        )
      })}
    </div>
  )
}

export default CommunityComp
