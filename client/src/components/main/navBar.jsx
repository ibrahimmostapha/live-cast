import PodcastsIcon from '@mui/icons-material/Podcasts';
import { useContext, useEffect, useState } from 'react';
import { navBarContext } from '../../context/navBarContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import {Link} from "react-router-dom"
import LoggedIn from './navLoggedIn';
import LoggedOut from './navLoggedOut';

function NavBar(){
    const {user}=useAuthContext()
    const {isVisible}=useContext(navBarContext)
    const [show, setShow]=useState(false)

    useEffect(()=>{
        setShow(isVisible)
    },[isVisible,user])

    return (
        <header className={`navBar w-full fixed z-50 h-12 flex justify-between items-center sm:items-end px-4 text-amber-800
                         dark:text-white sm:px-12 sm:before:block before:hidden bg-white dark:bg-orange-800 
                         sm:bg-transparent sm:dark:bg-transparent before:bg-white before:shadow-md dark:before:bg-stone-800
                        ${show?"":"show"}`}>
                <Link to='/home' className='relative group text-inherit hover:text-inherit'>
                    <PodcastsIcon className='scale-150 sm:mb-2 group-hover:cursor-pointer'/>
                    <span className='tooltip sm:group-hover:scale-100'>Home</span>
                </Link>
                {!user && <LoggedOut/>}
                {user && <LoggedIn/>}
        </header>
    )
}

export default NavBar