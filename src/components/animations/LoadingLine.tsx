import React from 'react'
import { Puff } from 'react-loader-spinner'

interface props{
    color: string
}
const LoadingLine: React.FC<props> = ({color})=> {
    return (
            <Puff
                visible={true}
                height="30"
                width="30"
                color={color?color:"#3f51b5"}
                ariaLabel="puff-loading"
            />
    )
}

export default LoadingLine;
