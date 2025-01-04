import GenericPopUp from "../PopUp/GenericPopUp";
import Loading from "./Loading";
import React from 'react'

const LoadingPopUp:React.FC<{isOpen:boolean}> = ({isOpen}) => {
    return (
        <GenericPopUp title="" content={<Loading height="high"/>} isOpen={isOpen} onClose={()=>{}}/>
    )
}

export default LoadingPopUp
