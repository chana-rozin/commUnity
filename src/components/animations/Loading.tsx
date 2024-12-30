import React from 'react'
import { Puff } from 'react-loader-spinner'
import style from './styles.module.css'

interface props{
    height: string;
    size?: number,
    color?: string,
    type?: string,
    visible?: boolean,
    children?: React.ReactNode,
}
const Loading: React.FC<props> = ({height}) => {
    return (
        <div className={`${style.container} ${height==='low'?style.low:style.high}`}>
            <Puff
                visible={true}
                height="80"
                width="60"
                color="#3f51b5"
                ariaLabel="puff-loading"
            />
        </div>
    )
}

export default Loading