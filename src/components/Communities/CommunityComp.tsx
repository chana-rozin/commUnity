import { useEffect, useState, useRef } from 'react';
import { Community } from '@/types/community.type'
import AddUserToCommunity from './AddUserToCommunity'
import { MdKeyboardArrowRight } from "react-icons/md";
import SearchBar from './SearchBar'
import UpdateCommunity from './UpdateCommunity';
import useUserStore from "@/stores/userStore";
import { toast } from "react-toastify";
import { useDeleteUserFromCommunity, useUpdateCommunity, useSendInvitation } from '@/services/mutations/communities'
import SweetAlert from "react-bootstrap-sweetalert";
import { FiEdit2 } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";




import React from 'react'
import { CommunityInUser, UserInCommunity } from '@/types/general.type';
interface CommunityCompProps {
  community: Community
  setCommunityToPresent: React.Dispatch<React.SetStateAction<Community | null>>;
  usersInNeighborhood: UserInCommunity[]
}
const CommunityComp: React.FC<CommunityCompProps> = ({ community, setCommunityToPresent, usersInNeighborhood }) => {
  const { user, setUser } = useUserStore();
  const [addUserFormOpen, setAddUserFormOpen] = useState(false);
  const [updateCommunityFormOpen, setUpdateCommunityFormOpen] = useState(false);
  const [membersToPresent, setMembersToPresent] = useState(community?.members);
  const popupRef = useRef<HTMLDivElement>(null);
  const [memberToAdd, setMemberToAdd] = useState<UserInCommunity[]>(() => {
    const users: UserInCommunity[] = [];
    usersInNeighborhood.forEach((us) => {
      if (community.members.findIndex((u) => u._id === us._id) === -1) {
        users.push(us);
      }
    });
    return users;
  });
  const deleteUserFromCommunityF = useDeleteUserFromCommunity();
  const sendInvitation = useSendInvitation()
  const updateCommunity = useUpdateCommunity();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

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

    if (!community?._id) {
      return;
    }
    const communityId = community._id;
    sendInvitation.mutate({ communityId, communityName: community.name, senderId: user._id, receiverId: user._id }, {
      onSuccess: () => {
        setAddUserFormOpen(false);
        toast.success(`הזמנה להצטרפות נשלחה ל${user.first_name} ${user.last_name} בהצלחה!`);
      },
      onError: (error) => {
        toast.error(`שגיאה התרחשה במהלך שליחת ההזמנה להצטרפות ל ${user.first_name} ${user.last_name}, נסה שוב מאוחר יותר!`)
      }
    })
    
  }
  function handleExitCommunity() {
    if (!community?._id || !user?._id) {
      return;
    }
    const communityId = community._id;
    deleteUserFromCommunityF.mutate({ userId: user?._id, communityId: communityId }, {
      onSuccess: (data: any) => {
        debugger
        const updatedUser = { ...user };
        setDeleteAlert(false);
        updatedUser.communities = updatedUser.communities.filter((com: CommunityInUser) => com._id !== communityId);
        setUser(updatedUser);
        setCommunityToPresent(null)
      },
      onError: (error) => {
        toast.error(`שגיאה קרתה בהוספת ${user.first_name} ${user.last_name} לקבוצת ${community.name} , נסה שוב מאוחר יותר`);
      }
    })
  }
  async function hanleUpdateCommunity(data: any) {
    const communityId: string = community._id || "";
    updateCommunity.mutate(
      { data, communityId },
      {
        onSuccess: () => {
          setCommunityToPresent(null);
          setUpdateCommunityFormOpen(false);
          toast.success('הקבוצה עודכנה בהצלחה');
        },
        onError: (error) => {
          toast.error(`קרתה תקלה בעדכון הקבוצה!`)
        },
      }
    );
  };
  if (!community)
    return null;
  return (
    <div>
      {updateCommunityFormOpen && <UpdateCommunity community={community} isOpen={updateCommunityFormOpen} setIsOpen={setUpdateCommunityFormOpen} updateCommunity={hanleUpdateCommunity} />}
      {addUserFormOpen && <AddUserToCommunity isOpen={addUserFormOpen} onClose={onAddUserFormClose} handleAddUserSubmit={handleAddUserSubmit} options={memberToAdd} />}
      {deleteAlert && <SweetAlert
        warning
        showCancel
        confirmBtnText="כן!"
        cancelBtnText="!לא"
        title={`לצאת מהקבוצה ${community.name} ?`}
        onConfirm={() => handleExitCommunity()}
        onCancel={() => setDeleteAlert(false)}
        focusCancelBtn
      />}
      {confirmMessage}

      <div className="flex items-center gap-3 mt-2">
        <MdKeyboardArrowRight
          onClick={handleBack}
          className="mr-2 mt-1 text-3xl text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors"
        />
        <h1 className="text-3xl font-bold text-gray-800">{community.name}</h1>
      </div>
      <div className="flex items-center justify-center gap-4 mb-8">
        <SearchBar
          main={community.main}
          searchIcon="/path/to/search-icon.svg"
          onSearch={handleSearchChange}
          onAddEvent={() => setAddUserFormOpen(true)}
          placeholder="חפש חבר קהילה.."
        />
        <div className="flex items-center justify-center gap-2 px-4 py-4 text-violet-700 rounded-full "
        >
          <p
            className="flex gap-2 g-neutral-100 text-indigo-900 p-3 rounded-full justify-end cursor-pointer  text-indigo-900"
            onClick={() => setUpdateCommunityFormOpen(true)}
          >
                                <FiEdit2 />

            עדכון פרטי קהילה
          </p>
        </div>
        {!community.main &&
          <div className="flex items-center justify-center gap-2 px-4 py-4 text-violet-700 rounded-full "
          ><p
            onClick={() => setDeleteAlert(true)}
            className="flex gap-2 hover:text-[#901B22] text-[#cf222e] p-3  cursor-pointer"
          >
              <IoExitOutline />

              יציאה מהקהילה
            </p></div>}
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
