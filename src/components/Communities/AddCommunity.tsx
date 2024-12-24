import React, {useState} from 'react'
import GenericPopup from '../PopUp/GenericPopUp';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCommunityFormSchema, AddCommunityForm } from './AddCommunityForm'
import { ImageUpload } from '../uploadImage/uploadImage';
interface AddCommunityProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddFormSubmit: () => void;
}

const AddCommunity: React.FC<AddCommunityProps> = ({ isOpen, handleAddFormSubmit, setIsOpen }) => {
  const [imageUrl, setImageUrl] = useState<any>("");
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AddCommunityFormSchema>({ resolver: zodResolver(AddCommunityForm) });
  const [showPassword, setShowPassword] = React.useState(false);
  const communityFields = [
    { name: "name", label: "שם הקהילה", disabled: false },
    { name: "description", label: "תיאור", disabled: false }
  ] as const;
  function onClose() {
    setIsOpen(false);
  }
  return (
    <GenericPopup title={'הוספת קהילה חדשה'} content={
      <form>
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
      <ImageUpload  setImageUrl={setImageUrl}/>
        <br />
        <button
          type="submit"
          className={"gap-1 px-4 py-2 text-base font-medium text-center rounded-md w-full bg-indigo-600 text-white"}
        >הוספה
        </button>

      </form>} isOpen={isOpen} onClose={onClose} />
  )
}

export default AddCommunity
