import React, { useEffect, useState } from 'react'
import GenericPopup from '../PopUp/GenericPopUp'
import Select, { SingleValue } from 'react-select';
import { UserInCommunity } from '@/types/general.type'
import LoadingLine from '../animations/LoadingLine';
import LoadingPopUp from '../animations/LoadingPopUp';

interface AddUserToCommunityProps {
    isOpen: boolean; 
    onClose: () => void;
    options: UserInCommunity[];
    handleAddUserSubmit: (userId:UserInCommunity) => void;
}
const AddUserToCommunity: React.FC<AddUserToCommunityProps> = ({ isOpen, onClose, options, handleAddUserSubmit }) => {
    const [loading, setLoading] = useState(false);
    let option = options.map((option:UserInCommunity) =>
        ({value: option, label: `${option.first_name} ${option.last_name}`})
    )
    useEffect(()=>{
    },[])
    const [selectedOption, setSelectedOption] = React.useState<SingleValue<{ value: UserInCommunity; label: string }>>(null);
    const [error, setError] = React.useState<null|string>(null);
    const handleChange = (selected: any) => {
        setError(null);
        setSelectedOption(selected);
    }
    function onSubmit(){
        setLoading(true);
        if(!selectedOption){
            setError('אופס, שכחת לבחור את מי להוסיף');
            return;
        }
        handleAddUserSubmit(selectedOption.value)
        setLoading(false);
    }

    return (
        <GenericPopup title={'הוספת משתמש לקהילה'} content={<div>
            <LoadingPopUp isOpen={loading}/>
            <Select
                options={option}
                value={selectedOption}
                onChange={handleChange}
                placeholder="בחר משתמש מהשכונה שלך"
                isSearchable
            />
            {error && <span>{error}</span>}
            <br />
            <button
                onClick={onSubmit}
                className={"gap-1 px-4 py-2 text-base font-medium text-center rounded-md w-full bg-indigo-600 text-white"}
            >{<p>הוספה</p>}
            </button>
        </div>} isOpen={isOpen} onClose={onClose} />
    )
}

export default AddUserToCommunity
