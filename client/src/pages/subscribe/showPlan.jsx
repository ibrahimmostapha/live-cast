import { useEffect,useState } from "react"
import axios from "axios"
import { useAuthContext } from "../../hooks/useAuthContext"
import image from './bg.jpg'

function Plan(props){
    const {user}=useAuthContext()
    const [plan,setPackage]=useState(null)

    useEffect(()=>{
        try{
            axios.get('http://localhost:3001/api/packages/single/'+props.content.package.trim(),
            {headers:{authorization:`Bearer ${user.token}`}})
                .then((res)=>{
                    setPackage(res.data)
                })
        } catch(error){
            console.log(error)
        }
    },[])
    return (
        <div className="w-full min-h-screen bg-amber-200 dark:bg-orange-900 flex justify-center items-center">
            <div className="w-5/6 min-h-80 mt-20 p-10 flex flex-col justify-center items-center flex-wrap 
                bg-gray-200 dark:bg-stone-800 gap-6 rounded-md shadow-lg text-black dark:text-white">
                <h1 className="text-3xl font-extrabold text-center">You're already subscribed to a plan!</h1>
                <div className="flex flex-col">
                    <h1>Your plan:</h1>
                                        
                    <div className="flip-card self-center w-56 h-56 sm:w-80 sm:h-80">
                        <div className="flip-card-inner">
                            {plan && <div className="flip-card-front relative">
                                <img src={plan.background?'http://localhost:3001'+plan.background:image} alt="Avatar" className="w-56 h-56 sm:w-80 sm:h-80"/>
                                <div className="absolute bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 flex flex-col text-white bg-black bg-opacity-5 rounded-md p-10">
                                    <h1 className="text-3xl capitalize">{plan.name}</h1>
                                    <p>{plan.description}</p>
                                </div>
                            </div>}
                            <div className="flip-card-back relative">
                            <div className="absolute bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 flex flex-col text-white">
                                    <h1 className="text-2xl capitalize">expires at:</h1>
                                    <p>{new Date(props.content.expireAt).toString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Plan