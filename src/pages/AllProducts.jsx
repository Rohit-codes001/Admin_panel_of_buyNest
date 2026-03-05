import React, { useEffect, useState } from 'react'
import { backend_url } from '../App'
import { assets } from '../assets/assets.js'
import { toast } from 'react-toastify'

const AllProducts = () => {


  let [productdata, setproductdata] = useState([])

     


  let getProductdata = async () => {
    try {
      
    let token = localStorage.getItem('token')
      let respons = await fetch(backend_url+'/api/product/all-products', {
        method: 'GET',
        headers: {
          authrization: token
        }

      })
      let data = await respons.json()
      if (data.success) {
        console.log('done')
        
        setproductdata(data.allproducts)
      } else {
        console.log(data.message)
      }


    } catch (error) {
      

    }
  }

  useEffect(() => (
    getProductdata()
  ), [])

  

 async function RemoveItem(id){
  let token = localStorage.getItem("token")
  console.log("id" +" "+ id)
     try{
      let respons = await fetch(backend_url+'/api/product/remove',{
        method:'POST',
        body:JSON.stringify({id}),
        headers:{
          'Content-Type': 'application/json',
          authrization : token
        }
      })
      let data = await respons.json()
      if(data.success){
        toast.success(data.message)
        setproductdata(prev => prev.filter(item => item._id !== id))
      }else{
        toast.error(data.message)
      }
     }catch(err){
      console.log(err)
    
     }
}

  return (
    <div>
      

      <div className='px-2 py-2 md:px-10 '>
        <p className='md:text-2xl text-xl'>All Product List</p>
        <div className='hidden md:block md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-200 px-4 py-2 '>

          <div><p> Image  </p></div>

          <div><p> Name  </p></div>
          <div><p> Category  </p></div>
          <div><p> Price  </p></div>
          <div><p>  Action </p></div>

        </div>
      </div>

      <div className='flex flex-col items-center justify-around gap-4'>
        {
         productdata.length > 0 && productdata.map((item, index) => {

            return (

              <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] border border-gray-300 md:w-[92%] px-2 py-2 items-center '>
                <div>
               <img className='w-12' src={item.image ? item?.image?.[0] : 'no image'} alt="" />                </div>
                <div><p className='text-[12px] px-1 md:text-[16px]'>{item.name}</p></div>
                <div><p>{item.category}</p> </div>
                
                
                  <div><p>{item.price}</p></div>
                <div><img onClick={()=>(RemoveItem(item._id))} className='w-4 h-4 cursor-pointer' src={assets.bin_icon} alt="" /></div>
                
                
              </div>
            )
          })
        }
      </div>
      
      
      

    </div>
  )
}

export default AllProducts
