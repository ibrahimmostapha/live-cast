import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import { useAuthContext } from "../../hooks/useAuthContext"
import GppBadIcon from '@mui/icons-material/GppBad';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import Plan from "./showPlan";
import Card from "./card"
import axios from "axios"

function Subscribe(){
    const [isLoading,setLoading]=useState(true)
    const {user}=useAuthContext()
    const [packages,setPackages]=useState([])
    const [plan,setPlan]=useState(null)

    useEffect(()=>{
        try{
            setLoading(true)
            axios.get('http://localhost:3001/api/packages/all',
            {headers:{authorization:`Bearer ${user.token}`}})
                .then((res)=>{
                    if(res.data.message){
                        setPlan(res.data.plan)
                    }else{
                        setPackages(res.data)
                    }
                })
                .finally(()=>{setLoading(false)})
        } catch(error){
            console.log(error)
        }
    },[user])

    return (
        <div className="w-full min-h-screen bg-amber-200 dark:bg-orange-900 flex justify-center items-center">
            {!plan && user && isLoading && <RotateRightIcon className="absolute text-white m-auto left-9 right-0 animate-spin" style={{marginTop:"10vh", fontSize:"160px"}}/>}
            {!plan && user && <div className="w-5/6 min-h-80 mt-20 p-6 flex justify-center items-center flex-wrap bg-gray-200 dark:bg-stone-800 gap-6 rounded-md shadow-lg">
                {packages.length===0 && !isLoading && <p className="text-3xl text-center">There are currently no packages available.</p>}
                {packages && packages.map((item)=>(
                    <Card key={item._id} package={item}/>
                ))
                }
            </div>}
            {!user && <div className="w-5/6 min-h-80 mt-20 p-10 flex justify-center items-center flex-wrap bg-gray-200 dark:bg-stone-800 gap-6 rounded-md shadow-lg">
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
            {user && packages.length===0 && plan && <Plan content={plan}/>}
        </div>
    )
} 

export default Subscribe