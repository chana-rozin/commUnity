import { useEffect, useState } from 'react';
import { Community } from '@/types/community.type'
import AddUserToCommunity from './AddUserToCommunity'
import { FaArrowRightLong } from "react-icons/fa6";
import SearchBar from './SearchBar'
import UpdateCommunity from './UpdateCommunity';
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";
import { useAddUserToCommunity } from '@/services/mutations/communities'


import React from 'react'
import { UserInCommunity } from '@/types/general.type';
interface CommunityCompProps {
  community: Community
  setCommunityToPresent: React.Dispatch<React.SetStateAction<Community | null>>;
  handleExitCommunity: (communityId: string) => void;
  addUserOptions: UserInCommunity[]
}
const CommunityComp: React.FC<CommunityCompProps> = ({ community, setCommunityToPresent, handleExitCommunity, addUserOptions }) => {
  const [addUserFormOpen, setAddUserFormOpen] = useState(false);
  const [updateCommunityFormOpen, setUpdateCommunityFormOpen] = useState(false);
  const [membersToPresent, setMembersToPresent] = useState(community?.members);
  const addUserToCommunityF = useAddUserToCommunity();
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
  function handleAddUserSubmit(user: UserInCommunity) {

    if(!community?._id){  
      return;
    }
      const communityId = community._id;
    addUserToCommunityF.mutate({userId:user._id, communityId:communityId},{
      onSuccess: (data:any) => {
        setAddUserFormOpen(false);
        toast.success(`${user.first_name} ${user.last_name} נוסף בהצלחה לקבוצת ${community.name}`);
      },
      onError: (error) => {
        toast.error(`שגיאה קרתה בהוספת ${user.first_name} ${user.last_name} לקבוצת ${community.name} , נסה שוב מאוחר יותר`);
      }
    })
  }
  return (
    <div>
      {updateCommunityFormOpen&&<UpdateCommunity community={community} isOpen={updateCommunityFormOpen} setIsOpen={setUpdateCommunityFormOpen} />}
      {addUserFormOpen && <AddUserToCommunity isOpen={addUserFormOpen} onClose={onAddUserFormClose} handleAddUserSubmit={handleAddUserSubmit} options={addUserOptions} />}
      <FaArrowRightLong onClick={handleBack} className='cursor-pointer' />
      <h1 className='flex items-center justify-center '>{community.name}</h1>
      <div className='flex'>
        <SearchBar 
          main={community.main}
          searchIcon="/path/to/search-icon.svg"
          onSearch={handleSearchChange}
          onAddEvent={() => setAddUserFormOpen(true)}
        />
        <button
          type="submit"
          className="g-neutral-100 text-indigo-900 p-3 rounded-full shadow-lg justify-end cursor-pointer bg-neutral-100 text-indigo-900"
          onClick={()=>setUpdateCommunityFormOpen(true)}
        > 
        עדכון פרטי קבוצה
        </button>
        {!community.main&&<button
          onClick={() => handleExitCommunity(community?._id||"")}
          className="hover:bg-[#901B22] bg-[#cf222e] text-white p-3 rounded-full shadow-lg justify-end cursor-pointer"
        >
          יציאה מהקבוצה
        </button>}
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
