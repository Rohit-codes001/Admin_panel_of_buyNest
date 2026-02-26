import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'


import {backend_url} from '../App'
import { toast } from 'react-toastify'

const Add = () => {

  let [name, setname] = useState('')
  let [description, setdescription] = useState('')
  let [category, setcategory] = useState('Men')
  let [subcategory, setsubcategory] = useState('Topwear')
  let [price, setprice] = useState('')
  let [sizes, setsizes] = useState([])
  let [bestSeller, setbestSeller] = useState(false)

  let [image1, setimage1] = useState(false)
  let [image2, setimage2] = useState(false)
  let [image3, setimage3] = useState(false)
  let [image4, setimage4] = useState(false)


  async function onSumithandler(e) {
    try {
      e.preventDefault()

      let formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append("price", price)
      formData.append('category', category)
      formData.append('subcategory', subcategory)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('bestseller', bestSeller)
      formData.append('Date', Date.now())

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)


       let token = localStorage.getItem('token')

      let respons = await fetch(backend_url+'/api/product/add-product', {
        method: "POST",
        body: formData,
        headers: {
          authrization : token
        }
      })
      
      let data = await respons.json()
      console.log(data)
      if(data.success){

      toast.success(data.message)
      setimage1(false)
      setimage2(false)
      setimage3(false)
      setimage4(false)
      setname('')
      setdescription('')
      setprice('')
      }
      else{
        toast.error(data.message)
      }
      


    } catch (err) {
      console.log(err)
      

    }

  }



  return (
    <div>
      {/*  main div start */}
      <form className='px-4' onSubmit={onSumithandler}>
        <p className='py-2 text-2xl'>Upload Image</p>
        <div className='flex gap-3 '>
          <label htmlFor="image1">
            <img className='h-20 w-20  py-2 cursor-pointer' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => (setimage1(e.target.files[0]))} className='hidden' type="file" id='image1' />
          </label>


          <label htmlFor="image2">
            <img className='h-20 w-20  py-2 cursor-pointer' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => (setimage2(e.target.files[0]))} className='hidden' type="file" id='image2' />
          </label>

          <label htmlFor="image3">
            <img className='h-20 w-20  py-2 cursor-pointer' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => (setimage3(e.target.files[0]))} className='hidden' type="file" id='image3' />
          </label>


          <label htmlFor="image4">
            <img className='h-20 w-20  py-2 cursor-pointer' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => (setimage4(e.target.files[0]))} className='hidden' type="file" id='image4' />
          </label>
        </div>

        <div>

          <div>
            <p className='py-2'>Product Name</p>
            <input className='h-10 w-[80%] px-2 border outline-0 border-gray-300 md:w-[50%]' type="text" placeholder='Enter product Name'
              onChange={(e) => (setname(e.target.value))}
              value={name}
            />
          </div>

          <div>
            <p className='py-2'>Product Description</p>
            <textarea className='h-20 w-[80%] px-2 outline-0 border border-gray-300 md:w-[50%] ' placeholder='Write here'
              onChange={(e) => (setdescription(e.target.value))}
              value={description}
            ></textarea>
          </div>
        </div>


        <div className=' flex flex-col gap-4 sm:grid sm:grid-cols-3  md:w-[50%]'>
          <div>
            <p className='py-2'>Product Category</p>
            <select onChange={(e) => (setcategory(e.target.value))} className='border border-gray-300 w-[80%]  py-2 cursor-pointer' >
              <option className='cursor-pointer' value="Men">Men</option>
              <option className='cursor-pointer' value="Women">Women</option>
              <option className='cursor-pointer' value="Kids">Kids</option>
            </select>
          </div>


          <div>
            <p className='py-2'> SubCategory</p>
            <select onChange={(e) => (setsubcategory(e.target.value))} className='border border-gray-300 w-[80%]  py-2 cursor-pointer' >
              <option className='cursor-pointer' value="Topwear">Topwear</option>
              <option className='cursor-pointer' value="BottemWear">BottemWear</option>
              <option className='cursor-pointer' value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className='py-2'>Price</p>
            <input className='border border-gray-300 w-[80%] py-2 px-2 ' placeholder='100' type="number"
              onChange={(e) => (setprice(e.target.value))}
              value={price}
            />
          </div>
        </div>

        <div className='py-2'>
          <p className='py-2'>Product Sizes</p>
          <div className='flex gap-3'>
            <div className={`${sizes.includes("S") ? "bg-pink-300" : "bg-slate-200"}   w-8 h-8   flex items-center justify-around py-2 cursor-pointer` }
              onClick={() => (setsizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"]))}
            >
              <p>S</p>
            </div>


            <div className={`${sizes.includes("M") ? "bg-pink-300" : "bg-slate-200"}   w-8 h-8   flex items-center justify-around py-2 cursor-pointer` }

              onClick={() => (setsizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"]))}
            >
              <p>M</p>
            </div>


            <div className={`${sizes.includes("L") ? "bg-pink-300" : "bg-slate-200"}   w-8 h-8   flex items-center justify-around py-2 cursor-pointer` }
              onClick={() => (setsizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"]))}
            >
              <p>L</p>
            </div>


            <div className={`${sizes.includes("XL") ? "bg-pink-300" : "bg-slate-200"}   w-8 h-8   flex items-center justify-around py-2 cursor-pointer` }

              onClick={() => (setsizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"]))}
            >
              <p>XL</p>
            </div>


            <div className={`${sizes.includes("XXL") ? "bg-pink-300" : "bg-slate-200"}   w-8 h-8   flex items-center justify-around py-2 cursor-pointer` }

              onClick={() => (setsizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"]))}
            >
              <p>XXL</p>
            </div>


          </div>


        </div>

        <div className='flex gap-2 items-center py-4 '>
          <input onChange={() => (setbestSeller(prev => !prev))} className='cursor-pointer' id='Add To BestSeller' type="radio" />
          <label htmlFor="Add To BestSeller">Add To BestSeller</label>
        </div>

        <button className='px-8 py-3 bg-black text-white rounded-xl cursor-pointer mb-4' type='submit'>ADD</button>
      </form>
    </div>
  )
}

export default Add
