"use client"

import {useState,useEffect,useRef} from "react";
import { check_in_db } from "./indexdb";
import { fetching_get_with_no_token } from "./fetching";
import Link from "next/link";
const History=({content_id})=>{

 const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
 
 let [update_datas,set_update_datas]=useState([]);
 let [current_page,set_current_page]=useState(0);
 const add_btn=useRef(null)

 const min_btn=useRef(null)
 const last_page_sign=process.env.NEXT_PUBLIC_LAST_PAGE_SIGN;
 const add_min_ref_arr=[add_btn,min_btn]
 const svg_url_arr=["public/arrow_right.svg","public/arrow_left.svg"]
 const redirect_handler=(text)=>{

 }



    const paging_func=async ()=>{
        
       
        
    
        let data=await fetching_get_with_no_token(`${back_end_url}changelog/${current_page}/${content_id}`,redirect_handler)
        if(data.success){
        let msg=data.msg;
        data=data.data;
        set_button_state(msg,current_page);
        console.log(msg===last_page_sign);
        set_update_datas(data)}

        else{

            add_btn.current.parentNode.disabled=true;


            min_btn.current.parentNode.disabled=true;

        }


        return ;
        
    } 


    const set_button_state=(state_text,page_num)=>{

        state_text===last_page_sign ? add_btn.current.parentNode.disabled=true : add_btn.current.parentNode.disabled=false;


        0===page_num ? min_btn.current.parentNode.disabled=true : min_btn.current.parentNode.disabled=false;

    }

    const onclick_add_page_num=async ()=>{
        console.log("page_num:",current_page);



        let data=await fetching_get_with_no_token(`${back_end_url}changelog/${current_page+1}/${content_id}`,redirect_handler)

        if(data.success){
            set_update_datas(data.data)
            set_current_page(current_page+1)
            set_button_state(data.msg,current_page+1);
        }
        else{
            return ;
        }

   
    }

    const onclick_minus_page_num=async()=>{


         let data=await fetching_get_with_no_token(`${back_end_url}changelog/${current_page-1}/${content_id}`,redirect_handler)

            if(data.success){
    
            set_update_datas(data.data)
            set_current_page(current_page-1)
            set_button_state(data.msg,current_page-1)
        
        
            }
            else{
                return ;
            }

        
    }


    useEffect(()=>{
        paging_func()
        add_min_ref_arr.map((x,idx)=>{
            if(idx===0){
  
            check_in_db("img_store",6,svg_url_arr[0],x,0)
                return;
            }
            else{
  
            check_in_db("img_store",7,svg_url_arr[1],x,0)
                return ;
            }

        })
    },[])


    return(
      
        <div className="flex h-auto w-full justify-center items-center">
            <div className=" flex flex-col  items-center border-[2px] text-[24px] w-full h-95p">
                <div className="lg:w-90p w-full text-left h-[75px] border-b-[1px] border-solid text-[50px]">역사</div>
         

                <div className="lg:w-90p w-full flex mt-[10px]">
                    <div className="w-40p  text-[15px] h-fit ">작성시간</div>
                    <div className="w-40p  text-[15px] h-fit ">작성자</div>
                    
                    <div className="w-20p text-[15px]  h-fit">기능</div>
                </div>






    
                <div className="lg:w-90p w-full h-auto flex flex-col mt-[5px]">
                {
                update_datas.map(x=>(
                        
                       <div key={x.log_id} className="w-full flex h-auto text-[15px] border-solid border-y-[1px] my-[5px]">
                            
                            <div className="w-40p my-[5px] text-[15px] h-fit ">{x.update_time.substring(0,16).replace("T","-")}</div>
                            <div className="w-40p my-[5px] text-[15px] h-fit ">{x.member_name}</div>
                            
                            <div className="w-20p my-[5px] text-[15px] h-fit">
                                <Link className="  border-[1px] border-solid rounded-3p" href={`/beforeversion/${x.log_id}`}>
                                    보기
                                </Link>
                            </div>

                       </div>
                    ))



                }
                </div>
                <div className="lg:w-90p w-full flex justify-center mt-[20px]">
                    <button className="w-fit h-fit flex disabled:opacity-50 border-[1px]  rounded-3p border-solid text-[15px] p-[5px]" onClick={()=>onclick_minus_page_num()} ><img className="w-[20px] h-[20px]"  ref={min_btn} ></img>이전</button>
                    <div className="w-fit text-[15px] py-[5px] px-[10px] h-fit flex justify-center  border-[1px] border-solid  border-r-0 border-l-0">{current_page+1}</div>
                    <button className="w-fit h-fit flex disabled:opacity-50  border-[1px] rounded-3p border-solid text-[15px] p-[5px]" onClick={()=>onclick_add_page_num()}>다음<img className="w-[20px] h-[20px]" ref={add_btn}></img></button>
                </div>

            </div>
        </div>
        
      
    )



}

export default History