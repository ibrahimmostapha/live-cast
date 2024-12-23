import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import ReportIcon from '@mui/icons-material/Report';

function Channel() {
  const {user}=useAuthContext()
  const [results,setResults]=useState([])
  const [channel,setChannel]=useState("")
  const [isLoading,setLoading]=useState(true)
  let {id}=useParams()

  useEffect(()=>{
    try{
      axios.get('http://localhost:3001/api/channels/single/'+id)
          .then((res)=>setChannel(res.data))
      if(user){
        axios.get('http://localhost:3001/api/broadcasts/channel/'+id,{headers:{Authorization:`Bearer ${user.token}`}})
        .then((res)=>{setResults(res.data)})
      }
      setLoading(false)
    } catch(error){
      console.log(error)
      setLoading(false)
    }
  },[user])
  return (
    <div className="bg-gradient-to-b from-amber-800 to-amber-200 dark:from-amber-900 dark:via-amber-800 dark:to-orange-900 
                 text-black dark:text-white">
      {!channel && !isLoading && <div className='w-full h-screen bg-gradient-to-b from-red-600 to-amber-200 dark:to-orange-900
                flex flex-col justify-center items-center text-red-600 dark:text-red-300'>
          <ReportIcon style={{fontSize:"160px"}}/>
          <h1 className='text-4xl '>Channel Unavailable</h1>
        </div>}
      {isLoading && <div className='w-full h-screen'>
        <RotateRightIcon className="absolute text-white m-auto left-9 right-0 animate-spin" style={{marginTop:"40vh", fontSize:"160px"}}/>
      </div>}
      {channel && results.length==0 &&  <div className="mx-auto px-8 max-w-7xl pt-16 h-screen">
          <div className="flex justify-between items-center py-4 border-b border-gray-800">
            <img className='w-14 sm:w-24 aspect-square rounded-full'
              src={`http://localhost:3001/${channel.logo}`} alt="Channel Logo" />
            <h1 className="text-3xl font-bold">{channel.name}</h1>
          </div>
          <div className='flex flex-col w-full'>
            <h1 className='text-4xl m-4'>Channel Broadcasts:</h1>
            <div className='w-full text-center'>This Channel doesn't have any broadcasts yet!</div>
          </div>
        </div>}
      {channel && results.length>0 && !isLoading && <div className="mx-auto px-8 max-w-7xl pt-16">
        <div className="flex justify-between items-center py-4 border-b border-gray-800">
          <img className='w-14 sm:w-24 aspect-square rounded-full'
            src={`http://localhost:3001/${channel.logo}`} alt="Channel Logo" />
          <h1 className="text-3xl font-bold">{channel.name}</h1>
        </div>
        <div className='flex flex-col w-full'>
          <h1 className='text-4xl m-4'>Channel Broadcasts:</h1>
          <div className="w-full flex flex-wrap justify-center gap-4 py-4 m-auto">
              {results && results.map((item)=>{
                return (  
                  <div key={item._id} className="w-80 aspect-video bg-gradient-to-b from-amber-900 to-amber-700 dark:from-stone-700 dark:to-stone-800 px-4 pt-4 rounded 
                        shadow-lg">
                    <Link to={`/watch/${item.path}`}>
                      <img
                        className="w-full h-48 object-cover rounded hover:brightness-75 border border-black dark:border-white"
                        src={`https://i.ytimg.com/vi/${item.path}/mqdefault.jpg`}
                        alt="Game thumbnail"
                      />
                    </Link>
                    <div className="my-4">
                      <h3 className="text-white text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.category}</p>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>}
    </div>
  );
}

export default Channel;