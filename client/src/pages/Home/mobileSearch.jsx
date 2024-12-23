import Card from '../../components/main/broadcastCard'
import {useState, useEffect} from 'react'
import axios from 'axios'
import RotateRightIcon from '@mui/icons-material/RotateRight';

function MSearch(props){
    const [results, setResults]=useState([])
    const [isLoading, setLoading]=useState(true)
    const [showMore, setShowMore]=useState(false)
    const [searchValue,setSearchValue]=useState("")
    const [page, setPage]=useState(0)
    const [newSearch,setNewSearch]=useState(false)

    function submitSearch(){
        try{
            setShowMore(false)
            setLoading(true)
            axios.get('http://localhost:3001/api/broadcasts/search?value='+searchValue+'&page='+page)
                .then((res)=>{
                    if(newSearch){
                        setResults(res.data)
                        setNewSearch(false)
                    } else{
                        setResults(results.concat(res.data))
                    }
                    setPage(page+1)
                    setLoading(false)
                    if(res.data.length<10){
                        setShowMore(false)
                    }else{
                        setShowMore(true)
                    }
                })
        } catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        try{
            submitSearch()
            setLoading(false)
        } catch(error){
            console.log(error)
        }
    },[])

    return (
        <div className={`w-11/12 h-auto rounded-md flex item flex-col gap-4 mt-12 p-4 bg-gray-100 dark:bg-stone-800 dark:text-white ${props.className}`}>
            <div className="flex flex-col w-full gap-4 self-center pb-4 border-b-2">
                <h1 className='text-center text-xl m-4'>Find a broadcast:</h1>
                <div className="flex items-center">
                    <label>Search: </label>
                    <input style={{border:`2px solid gray`}} className="p-1" type="text" placeholder="Title or Genre or Channel" onChange={(e)=>{setSearchValue(e.target.value);setPage(0);setNewSearch(true)}}/>
                </div>
                <button className="border-2 border-gray-500 rounded-sm w-1/2 self-end" onClick={()=>submitSearch()}>search</button>
            </div>
            <div className={`flex flex-wrap justify-center items-center h-auto gap-1 text-center py-8    relative ${showMore?"pb-20":""}`}>
                    {!isLoading && results && results.map((item)=>{
                        return <Card key={item._id} content={item}/>
                    })}
                    {showMore && <button onClick={()=>submitSearch()} className="absolute m-auto left-0 right-0 bottom-0 w-fit">
                                    <h1 className='border border-black dark:border-white px-2 mb-2 hover:bg-black hover:text-white 
                                        dark:hover:bg-white dark:hover:text-black rounded-md'>show more</h1></button>}
                    {results.length==0 && <p className='my-6 text-2xl'>No available broadcasts matched your search!</p>}
                    {isLoading && <RotateRightIcon className="absolute text-white m-auto left-0 right-0 animate-spin" style={{fontSize:"60px"}}/>}
                </div>
        </div>
    )
}

export default MSearch