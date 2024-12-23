import { themeContext } from '../../context/themeContext';
import { useContext } from 'react';
import {Link} from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

function LoggedOut(){
    const {theme,themeToggle}=useContext(themeContext)

    return (
        <div className='flex gap-4 sm:gap-8 sm:mr-10 items-center'>
                <Link to='/home#search' className='relative group text-inherit hover:text-inherit sm:mx-4' onClick={()=>window.scrollTo(0,500)}>
                    <SearchIcon className='group-hover:cursor-pointer'/>
                    <span className='tooltip sm:group-hover:scale-100'>Search</span>
                </Link>
                {theme?
                    <div className='relative group sm:mx-4'>
                        <DarkModeIcon onClick={()=>themeToggle(false)} className='group-hover:cursor-pointer'/>
                        <span className='tooltip sm:group-hover:scale-100'>Darkmode</span>
                    </div>
                    :<div className='relative group sm:mx-4'>
                        <LightModeIcon onClick={()=>themeToggle(true)} className='group-hover:cursor-pointer'/>
                        <span className='tooltip sm:group-hover:scale-100'>Lightmode</span>
                    </div>}
                <Link to='/subscribe' className='relative group text-inherit hover:text-inherit sm:mx-4'>
                    <SubscriptionsIcon className='group-hover:cursor-pointer'/>
                    <span className='tooltip sm:group-hover:scale-100'>Subscriptions</span>
                </Link>
                <Link to='/signin'>
                    <button className='relative group px-3 text-xs sm:text-lg  bg-amber-300 dark:bg-stone-800 transition-colors
                            text-white hover:text-black rounded-md hover:bg-white border-2 border-white hover:border-black
                            dark:hover:bg-white'>
                        Log In
                    </button>
                </Link>
            </div>
    )
}

export default LoggedOut