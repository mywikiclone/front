"use client"

import { useRef,useEffect,useState } from "react"
import { motion,AnimatePresence } from 'framer-motion';
const RealTime=()=>{
    let idx=useRef(0)
    let doc_obj=useRef(null)
    let current_timeout=useRef(null); 
    let data=[1,2,3]
    let [current_idx,set_current_idx]=useState(0);
    let [visible,set_visible]=useState(false)
    




    const mosuseover=(event)=>{
    
        set_visible(true)

    }
    const mouseleave=(event)=>{
            set_visible(false)
    }
    const set_function=()=>{    

        if(current_idx===2){
            set_current_idx(0)
        }
        else{
            set_current_idx(current_idx+1)
        }

    

    }
    

    

    useEffect(()=>{
        

       
        setTimeout(set_function,3000)
    },[current_idx])
  

    
    return(
        <div className=" relative flex  justify-start bg-slate-200 w-full h-[35px] border-solid rounded-3p  border-[2px]   "
        onMouseEnter={(e)=>mosuseover(e)}
        onMouseLeave={(e)=>mouseleave(e)}>
        <AnimatePresence>
        <motion.div   
        ref={doc_obj}    
        initial={{opacity:0,y:10}}
        animate={{opacity:1,y:0}}
        exit={{opacity:0,y:-10}}
    
        transition={{duration:0.5}}
        className="absolute ml-[10px]  w-full text-[20px]"
        key={current_idx}
>
                {data[current_idx]}
          </motion.div>
        </AnimatePresence>
        {
            visible && <div className="w-full h-[200px] bg-white 
            border-solid border-[1px] border-solid border-black rounded-3p z-50">
                {data.map((x,idx)=>

                    <div key={idx} className="w-full my-[5px] ml-[5px] text-[15px]">

                        {idx+1} <a className="ml-[5px]" href="https://namu.wiki/w/%EB%82%98%EB%AC%B4%EC%9C%84%ED%82%A4:%EB%8C%80%EB%AC%B8"
                        target="_blank" >{x}</a>

                    </div>


                )}
            </div>
        }
    </div>

    )

    //position을 설정해서 기존요소의 위치를 자식요소가따라가게 설정



}

export default RealTime;

/*
    <div className="flex  justify-start bg-slate-200 w-full h-[35px] border-solid rounded-3p  border-[2px] border-blue-500  ">

        <div ref={docs} id="change_list" className="ml-[10px] text-[20px] hover:w-full hover:h-[200px] hover:bg-white hover:ml-[0px]
            hover:border-solid hover:border-[1px] hover:border-solid hover:border-black hover:rounded-3p
            hover:shadow-2xl"  onMouseLeave={(e)=>mouseleave(e)}>0</div>
    </div>


*/