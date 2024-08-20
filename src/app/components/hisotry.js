"use client"

import {useState,useEffect} from "react";

const History=({content_id})=>{

 const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
 
 let [update_datas,set_update_datas]=useState([]);
 let [current_page,set_current_page]=useState(0);


  let data=[{id:1,date:"2024-08-02 15:17:25",text:"1번글"},{id:2,date:"2024-08-02 15:17:00",text:"2번글"}]    
  console.log(data)
    const serach_before_version=(event)=>{
        console.log(data[event.target.parentElement.id-1]);
    }

   const paging_func=async ()=>{
        console.log("page_num:",current_page);
        let data=await fetch(`/api/changelog/${current_page}/${content_id}`)


        if(!data.ok){
            console.log("최대값 안맞음 ㅇㅇ");
            return;
        }

        let res=await data.json();

        set_update_datas(res.data)
    } 

    const onclick_add_page_num=async ()=>{
        console.log("page_num:",current_page);
        let data=await fetch(`/api/changelog/${current_page+1}/${content_id}`)


        if(!data.ok){
            console.log("최대값 안맞음 ㅇㅇ");
            return ;
        }

        let res=await data.json();

        set_update_datas(res.data)
        set_current_page(current_page+1)
    }

    const onclick_minus_page_num=async()=>{
        if(current_page===0){
            return;
        }
        else{
            let data=await fetch(`${back_end_url}changelog/${current_page-1}/${content_id}`)


            if(!data.ok){
                console.log("최대값 안맞음 ㅇㅇ");
                return ;
            }
    
            let res=await data.json();
    
            set_update_datas(res.data)
            set_current_page(current_page-1)
        }
    }

    useEffect(()=>{
        paging_func()
    
    },[])


    return(
      
        <div className="flex h-auto w-full justify-center items-center">
            <div className=" flex flex-col  items-center border-[2px] text-[24px] w-full h-95p">
                <div className="w-90p text-left h-[75px] bg-blue-200 text-[50px]">dhzzzz</div>
                <div className="w-90p flex justify-start">
                <button className="flex items-center justify-center  border-[2px] rounded-3p border-solid text-[15px] text-center"><img src="../../arrow_left.svg" onClick={()=>onclick_minus_page_num()}></img>이전</button>
                    
                    <button className="flex items-center justify-center border-[2px] rounded-3p border-solid text-[15px]" onClick={()=>onclick_add_page_num()}>다음<img src="../../arrow_right.svg"></img></button>
                </div>
                <div className="w-90p h-auto bg-blue-200 ">
                {
                update_datas.map(x=>(
                        
                       <li key={x.log_id} id={x.log_id} className="w-full h-auto text-[15px]">
                            {x.update_time} {x.member_name}
                            <a className="ml-[5px]" href={`http://localhost:3000/beforeversion/${x.log_id}`}>
                             이전 버전 보기
                            </a>
                       
                        
                       
                       </li>
                    ))



                }
                </div>
                <div className="w-90p flex justify-start">
                    <button className="flex items-center justify-center  border-[2px] rounded-3p border-solid text-[15px] text-center"><img src="../../arrow_left.svg" onClick={()=>onclick_minus_page_num()}></img>이전</button>
                    
                    <button className="flex items-center justify-center border-[2px] rounded-3p border-solid text-[15px]" onClick={()=>onclick_add_page_num()}>다음<img src="../../arrow_right.svg"></img></button>
                </div>


                <div className="w-[30px] h-[30px]">{current_page+1}</div>
            </div>
        </div>
        
      
    )



}

export default History