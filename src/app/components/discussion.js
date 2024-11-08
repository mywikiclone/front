"use client"
import { useRouter } from "next/navigation";
import { fetching_get_with_no_token } from "./fetching"
import { useEffect,useState,useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { check_in_db } from "./indexdb";

const Disucssion=()=>{
    let [topiclist,settopiclist]=useState([]);
    let [page_num,set_page_num]=useState(0);
    const router=useRouter();
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL
    
    const last_page_sign="마지막"
    const min_btn=useRef(null);
    const add_btn=useRef(null);
    

    const ref_list=[min_btn,add_btn];
    const svg_list=["public/arrow_left.svg","public/arrow_right.svg"]
    const move_to_wirte_page=()=>{

        router.push("/discussion/write");
    }

    const move_to_topic=(id)=>{

        router.push(`/discussion/${id}`)
    }

    const redirect_handler=()=>{

    }



    const paging_func=async ()=>{
        
       
        
    
        let data=await fetching_get_with_no_token(`${back_end_url}topiclist/${page_num}`,redirect_handler)
        if(data.success){
        
            let msg=data.msg;
        
            data=data.data;

        
            set_button_state(msg,page_num);
        
            console.log(msg===last_page_sign);
       
            settopiclist(data);
    
        }

        else{

            add_btn.current.parentNode.disabled=true;

            settopiclist([]);
            min_btn.current.parentNode.disabled=true;

        }


        return ;
        
    } 


    const set_button_state=(state_text,page_num)=>{

        state_text===last_page_sign ? add_btn.current.parentNode.disabled=true : add_btn.current.parentNode.disabled=false;


        0===page_num ? min_btn.current.parentNode.disabled=true : min_btn.current.parentNode.disabled=false;

    }

    const onclick_add_page_num=async ()=>{
        



        let data=await fetching_get_with_no_token(`${back_end_url}topiclist/${page_num+1}`,redirect_handler)

        if(data.success){
            settopiclist(data.data)
            
            set_page_page(page_num+1)
            set_button_state(data.msg,page_num+1);
        }
        else{
            return ;
        }

   
    }

    const onclick_minus_page_num=async()=>{


         let data=await fetching_get_with_no_token(`${back_end_url}topiclist/${page_num-1}`,redirect_handler)

            if(data.success){
    
            settopiclist(data.data)
            set_page_num(page_num-1)
            set_button_state(data.msg,page_num-1)
        
        
            }
            else{
                return ;
            }

        
    }













    useEffect(()=>{


        paging_func();


        svg_list.forEach((x,idx)=>{

            idx===0 ? check_in_db("img_store",7,x,ref_list[idx],0) :check_in_db("img_store",6,x,ref_list[idx],0);

            
        })


    },[])



    return( <div className="w-full h-fit flex flex-col items-center">

        <div className="lg:w-90p w-full flex mt-[10px] border-b-[3px] p-[5px]  border-solid flex justify-between">
          
                    <div className="w-fit  text-[15px] h-fit ">제목</div>
                    <div className="w-fit text-[15px]  h-fit mr-[60px]">deadline</div>

         
        </div>

        {topiclist.map((x,idx)=>(

     
        <div key={idx} className="lg:w-90p w-full h-fit border-solid flex justify-between border-b-[1px]  p-[5px]"  onClick={()=>move_to_topic(x.topic_id)}>
                   
                   
                    <div className="w-fit h-fit flex items-center">
                        <div className="w-fit  text-[15px] h-fit ">{x.topic_title}</div>
                        <div className="w-fit text-[10px] h-fit ml-[10px]  truncate">{x.writer_email}</div>
                    </div>
                    <div className="w-fit text-[15px] mr-[60px]  h-fit">{new Date().getTime()>new Date(x.deadline_time).getTime() ? "마감": "활성화"}</div>
                   

        </div>            


        ))}



     
             <div className="lg:w-90p w-full flex justify-center text-[15px] mt-[10px]">
                <button   className=" disabled:opacity-50 flex justify-center items-center p-[5px] w-fit h-fit   border-[1px] rounded-3p border-solid" onClick={()=>onclick_minus_page_num()}><img className="w-[20px] h-[20px]" ref={min_btn}/>이전</button>
                <button className="flex justify-center items-center p-[5px] w-[35px] h-fit ">{page_num+1}</button>
                <button className=" disabled:opacity-50 flex justify-center items-center p-[5px] w-fit h-fit mr-[10px]  border-[1px] rounded-3p border-solid " onClick={()=>onclick_add_page_num()}>다음<img className="w-[20px] h-[20px]" ref={add_btn}/></button>
                <button className="flex justify-center items-center p-[5px] w-fit h-fit   border-[1px] rounded-3p border-solid " onClick={()=>{move_to_wirte_page()}}>토론작성</button>
            </div>
        



                


 

    </div>)
}


export default Disucssion