import Details from "./watchDetails"
import {useParams, Navigate, Link} from'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import ReportIcon from '@mui/icons-material/Report';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import { useAuthContext } from "../../hooks/useAuthContext"
import GppBadIcon from '@mui/icons-material/GppBad';

function Watch(){
    const {user}=useAuthContext()
    const [media,setMedia]=useState(null)
    const [isLoading,setLoading]=useState(true)
    const {id}=useParams()

    useEffect(()=>{
        try{
            if(user){

                axios.get('http://localhost:3001/api/broadcasts/single/'+id,{headers:{authorization:`Bearer ${user.token}`}})
                .then((res)=>{
                    if(res.data.message){
                        setMedia({noAuth:true})
                    }else if(res.data.path){
                        setMedia(res.data);
                    } else{
                        setMedia({exists:true})
                    }
                })
                .finally(()=>{setLoading(false)})
             } else{
                setLoading(false)
             }
            } catch(error){
                console.log(error)
            }
        },[user])
        return (
        <div className="w-full min-h-screen bg-amber-200 dark:bg-amber-900">
            {isLoading && <RotateRightIcon className="absolute text-white m-auto left-9 right-0 animate-spin" style={{marginTop:"40vh", fontSize:"160px"}}/>}
            {user && media && media.exists && !isLoading && <div className="w-full h-screen flex flex-col justify-center items-center gap-10 text-red-600 dark:text-red-400">
                <ReportIcon style={{fontSize:'150px'}}/>
                <h1 className="text-4xl">Invalid Video ID</h1>
                <Link to='/home'>
                    <button className="text-gray-900 hover:text-white border border-black hover:bg-red-600 
                                hover:border-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 
                                dark:border-white dark:text-white dark:hover:bg-red-400">Return to Home</button>
                </Link>
            </div>}
            {user && media && media.path && !isLoading && <div className="w-full flex justify-center items-center">
                <div className="w-11/12 sm:min-h-80 bg-gray-200 dark:bg-stone-800 flex flex-col mt-20 justify-between 
                            sm:justify-evenly items-center sm:gap-8 rounded-lg shadow-lg sm:p-6">
                        <iframe className="w-full sm:w-9/12 aspect-video rounded-sm border-2 border-black dark:border-white shadow-lg"
                            src={"https://www.youtube.com/embed/"+media.path} title="YouTube video player" allow="accelerometer; autoplay; 
                                clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    {media && media.path && <Details broadcast={media}/>}
                </div>
            </div>}
            {user && media && media.noAuth && <div className="w-full h-screen flex flex-col justify-center items-center gap-10 text-red-600 dark:text-red-400">
                <div className="w-full h-screen flex flex-col justify-center text-center items-center gap-10 text-red-600 dark:text-red-400">
                    <GppBadIcon style={{fontSize:'150px'}}/>
                    <h1 className="text-4xl">You need to be subscribed!</h1>
                    <Link to='/subscribe'>
                        <button className="text-gray-900 hover:text-white border border-black hover:bg-red-600 
                                    hover:border-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 
                                    dark:border-white dark:text-white dark:hover:bg-red-400">Subscribe Now!</button>
                    </Link>
                </div>
            </div>}
            {!user && <div className="w-full h-screen flex flex-col justify-center items-center gap-10 text-red-600 dark:text-red-400">
                <div className="w-full h-screen flex flex-col justify-center text-center items-center gap-10 text-red-600 dark:text-red-400">
                    <GppBadIcon style={{fontSize:'150px'}}/>
                    <h1 className="text-4xl">You need to be logged in!</h1>
                    <Link to='/home'>
                        <button className="text-gray-900 hover:text-white border border-black hover:bg-red-600 
                                    hover:border-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 
                                    dark:border-white dark:text-white dark:hover:bg-red-400">Return to Home</button>
                    </Link>
                </div>
            </div>}
        </div>
    )
}

export default Watch