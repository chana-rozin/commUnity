import React, { useState } from 'react'
import GenericPopup from '../PopUp/GenericPopUp';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { CommunityFormSchema, CommunityForm } from './Forms'
import { ImageUpload } from '../uploadImage/uploadImage';
import { Community } from '@/types/community.type';
import useUserStore from "@/stores/userStore";
import { useCreateCommunity } from '@/services/mutations/communities';
import { toast } from "react-toastify";


interface AddCommunityProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCommunity: React.FC<AddCommunityProps> = ({ isOpen, setIsOpen }) => {

  const [imageUrl, setImageUrl] = useState<any>("");
  const { user, setUser } = useUserStore();
  const [error, setError] = useState<string>('');
  const createCommunityMutation = useCreateCommunity();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CommunityFormSchema>({ resolver: zodResolver(CommunityForm) });
  function onClose() {
    setIsOpen(false);
  }
  const onSubmit: SubmitHandler<CommunityFormSchema> = (data: any) => {
    if (!user || !user._id) {
      return;
    }
    const newCommunity: Community = {
      main: false,
      neighborhood: { _id: user.neighborhood._id },
      name: data.name,
      description: data.description,
      imageUrl: imageUrl,
      members: [{
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_picture_url: user.profile_picture_url
      }]
    }

    createCommunityMutation.mutate(newCommunity, {
      onSuccess: (res:any) => {
        console.log('Local onSuccess called:', res);
        const updatedUser = { ...user };
        updatedUser.communities.push({
          _id: res._id,
          name: newCommunity.name,
        });
        setUser(updatedUser);
        onClose();
      },
      onError: (err:any) => {
        setError(err);
        console.error(err instanceof Error ? err.message : "Failed to create post");
      },
    });
  }
  return (
    <GenericPopup title={'הוספת קהילה חדשה'} content={
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-11 gap-4 max-md:mt-10">
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-base text-right text-neutral-700">שם הקבוצה</label>
            <div className="flex overflow-hidden gap-1 items-center px-3 py-3 mt-1 w-full text-sm leading-none bg-white rounded-md border border-solid border-stone-300 min-h-[42px]">
              <input className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-500 outline-none"
                placeholder="שם הקבוצה"
                {...register("name")}
                type="text"
                id="name"
                name="name" />
            </div>
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="description" className="text-base text-right text-neutral-700">תיאור של הקבוצה</label>
            <div className="flex overflow-hidden gap-1 items-center px-3 py-3 mt-1 w-full text-sm leading-none bg-white rounded-md border border-solid border-stone-300 min-h-[42px]">
              <input
                placeholder="תיאור הקבוצה"
                {...register("description")}
                type='text'
                id="description"
                name="description"
                className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-500 outline-none"
              />
            </div>
            {errors.description && <span>{errors.description.message}</span>}
          </div>
        </div>
        <br />
        <p className="text-base text-right text-neutral-700">העלאת תמונת פרופיל קבוצתית</p>
        <ImageUpload setImageUrl={setImageUrl} />
        <br />
        <button
          type="submit"
          className={"gap-1 px-4 py-2 text-base font-medium text-center rounded-md w-full bg-indigo-600 text-white"}
        >הוספה
        </button>
        {error && <span>{error}</span>}

      </form>} isOpen={isOpen} onClose={onClose} />
  )
}

export default AddCommunity
