"use client"
import Link from "next/link";
import { useRef,useEffect,useState } from "react"
import { motion,AnimatePresence } from 'framer-motion';
const RealTimeAnother=({data_from_rsc})=>{




    let idx=useRef(0)
    let doc_obj=useRef(null)
    let current_timeout=useRef(null); 
    let load_fir=useRef(true);
    let data=[1,2,3]
    let [current_idx,set_current_idx]=useState(0);
    let [visible,set_visible]=useState(false)
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
    let [realtime_data_from_back,set_real_time_data]=useState([]);
    let datas2=useRef([]);

    const get_data_realtime_issue=async ()=>{
        const data=await fetch(`${back_end_url}realtime`,{
            method:'GET',
            headers:{
                'Content-Type':"application/json"
            }
        })
        .then((res)=>{return res.json()})
        .then((res)=>{
            return res.data;
        })
        console.log("data:",data);
        if(data.length===1){
            set_real_time_data([data[0],data[0]])
        }
        else{
        set_real_time_data(data);
        }
    }




    const mosuseover=(event)=>{
    
        set_visible(true)

    }
    const mouseleave=(event)=>{
            set_visible(false)
    }
    const set_function=()=>{    

        if(current_idx===(data_from_rsc.length-1)){
       
            set_current_idx(0)
        }

        else{
            set_current_idx(current_idx+1)
        }

    

    }
    
    
    

    useEffect(()=>{

        //console.log("backendurl:",back_end_url,realtime_data_from_back);

        const fetchdata=async ()=>{

   

            setTimeout(set_function,3000)

        }
        
        fetchdata();
       
      
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
        key={current_idx}>
                {data_from_rsc.length!==0 ?`${current_idx}${data_from_rsc[current_idx].title}` : null}
          </motion.div>
        </AnimatePresence>
        {
            visible && <div className="w-full h-[200px] bg-white 
            border-solid border-[1px] border-solid border-black rounded-3p z-50">
                {data_from_rsc.map((x,idx)=>
                    <Link key={idx} href={`/currentversion/${encodeURIComponent(x.title)}`}>
                    <div  id={idx} className="w-full my-[5px] ml-[5px] text-[15px]">

                        {idx+1}
                       {x.title}

                    </div>
                    </Link>


                )}
            </div>
        }
    </div>

    )

    //position을 설정해서 기존요소의 위치를 자식요소가따라가게 설정



}

export default RealTimeAnother;