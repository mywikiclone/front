
"use client"

import { useEffect, useRef } from "react"
import { check_in_db } from "./indexdb"




const UpDownBtn=()=>{

    const img_arr=["public/arrowup.svg","public/arrow_down.svg"]
    const upbtn=useRef(null);
    const downbtn=useRef(null);
    const upfunc=()=>{

        window.scrollTo({left:0, top:0, behavior:'smooth'})
        
        
    }
    const downfunc=()=>{

        let down=document.documentElement.scrollHeight;
        console.log("down:",down)
        window.scrollTo({left:0, top:Number(down), behavior:'smooth'})
    }

    useEffect(()=>{


       
        img_arr.forEach((x,idx)=>{
            if(idx===0){
               
                check_in_db("img_store",9,x,upbtn,0)
                return ;
            }
            check_in_db("img_store",10,x,downbtn,0)
            return ;
        })

    },[])


    return (

        <div className="flex flex-col h-[70px] w-[30px]  justify-between ">
            <button  className="h-[30px] w-full border-solid rounded-3p  border-[2px] text-[10px]" onClick={()=>{upfunc()}}><img ref={upbtn} className="w-full h-full"></img></button>
            <div className="h-[10px] w-full  "></div>
            <button  className="h-[30px] w-full border-solid rounded-3p  border-[2px]  text-[10px]"onClick={()=>{downfunc()}}><img ref={downbtn} className="w-full h-full"></img></button>
        </div>
    )
}



export default UpDownBtn