import { useLogout } from '../../hooks/useLogout';
import { themeContext } from '../../context/themeContext';
import { useContext,useState,useEffect } from 'react';
import {Link} from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import axios from 'axios';

function LoggedIn(){
    const {user}=useAuthContext()
    const {logout}=useLogout()
    const {theme,themeToggle}=useContext(themeContext)
    const [admin, setAdmin]=useState(false)
    
    useEffect(()=>{
        if(user){
            axios.get('http://localhost:3001/api/user/single',{headers:{Authorization:`Bearer ${user.token}`}})
                .then((res)=>{setAdmin(res.data)})
        }
    },[user])

    return (
        <div className='flex gap-4 sm:gap-16 sm:mr-10 mb-2 self-end'>
            {admin && <Link to='/admin' className='relative group text-inherit hover:text-inherit'>
                <SupervisorAccountIcon className='group-hover:cursor-pointer'/>
                <span className='tooltip sm:group-hover:scale-100'>Admin Page</span>
            </Link>}
            <Link to='/home#search' className='relative group text-inherit hover:text-inherit' onClick={()=>window.scrollTo(0,500)}>
                <SearchIcon className='group-hover:cursor-pointer'/>
                <span className='tooltip sm:group-hover:scale-100'>Search</span>
            </Link>
            <Link to='/subscribe' className='relative group text-inherit hover:text-inherit'>
                <SubscriptionsIcon className='group-hover:cursor-pointer'/>
                <span className='tooltip sm:group-hover:scale-100'>Subscriptions</span>
            </Link>
            {theme?
                <div className='relative group'>
                    <DarkModeIcon onClick={()=>themeToggle(false)} className='group-hover:cursor-pointer'/>
                    <span className='tooltip sm:group-hover:scale-100'>Darkmode</span>
                </div>
                :<div className='relative group'>
                    <LightModeIcon onClick={()=>themeToggle(true)} className='group-hover:cursor-pointer'/>
                    <span className='tooltip sm:group-hover:scale-100'>Lightmode</span>
                </div>}
            <div className='relative group'>
                <LogoutIcon onClick={logout} className='group-hover:cursor-pointer'/>
                <span className='tooltip sm:group-hover:scale-100'>Logout</span>
            </div>
        </div>
    )
}

export default LoggedIn