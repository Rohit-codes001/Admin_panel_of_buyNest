import React, { useEffect, useState } from 'react'
import assest from '../assets/assets.js'
import { backend_url } from '../App'

const Orders = () => {
  let [Orders, setOrders] = useState([])

  let [currancy, setcurrancy] = useState('INR')
  

  let fetchOrders = async () => {
    let token = localStorage.getItem('token')
    try {
      let respons = await fetch(backend_url + '/api/order/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authrization: token
        }
      })
      let data = await respons.json()

      if (data.success) {

        setOrders(data.orders)

      } else {
        console.log(data.message)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  let updateStatus = async (orderId, status) => {
    try {
      let token = localStorage.getItem('token')
      let respons = await fetch(backend_url+'/api/order/updateStatus', {
        method: 'POST',
        body: JSON.stringify({ orderId, status }),
        headers: {
          "Content-Type": "application/json",
          authrization: token
        }
      })

      let data = await respons.json()
      if (data.success) {
      fetchOrders() 
    } else {
      console.log(data.message)
    }


    } catch (err) {
      console.log(err.message)

    }
  }


  useEffect(() => {
    fetchOrders()
  }, [])



  return (
    <div>

      { Orders?.length > 0 ? <div>

                    <h1 className='px-15 py-3'>Total Orders</h1>
      <div className='flex flex-col items-center'>
        {Orders?.length > 0 ? Orders?.map((orderinfo, index) => (
          orderinfo?.items?.map((item) => (

            <div className=' flex flex-col gap-2 sm:grid  sm:grid-cols-[1fr_3fr_2fr_2fr_2fr] sm:items-center px-10 sm:py-5 mt-5 border border-gray-300 w-[90%] ' key={item._id}>
              <div>
                <img className='py-1' src={assest.parcel_icon} alt="" />
              </div>

              {/*---- address info ---  */}
              <div>

                <p>{item?.name} x <span className='bg-green-500 text-gray-300 font-bold'>{item?.quantity} {item?.size}</span></p>
                <div>
                  <p>{orderinfo?.address?.firstName + " " + orderinfo?.address?.lastName}</p>
                </div>
                <p>{orderinfo?.address?.country} {orderinfo?.address?.state}</p>
                <p>{orderinfo?.address?.city} {orderinfo?.address?.street} {orderinfo?.address?.zipCode}</p>
                <p>{orderinfo?.address?.phone}</p>
              </div>

              {/*---- about items quatity payment data ---  */}

              <div>
                <p>items {item?.quantity}</p>
                <p>Method {orderinfo?.paymentMethod}</p>
                <p> Payment {orderinfo?.payment ? "Done" : "Pending"}</p>
                <p>{new Date(orderinfo?.date).toDateString()}</p>

              </div>


              {/*---- price ---  */}
              <div>
                <p>{currancy} {item?.price * item?.quantity}</p>
              </div>


              {/*---- change status ---  */}
              <div>
                <select className='py-2 px-4 border border-gray-300 mb-2 cursor-pointer' onChange={(e) => updateStatus(orderinfo?._id , e.target.value)} value={orderinfo?.orderStatus}  >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shiped">Shiped</option>
                  <option value="Out For delivery">Out For delivery</option>
                  <option value="Deliverd">Deliverd</option>
                </select>
              </div>


            </div>
          ))

        )) : <p>No any order is availble</p>}
      </div>

      </div>

 : null

      }

    </div>
  )
}

export default Orders
