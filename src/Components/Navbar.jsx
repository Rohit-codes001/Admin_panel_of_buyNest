import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
    return (
        <div>
            <div className='flex items-center justify-between '>
                <img className='w-20 h-20 px-2 py-2' src={assets.Admin_logo} alt="" />
                <button onClick={()=>(setToken(''))} className='py-2 px-6 bg-black text-white mx-2 rounded-2xl font-bold cursor-pointer'>Logout</button>
            </div>

        </div>
    )
}

export default Navbar
