"use client"

import {useState,useEffect,useRef} from "react";
import { check_in_db } from "./indexdb";
import { fetching_get_with_no_token } from "./fetching";
import Link from "next/link";
const History=({content_id})=>{

 const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
 
 let [update_datas,set_update_datas]=useState([]);
 let [current_page,set_current_page]=useState(0);
 const add_btn1=useRef(null)
 const add_btn2=useRef(null)
 const min_btn1=useRef(null)
 const min_btn2=useRef(null)
 const add_min_ref_arr=[add_btn1,add_btn2,min_btn1,min_btn2]
 const svg_url_arr=["public/arrow_right.svg","public/arrow_left.svg"]
  let data=[{id:1,date:"2024-08-02 15:17:25",text:"1번글"},{id:2,date:"2024-08-02 15:17:00",text:"2번글"}]    
  console.log(data)
    const serach_before_version=(event)=>{
        console.log(data[event.target.parentElement.id-1]);
    }

   const paging_func=async ()=>{
        console.log("page_num:",current_page);
       
        
        

        let data=await fetching_get_with_no_token(`${back_end_url}changelog/${current_page}/${content_id}`)
        if(data.success){
        data=data.data;

        set_update_datas(data)}
        return ;
        
    } 

    const onclick_add_page_num=async ()=>{
        console.log("page_num:",current_page);
       
        


        let data=await fetching_get_with_no_token(`${back_end_url}changelog/${current_page+1}/${content_id}`)

        if(data.success){
            set_update_datas(data.data)
            set_current_page(current_page+1)
        }
        else{
            return ;
        }

            return;

   
    }

    const onclick_minus_page_num=async()=>{
        if(current_page===0){
            
            return;
        }
        else{

            let data=await fetching_get_with_no_token(`${back_end_url}changelog/${current_page-1}/${content_id}`)

            if(data.success){
    
            set_update_datas(data.data)
            set_current_page(current_page-1)}
            else{
                return ;
            }

                return;
        }
    }

    useEffect(()=>{
        paging_func()
        add_min_ref_arr.map((x,idx)=>{


            if(idx===0 ||idx===1){
                if(idx===1){
                    setTimeout(()=>{check_in_db("img_store",6,svg_url_arr[0],x,0)},100)
                }


                else{check_in_db("img_store",6,svg_url_arr[0],x,0)}

            }
            else{
                if(idx===3){
                    setTimeout(()=>{check_in_db("img_store",7,svg_url_arr[1],x,0)},100)
                }




                else{check_in_db("img_store",7,svg_url_arr[1],x,0),100}
                
            }



        })
    },[])


    return(
      
        <div className="flex h-auto w-full justify-center items-center">
            <div className=" flex flex-col  items-center border-[2px] text-[24px] w-full h-95p">
                <div className="lg:w-90p w-full text-left h-[75px] bg-blue-200 text-[50px]">dhzzzz</div>
                <div className="lg:w-90p w-full flex justify-start">
                <button className="border-[2px]  disabled:opacity-50 border-r-0 rounded-3p border-solid text-[15px] p-[5px]" disabled><img ref={min_btn1} onClick={()=>onclick_minus_page_num()}></img>이전</button>
                    
                <button className="border-[2px] disabled:opacity-50 rounded-3p border-solid text-[15px] p-[5px]" onClick={()=>onclick_add_page_num()}>다음<img ref={add_btn1}></img></button>
                </div>
                <div className="lg:w-90p w-full h-auto bg-blue-200 ">
                {
                update_datas.map(x=>(
                        
                       <li key={x.log_id} id={x.log_id} className="w-full h-auto text-[15px]">
                            {x.update_time} {x.member_name}
                            <Link className="ml-[5px]" href={`/beforeversion/${x.log_id}`}>
                             이전 버전 보기
                            </Link>
                       
                        
                       
                       </li>
                    ))



                }
                </div>
                <div className="lg:w-90p w-full flex justify-start">
                    <button className="flex disabled:opacity-50 border-[2px] border-r-0 rounded-3p border-solid text-[15px] p-[5px]" disabled><img  ref={min_btn2} onClick={()=>onclick_minus_page_num()}></img>이전</button>
                    
                    <button className="flex disabled:opacity-50  border-[2px] rounded-3p border-solid text-[15px] p-[5px]" onClick={()=>onclick_add_page_num()}>다음<img ref={add_btn2}></img></button>
                </div>


                <div className="w-[30px] h-[30px]">{current_page+1}</div>
            </div>
        </div>
        
      
    )



}

export default History