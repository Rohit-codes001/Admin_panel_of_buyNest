import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
    return (
        <div>
            <div className='flex items-center justify-between h-[56px] '>
                <img className='w-30 sm:w-50  px-2 py-2' src={assets.Admin_logo} alt="" />
                <button onClick={()=>(setToken(''))} className='py-2 px-6 bg-black text-white mx-2 rounded-2xl font-bold cursor-pointer'>Logout</button>
            </div>

        </div>
    )
}

export default Navbar
