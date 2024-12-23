import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import axios from 'axios'

//google api key for yt api
// import API_KEY from './test'
// test.js file has api key but is added to .gitignore
const API_KEY=""

function Details(props){
    const {user}=useAuthContext()
    const [channel,setChannel]=useState(null)
    const [desc,setDesc]=useState(null)
    const navigate=useNavigate()
    
    useEffect(()=>{
        try{
            axios.get('http://localhost:3001/api/channels/single/'+props.broadcast.channel,{headers:{Authorization:`Bearer ${user.token}`}})
                .then((res)=>{setChannel(res.data)})

            axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${props.broadcast.path}&key=${API_KEY}`)
                .then((res)=>{ if(res.data.items){setDesc(res.data.items[0].snippet.description)}})
        } catch(error){
            alert("An error occured: ",error)
        }
    },[])
    return (
        <div className="w-full h-fit sm:w-11/12 border sm:border-t-2 border-t-0 border-gray-400 dark:border-white bg-amber-400 
                    dark:bg-orange-900 sm:rounded-md flex flex-col sm:flex-row justify-between p-4 shadow-md gap-2 dark:text-white">
            
            {channel && <div className='group h-24 sm:h-32 relative flex justify-center items-center'>
                    <img className="max-h-full aspect-square rounded-md hover:cursor-pointer hover:scale-110 hover:rounded-xl transition-all" 
                        src={"http://localhost:3001/"+channel.logo.replace(/\\/g,"/")} onClick={()=>navigate('/channels'+channel._id)}/>
                        <span className='tooltip sm:group-hover:scale-100 right-full z-10'>Channel</span>
                </div>}
            <div className="w-full min-h-fit h-5/6 border-t sm:border-t-0 sm:border-l sm:pl-10 border-gray-700 
                            dark:border-gray-200 dark:text-white flex flex-col gap-2">
                <div className="w-full flex flex-col sm:flex-row gap-2 justify-between">
                    <h1 className="sm:text-2xl underline capitalize">{props.broadcast.title}</h1>
                    <h1 className="sm:text-xl underline capitalize">{props.broadcast.category}</h1>
                </div>
                <p className="text-gray-800 dark:text-gray-300 overflow-hidden shadow-md bg-gray-200 dark:bg-gray-800 p-2 sm:p-4 rounded-md">
                    {desc || `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi voluptas nostrum ab 
                    ipsam. Blanditiis, consequatur doloribus tempora voluptates aliquam a molestiae temporibus maxime 
                    vero, ipsa fugit laudantium repudiandae accusamus fugiat?`} </p>
            </div>
        </div>
    )
}

export default Details