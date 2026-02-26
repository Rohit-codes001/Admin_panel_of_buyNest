import React, { useEffect, useState } from 'react'
import {backend_url} from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

  let [email , setemail] = useState('')
  let [password , setpassword] = useState('')

  async function submitHandler(e) {
    try{
        
    e.preventDefault();

    let response = await fetch(backend_url+"/api/user/admin-pannel", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let data = await response.json();
    console.log(data.token)
 
    if(data.token){
      setToken(data.token)
    }else{
      
      toast.error(data.message)
    }
    
    }
    catch(err){
        console.log(err.message)
        toast.error(err.message)
    }
}




  return (
    <div>
      <div className='flex items-center justify-around m-auto mt-10 h-[400px] md:h-[500px] w-[330px] md:w-[400px]  shadow-2xl rounded-xl '>
        
        <form onSubmit={submitHandler}>
            <h1 className='text-2xl font-bold'>Admin Login</h1>
            <div className='flex flex-col gap-3 '>
                <p>Enter Email</p>
                <input className='w-full border outline-0 px-2 py-3 rounded-xl ' type="text" placeholder='enter email'
                value={email}
                onChange={(e)=>(setemail(e.target.value))}
                />
                <p>Enter password</p>
                <input className='w-full border outline-0 px-2 py-3 flex items-center justify-around rounded-xl' type="password" placeholder='Enter password'
                value={password}
                onChange={(e)=>(setpassword(e.target.value))}
                />
                <button className='h-full w-full border bg-black text-white font-bold py-2 rounded-2xl cursor-pointer' type='submit'>Submit</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
