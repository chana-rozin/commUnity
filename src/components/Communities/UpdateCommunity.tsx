import React, { useState } from 'react';
import GenericPopup from '../PopUp/GenericPopUp';
import { CommunityForm, CommunityFormSchema } from './Forms';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Community } from '@/types/community.type';
import { ImageUpload } from '../uploadImage/uploadImage';
interface UpdateCommunityProps {
    community: Community;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    updateCommunity: (data: any) => void; // Replace with the actual function to update community
}
const UpdateCommunity: React.FC<UpdateCommunityProps> = ({ community, isOpen, setIsOpen, updateCommunity }) => {
    const [imageUrl, setImageUrl] = useState(community.imageUrl);
    function onClose() {
        setIsOpen(false);
    }
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CommunityFormSchema>({
        resolver: zodResolver(CommunityForm), defaultValues: {
            name: community.name, // Replace with the actual default name
            description: community.description // Replace with the actual default description
        }
    });
    const onSubmit: SubmitHandler<CommunityFormSchema> = async (data) => {
        console.log('onSubmit');
        console.log(data);
        const updatedData:any = {}
        if(imageUrl!==){
            
        }
        updateCommunityFormSchema({})
    }
    return (
        <GenericPopup title={'עדכון הפרטים'} content={
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mt-11 gap-4 max-md:mt-10">
                    <div className="flex flex-col w-full">
                        <label htmlFor="name" className="text-base text-right text-neutral-700">שם הקבוצה</label>
                        <div className="flex overflow-hidden gap-1 items-center px-3 py-3 mt-1 w-full text-sm leading-none bg-white rounded-md border border-solid border-stone-300 min-h-[42px]">
                            {!community.main ? <input className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-500 outline-none"
                                placeholder="שם הקבוצה"
                                {...register("name")}
                                type="text"
                                id="name"
                                name="name" /> : <p>
                                {community.name}
                            </p>}
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
                <p className="text-base text-right text-neutral-700">תמונת פרופיל קבוצתית</p>
                <img loading="lazy" src={imageUrl} alt={`Profile picture of ${community.name}`} className="object-contain aspect-square w-[67px] rounded-full object-cover" />
                <ImageUpload setImageUrl={setImageUrl} />
                <br />
                <button
                    type="submit"
                    className={"gap-1 px-4 py-2 text-base font-medium text-center rounded-md w-full bg-indigo-600 text-white"}
                >עדכון
                </button>

            </form>} isOpen={isOpen} onClose={onClose} />
    )
}

export default UpdateCommunity;
