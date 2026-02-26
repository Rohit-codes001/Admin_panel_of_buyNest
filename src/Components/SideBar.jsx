import React from 'react'
import { NavLink , Routes , Route } from 'react-router-dom'
import { assets } from '../assets/assets'
import Add from '../pages/Add'
import Orders from '../pages/Orders'
import AllProducts from '../pages/AllProducts'
const SideBar = () => {
  return (
    <div>
      <div className='flex w-screen min-h-screen'>
        {/* --- left side --- */}
        <div className='w-[23%] md:w-[18%] '>
          <div className='flex gap-3 items-center px-2 md:px-5 py-2 border border-r-0 border-gray-300 ml-10 mt-5'>

            <NavLink to={'/add'}>
              <img className=' w-5 h-5' src={assets.add_icon} alt="" />
            </NavLink>
            <p className='hidden md:block'>Add Items</p>
          </div>

          <div className='flex gap-3 items-center px-2 md:px-5 py-2 border border-r-0 border-gray-300 ml-10 mt-5'>

            <NavLink  to={'/All-products'}>
              <img className='w-5 h-5' src={assets.order_icon} alt="" />
            </NavLink>
            <p className='hidden md:block'>All Items</p>
          </div>

          <div className='flex gap-3 items-center px-2 md:px-5 py-2 border border-r-0 border-gray-300 ml-10 mt-5'>

            <NavLink  to={'/Orders'}>
              <img className='w-5 h-5' src={assets.order_icon} alt="" />
            </NavLink>
            <p className='hidden md:block'>Orders</p>
          </div>
        </div>

        {/* --- right side --- */}
        <div className='flex-1 border border-gray-300'>
          <Routes>
            <Route path='/add' element={<Add/>}/>
            
            <Route path='/All-products' element={<AllProducts/>}/>
            
            <Route path='/Orders' element={<Orders/>}/>
          </Routes>

        </div>
      </div>
    </div>
  )
}

export default SideBar
