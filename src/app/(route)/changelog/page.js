"use client"

import { fetching_get_with_no_token } from "@/app/components/fetching";
import { check_in_db } from "@/app/components/indexdb";
import Link from "next/link";
import { useEffect, useRef,useState } from "react"



const ChangeLongs=()=>{
    let [current_page,set_current_page]=useState(0);
    let [current_logs,set_current_logs]=useState([]);
    let back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
    const last_page_sign=process.env.NEXT_PUBLIC_LAST_PAGE_SIGN;
    const svg_url_arr=["public/arrow_right.svg","public/arrow_left.svg"]
    const add_btn=useRef(null);
    const min_btn=useRef(null);
    const redirect_handler=()=>{}
    const add_min_ref_arr=[add_btn,min_btn]

    const paging_func=async ()=>{
        
       
        
    
        let data=await fetching_get_with_no_token(`${back_end_url}changelogs/${current_page}`,redirect_handler)
        if(data.success){
        let msg=data.msg;
        data=data.data;
        set_button_state(msg,current_page);
        console.log(msg===last_page_sign);
        set_current_logs(data)}

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



        let data=await fetching_get_with_no_token(`${back_end_url}changelogs/${current_page+1}`,redirect_handler)

        if(data.success){
            set_current_logs(data.data)
            set_current_page(current_page+1)
            set_button_state(data.msg,current_page+1);
        }
        else{
            return ;
        }

   
    }

    const onclick_minus_page_num=async()=>{


         let data=await fetching_get_with_no_token(`${back_end_url}changelogs/${current_page-1}`,redirect_handler)

            if(data.success){
    
            set_current_logs(data.data)
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
        <div className="w-full h-fit">

            <div className=" flex flex-col items-center border-[2px] text-[24px] w-full h-95p">
                <div className="lg:w-90p w-full text-left h-[75px] text-[50px] border-slate-300 border-b-[1px] border-solid ">변경사항</div>
                <div className="lg:w-90p w-full flex flex-col h-auto ">

                <div className="w-full flex mt-[10px]">
                    <div className="w-42p text-[15px] pl-[10px] h-fit">글</div>
                    <div className="w-[105px] h-fit flex text-[15px]">기능</div>
                    <div className="w-20p  text-[15px] h-fit ">작성자</div>
                    <div className="w-20p  text-[15px] h-fit ">작성시간</div>



                </div>
                {
                current_logs.map(x=>(
                    <div key={x.log_id} className="w-full flex h-fit  mb-[10px] p-[10px] border-solid border-slate-300 rounded-3p border-r-[0px] border-l-[0px] border-[1px]">
                    <Link  id={x.log_id} className="w-42p  text-[15px] truncate h-fit" href={`/currentversion/${encodeURIComponent(x.content_title)}`}>
                            {x.content_title}
                     
                           
                    </Link>

                    <div className="w-fit h-fit flex">

                        <Link className="w-fit p-[5px] mr-[3px] h-fit border-solid border-[1px] rounded-3p text-[10px]" href={`/edit/${x.content_id}`}>편집</Link>
                        <Link className="w-fit p-[5px] mr-[3px] h-fit border-solid border-[1px] rounded-3p text-[10px]" href={`/history/${x.content_id}`} >역사</Link>
                        <Link className="w-fit p-[5px] mr-[3px] h-fit  border-solid border-[1px] rounded-3p text-[10px]" href={`/beforeversion/${x.log_id}`}>보기</Link>

                    </div>
                    <div className="w-20p p-[5px] text-[10px] truncate h-fit ">{x.user_email}</div>
                    <div className="w-20p p-[5px] text-[10px] truncate  h-fit ">{x.create_time.substring(0,16).replace("T","-")}</div>
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

export default ChangeLongs