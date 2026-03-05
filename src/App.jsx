import react, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import SideBar from './Components/SideBar'
import Login from './Components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
export let backend_url = import.meta.env.VITE_BACKEND_URL


const App = () => {
    let [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

    useEffect(() => (

        localStorage.setItem("token", token)

    ), [token])



    return (
        <div>
            <ToastContainer/>
            {token == "" ? <Login setToken={setToken} /> :
                <>
 
                    <div>
                        <Navbar setToken={setToken} />
                    </div>


                    <SideBar />
                </> }

        </div>
    )
}


export default App