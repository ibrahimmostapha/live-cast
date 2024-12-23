import Card from '../../components/main/broadcastCard'
import {useState, useEffect,useRef} from 'react'
import axios from 'axios'
import RotateRightIcon from '@mui/icons-material/RotateRight';
import KeyboardDoubleArrowDown from '@mui/icons-material/KeyboardDoubleArrowDown';

function Search(){
    const [results, setResults]=useState([])
    const [isLoading, setLoading]=useState(true)
    const [showMore, setShowMore]=useState(false)
    const [searchValue,setSearchValue]=useState("")
    const [page, setPage]=useState(0)
    const [newSearch,setNewSearch]=useState(false)
    const input=useRef()
    let position=0

    function submitSearch(){
        try{
            setShowMore(false)
            setLoading(true)
            position=window.scrollY
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
                    if(res.data.length<12){
                        setShowMore(false)
                    }else{
                        setShowMore(true)
                    }
                })
        } catch(error){
            console.log(error)
            setLoading(false)
        }
        setTimeout(() => {
            window.scrollTo(0, position)
        }, 1000);

    }

    useEffect(()=>{
        try{
            submitSearch()
            setLoading(false)
        } catch(error){
            console.log(error)
        }
    },[])
    
    return(
        <div id="main_search" className="w-full p-6 h-auto flex flex-col gap-4 mt-16">
            <h1 className="text-4xl ml-4">Find Broadcasts: </h1>
            <div className="w-full bg-gray-100 dark:bg-stone-900 rounded-md p-4 shadow-lg">
                <div className="w-full flex justify-center gap-6 pb-14 pt-5 items-center border-b-2 border-gray-700 dark:border-gray-300">
                    <label className='text-3xl'>Search: </label>
                    <input ref={input} style={{border:"1px solid black"}} id="search_goto" className="w-1/2 h-14 p-2 text-black" 
                        type="text" placeholder="Enter Title or Category" onChange={(e)=>{setSearchValue(e.target.value);setPage(0);setNewSearch(true)}}/>
                    <button className="border-2 border-black dark:border-gray-300 rounded-md py-1 px-3 hover:bg-stone-900 
                        hover:text-white dark:hover:bg-white dark:hover:text-black h-10" 
                        onClick={submitSearch}>Search</button>
                    <button className="border-2 border-black dark:border-gray-300 rounded-md py-1 px-3 hover:bg-stone-900 
                        hover:text-white dark:hover:bg-white dark:hover:text-black h-10" 
                        onClick={()=>{input.current.value='';setPage(0);setNewSearch(true);setSearchValue("")}}>Clear</button>
                </div>
                <div className={`flex flex-wrap justify-center h-auto gap-2 py-5 relative ${isLoading?"py-24":""} ${showMore?"pb-20":""}`}>
                    {!isLoading && results && results.map((item)=>{
                        return <Card key={item._id} content={item}/>
                    })}
                    {showMore && <button onClick={()=>{submitSearch()}} className="absolute m-auto left-0 right-0 bottom-0 w-fit">
                        <h1 className='border border-black dark:border-white px-2 mb-2 hover:bg-black hover:text-white 
                            dark:hover:bg-white dark:hover:text-black rounded-md'>show more</h1>
                        <KeyboardDoubleArrowDown className='animate-bounce'/></button>}
                    {results.length==0 && <p className='my-8 text-2xl'>No available broadcasts matched your search!</p>}
                    {isLoading && <RotateRightIcon className="text-white m-auto left-0 top-0 right-0 animate-spin" style={{fontSize:"140px"}}/>}
                </div>
            </div>
        </div>
    )
}

export default Search