"use client"
import { useState,useRef,useEffect } from "react";
import Link from "next/link";
const EditLink=()=>{
    const [popup,set_popup]=useState(false);
    const current_pop_up=useRef(null);
 
    const pop_setting=()=>{
      
     
        set_popup(true);
       
    }



    const check_mouse_in=(event)=>{

        if(current_pop_up.current!==null&&!current_pop_up.current.contains(event.target)){

            set_popup(false);

        }

    }


    useEffect(()=>{
        if(popup){
            document.addEventListener("mousedown",check_mouse_in)}
        else{
            document.removeEventListener("mousedown",check_mouse_in)
        }


        return ()=>{
            document.removeEventListener("mousedown",check_mouse_in)
        }
    
    },[popup])



    return(
        <div className="relative mr-[20px]">
            
            <button  className=" w-[50px] h-fit " onClick={()=>{pop_setting()}}>작성</button>
            
        {
         popup ?   <div ref={current_pop_up} className="p-[5px] flex flex-col absolute bottom-[-100px] z-50 bg-white border-solid border-[1px] border-slate-300 w-[200px] h-fit rounded">

                <Link className="w-full h-fit text-[15px] mb-[10px]" href="/edit" >글작성</Link>
                <Link className="w-full h-fit text-[15px] mb-[10px]" href="/upload" >자료업로드</Link>
                <Link className="w-full h-fit text-[15px]" href="/upload/find" >자료검색</Link>
            
            </div> :null
        }
        </div>
        
    )


}


export default EditLink