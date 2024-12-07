import React from 'react'
import logo from "../images/logo.png"

const TheHeader = () => {
  return (
    <div className='absolute top-0 rounded-full left-0 p-2 flex items-center gap-2'>
        <span>
          <img src={logo} alt="logo" className='w-6'/>
        </span>
        <p className='text-textpara font-semibold tracking-widest'>PHOTO<span className='text-accent1'>PIX</span></p>
    </div>
  )
}

export default TheHeader