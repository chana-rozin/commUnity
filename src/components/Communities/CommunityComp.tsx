import { useEffect, useState } from 'react';
import { Community } from '@/types/community.type'
import AddUserToCommunity from './AddUserToCommunity'
import { FaArrowRightLong } from "react-icons/fa6";
import SearchBar from '@/components/Events/SearchBar'

import React from 'react'
import { UserInCommunity } from '@/types/general.type';
interface CommunityCompProps {
  community: null | Community
  setCommunityToPresent: React.Dispatch<React.SetStateAction<Community | null>>;
  handleExitCommunity: (communityId: string) => void;
}
const CommunityComp: React.FC<CommunityCompProps> = ({ community, setCommunityToPresent, handleExitCommunity }) => {
  const [addUserFormOpen, setAddUserFormOpen] = useState(false)
  const [membersToPresent, setMembersToPresent] = useState(community?.members);
  useEffect(() => {

  }, [])
  if (!community)
    return null;
  function handleBack() {
    setCommunityToPresent(null);
  }
  function handleSearchChange(value: string) {
    let array: UserInCommunity[] = [];
    community?.members.forEach((member: UserInCommunity) => {
      const fullName = `${member.first_name} ${member.last_name}`
      if (fullName.toLowerCase().includes(value.toLowerCase())) {
        array.push(member)
      }
    })
    setMembersToPresent(array);
  }
  function onAddUserFormClose() {
    setAddUserFormOpen(false)
  }
  function handleAddUserSubmit(userId: string) {

  }
  return (
    <div>
      {addUserFormOpen && <AddUserToCommunity isOpen={addUserFormOpen} onClose={onAddUserFormClose} handleAddUserSubmit={handleAddUserSubmit} options={community.members} />}
      <FaArrowRightLong onClick={handleBack} className='cursor-pointer' />
      <h1 className='flex items-center justify-center '>{community.name}</h1>
      <div className='flex'>
        <SearchBar
          searchIcon="/path/to/search-icon.svg"
          onSearch={handleSearchChange}
          onAddEvent={() => setAddUserFormOpen(true)}
        />
        <button
          type="submit"
          className="text-white p-3 rounded-full shadow-lg justify-end cursor-pointer bg-neutral-100 text-indigo-900"
        >בואו נתחיל
        </button>
        <button
          onClick={() => handleExitCommunity(community._id)}
          className="hover:bg-[#901B22] bg-[#cf222e] text-white p-3 rounded-full shadow-lg justify-end cursor-pointer"
        >
          יציאה מהקבוצה
        </button>
      </div>
      {membersToPresent?.map((member) => {
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
