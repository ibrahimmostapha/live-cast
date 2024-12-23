import { useState } from "react";
import axios from "axios";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import { useAuthContext } from "../../hooks/useAuthContext";

function Card(props){
    const {user}=useAuthContext()
    const [isLoading, setIsLoading]=useState(false)

    async function handleClick(id){
        setIsLoading(true)
        try{
            let result=await axios.get('http://localhost:3001/api/subscribe/subscribe/'+id,{headers:{authorization:`Bearer ${user.token}`}})
            window.location.href=result.data
        } catch(error){
            console.log(error)
            alert("An Error Occured")
        }
        setIsLoading(false)
    }

    let bgString=props.package.background?props.package.background.replace(/\\/g,"/"):"";

    return (
        <div className="Card h-64 sm:h-96 w-64 relative border-2 group bg-amber-400 dark:bg-orange-900 border-white overflow-hidden
                    rounded-md flex flex-col justify-around py-10 sm:py-16 px-3 sm:px-10 text-white sm:text-amber-400 sm:dark:text-orange-900 font-extrabold"
                    style={{backgroundImage:`url("http://localhost:3001/${bgString}")`,
                            backgroundSize:"100%", backgroundRepeat:"no-repeat"}}>
            <div className="flex flex-col">
                <h1 className="z-10 text-3xl text-white group-hover:text-amber-400 dark:group-hover:text-orange-900 
                            transition-colors uppercase">{props.package.name}</h1>
                <h1 className="z-10 text-2xl">{props.package.cost/100}$</h1>
                <p className="z-10 mt-2 h-24 capitalize">
                    {props.package.description}
                </p>
            </div>
            <button className="z-10 mt-2 py-1 border-2 border-white sm:border-amber-400 sm:dark:border-orange-900 rounded-md 
                    hover:bg-amber-400 hover:text-white dark:hover:bg-orange-900 transition-colors ease-in-out"
                    onClick={()=>handleClick(props.package._id)} disabled={isLoading}>
                {!isLoading && <p>Click to subscribe</p>}
                {isLoading && <span>
                <DataUsageIcon className="animate-spin h-5 w-5 hover:text-white mr-2" viewBox="0 0 24 24"/>
                    Processing...
                </span>}
                </button>
        </div>
    )
}

export default Card