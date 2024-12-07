import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const Btn = ({text, loading , className = '', onClick}) => {
  return (
    <button className={`py-2 px-2 w-full rounded flex items-center gap-2 justify-center ${className}`}
    onClick={onClick}
    >
        {loading && (
            <AiOutlineLoading3Quarters className='animate-spin text-white'/>
        )}
        <p className='text-white text-sm font-medium'>{text}</p>
    </button>
  )
}

export default Btn