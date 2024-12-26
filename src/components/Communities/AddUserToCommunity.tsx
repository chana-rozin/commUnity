import React, { useEffect } from 'react'
import GenericPopup from '../PopUp/GenericPopUp'
import Select, { SingleValue } from 'react-select';
import { UserInCommunity } from '@/types/general.type'

interface AddUserToCommunityProps {
    isOpen: boolean; 
    onClose: () => void;
    options: UserInCommunity[];
    handleAddUserSubmit: (userId:string) => void;
}
const AddUserToCommunity: React.FC<AddUserToCommunityProps> = ({ isOpen, onClose, options, handleAddUserSubmit }) => {
    let option = options.map(option =>
        ({value: option._id, label: `${option.first_name} ${option.last_name}`})
    )
    useEffect(()=>{
    },[])
    const [selectedOption, setSelectedOption] = React.useState<SingleValue<{ value: string; label: string }>>(null);
    const [error, setError] = React.useState<null|string>(null);
    const handleChange = (selected: any) => {
        setError(null);
        setSelectedOption(selected);
    }
    function onSubmit(){
        if(!selectedOption){
            setError('אופס, שכחת לבחור את מי להוסיף');
            return;
        }
        handleAddUserSubmit(selectedOption.value)
    }

    return (
        <GenericPopup title={'הוספת משתמש לקהילה'} content={<div>
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
            >הוספה
            </button>
        </div>} isOpen={isOpen} onClose={onClose} />
    )
}

export default AddUserToCommunity
