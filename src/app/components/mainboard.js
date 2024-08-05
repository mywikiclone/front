"use client"
import { useState } from "react"
import RealTime from "./realtime";
import Link from 'next/link';
const Main_Board=({children})=>{


    const [show_edit,set_show_edit]=useState(false);
    const [show_hisotry,set_show_history]=useState(false)


    const on_change_btn_color=(event)=>{
        event.target.style.borderColor="black"
    }
    const off_change_btn_color=(event)=>{
        event.target.style.borderColor=" #cbd5e1"
    }



    return(
            <div>
                <div className=" flex w-full h-auto justify-between items-center border-solod border-[2px] border-black">
                    <div className=" text-[35px] w-auto h-auto ml-[10px]">
                        엄준식에관하여.....................
                        <div className="text-[15px]">
                            최근수정일
                        </div> 
                    </div>
      

                    <div className="flex w-[240px] h-[50px]  mr-[10px]">
                        <button className="flex justify-center items-center  w-[80px] h-full  border-solid border-[2px] border-slate-300 rounded-l-10p"
                            onMouseOver={(e)=>on_change_btn_color(e)}
                            onMouseLeave={(e)=>off_change_btn_color(e)} >
                            <img src="../../star.svg"></img>
                         
                        </button>
                        <button className="flex justify-center items-center w-[80px] h-full border-solid border-[2px] border-slate-300 text-[15px] text-center"
                            onMouseOver={(e)=>on_change_btn_color(e)}
                            onMouseLeave={(e)=>off_change_btn_color(e)}>
                            <Link href="http://localhost:3000/edit" className="w-full h-full">
                                <img src="../../edit.svg" ></img>
                                    편집
                                </Link>
                        </button>
                    
                        <button className="flex justify-center items-center w-[80px] h-full  border-solid border-[2px] border-slate-300 rounded-r-10p text-[15px]  text-center" 
                            onMouseOver={(e)=>on_change_btn_color(e)}
                            onMouseLeave={(e)=>off_change_btn_color(e)}>
                            <Link href="http://localhost:3000/history" className="w-full h-full">
                            <img src="../../history.svg" ></img>
                                역사
                            </Link>
                        </button>
  
                    </div>

                </div>
                <div className="w-full h-auto">
                        본문
                </div>
             
                </div>

    )

}


export default Main_Board;