import 'react-slideshow-image/dist/styles.css'
import 'react-slideshow-image/dist/styles.css'
import {Slide} from 'react-slideshow-image'
import { useContext, useEffect, useRef, useState } from "react";
import {navBarContext} from '../../context/navBarContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Featured(props){
    const {setIsVisible}=useContext(navBarContext)
    // const [margin,setMargin]=useState('ml-0')
    const [slides,setSlides]=useState([])
    const test=useRef()
    const navigate=useNavigate()
    
    useEffect(()=>{
        const observer=new IntersectionObserver((entry)=>{
            setIsVisible(entry[0].isIntersecting)
        })
        observer.observe(test.current)

        try{
            axios.get('http://localhost:3001/api/broadcasts/search?page=0')
                .then((res)=>{
                    setSlides(res.data)
                })
        } catch(error){
            console.log(error)
        }
    },[])
    
    return(
        <div className={`h-52 sm:h-full mt-10 text-black flex flex-col justify-end w-full dark:text-white ${props.className}
                        sm:mt-0 sm:py-10 sm:px-56 bg-gradient-to-b from-gray-100 via-gray-100 to-transparent dark:from-stone-900 dark:via-stone-900 dark:to-transparent`}>
            <span ref={test}></span>
            <h1 className='text-center sm:text-4xl m-4 font-extrabold text-amber-700 dark:text-white sm:mb-10 sm:p-4'>Our Featured Broadcasts</h1>
            {slides.length>=5 && 
            <Slide>
                <div className={`w-full h-full hover:cursor-pointer transition-all`}>
                    <img className='w-full aspect-video' onClick={()=>navigate('/watch/'+slides[0].path)} src={`https://i.ytimg.com/vi/${slides[0].path}/maxresdefault.jpg`}/>
                </div>
                <div className="w-full aspect-video transition-all h-full">
                    <img className='w-full h-full hover:cursor-pointer' onClick={()=>navigate('/watch/'+slides[1].path)} src={`https://i.ytimg.com/vi/${slides[1].path}/maxresdefault.jpg`}/>
                </div>
                <div className="w-full aspect-video transition-all h-full">
                    <img className='w-full h-full hover:cursor-pointer' onClick={()=>navigate('/watch/'+slides[2].path)} src={`https://i.ytimg.com/vi/${slides[2].path}/maxresdefault.jpg`}/>
                </div>
                <div className="w-full aspect-video transition-all h-full">
                    <img className='w-full h-full hover:cursor-pointer' onClick={()=>navigate('/watch/'+slides[3].path)} src={`https://i.ytimg.com/vi/${slides[3].path}/maxresdefault.jpg`}/>
                </div>
                <div className="w-full aspect-video transition-all h-full">
                    <img className='w-full h-full hover:cursor-pointer' onClick={()=>navigate('/watch/'+slides[4].path)} src={`https://i.ytimg.com/vi/${slides[4].path}/maxresdefault.jpg`}/>
                </div>
            </Slide>}
                {/* <div className='w-full aspect-video bg-black relative overflow-hidden'>
                    <input type="radio" name="r" id="r1" onClick={()=>setMargin("r1-checked")}/>
                    <input type="radio" name="r" id="r2" onClick={()=>setMargin("r2-checked")}/>
                    <input type="radio" name="r" id="r3" onClick={()=>setMargin("r3-checked")}/>
                    <input type="radio" name="r" id="r4" onClick={()=>setMargin("r4-checked")}/>
                    <input type="radio" name="r" id="r5" onClick={()=>setMargin("r5-checked")}/>
                
                    {slides.length>0 && <div className='h-full flex' style={{width:"500%"}}>
                        <div className={`w-1/5 h-full ${margin} transition-all`}>
                            <img className='w-full h-full hover:cursor-pointer' onClick={()=>navigate('/watch/'+slides[].path)} src={`https://i.ytimg.com/vi/${slides[0].path}/maxresdefault.jpg`}/>
                        </div>
                        <div className="w-full aspect-video transition-all h-full">
                            <img className='w-full h-full hover:cursor-pointer' onClick={()=>navigate('/watch/'+slides[].path)} src={`https://i.ytimg.com/vi/${slides[1].path}/maxresdefault.jpg`}/>
                        </div>
                        <div className="w-full aspect-video transition-all h-full">
                            <img className='w-full h-full hover:cursor-pointer' onClick={()=>navigate('/watch/'+slides[].path)} src={`https://i.ytimg.com/vi/${slides[2].path}/maxresdefault.jpg`}/>
                        </div>
                        <div className="w-full aspect-video transition-all h-full">
                            <img className='w-full h-full hover:cursor-pointer' onClick={()=>navigate('/watch/'+slides[].path)} src={`https://i.ytimg.com/vi/${slides[3].path}/maxresdefault.jpg`}/>
                        </div>
                        <div className="w-full aspect-video transition-all h-full">
                            <img className='w-full h-full hover:cursor-pointer' onClick={()=>navigate('/watch/'+slides[].path)} src={`https://i.ytimg.com/vi/${slides[4].path}/maxresdefault.jpg`}/>
                        </div>
                    </div>}
                    <div className='flex gap-2 absolute bottom-4 left-1/2 -translate-x-1/2'>
                        <label htmlFor="r1" className={`foobarfoo ${margin=="r1-checked"?"bg-white":""}`}/>
                        <label htmlFor="r2" className={`foobarfoo ${margin=="r2-checked"?"bg-white":""}`}/>
                        <label htmlFor="r3" className={`foobarfoo ${margin=="r3-checked"?"bg-white":""}`}/>
                        <label htmlFor="r4" className={`foobarfoo ${margin=="r4-checked"?"bg-white":""}`}/>
                        <label htmlFor="r5" className={`foobarfoo ${margin=="r5-checked"?"bg-white":""}`}/>
                    </div>

                </div> */}
        </div>
    )
}

export default Featured