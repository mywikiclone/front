"use client"
import { useRouter } from "next/navigation";
import { fetching_get_with_no_token } from "./fetching"
import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux";

const Disucssion=()=>{
    let [topiclist,settopiclist]=useState([]);
    let [page_num,set_page_num]=useState(0);
    const router=useRouter();
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL
    const current_discussion=useSelector((state)=>state.current_discussion);
    const dispatch=useDispatch();
    
    const get_topic_list=async()=>{


       /* let data=await fetching_get_with_no_token(`${back_end_url}topiclist/${page_num}`)
        if(data.success){
        
        
            settopiclist(data.data);
            return ;
        
        }
        settopiclist([]);*/

        return;
        
        

    }

    const move_to_topic=(topic_id)=>{


        router.push(`discussion/${topic_id}`)

    }


    const move_to_wirte_page=()=>{


        router.push("discussion/write")
    }
    const onclick_add_page_num=async ()=>{



        /*let data=await fetching_get_with_no_token(`${back_end_url}topiclist/${page_num+1}`)

        if(data.success){
            settopiclist(data.data)
            set_page_num(page_num+1)
        }
        else{
            return ;
        }*/

            return ;

   
    }

    const onclick_minus_page_num=async()=>{
        if(page_num===0){
            return;
        }
        else{


            /*let data=await fetching_get_with_no_token(`${back_end_url}topiclist/${page_num-1}`)

            if(data.success){
    
            settopiclist(data.data)
            set_page_num(page_num-1)}
            else{
                return ;
            }*/

            return ;
        }
    }









    useEffect(()=>{


        get_topic_list()



    },[])



    return( <div>


        {topiclist.map((x,idx)=>(


        <div key={idx}  onClick={()=>move_to_topic(x.topic_id)}>
            <div>

                {x.writer_email}:{x.topic_title}
            </div>
           


        </div>            


        ))}



        <div className="lg:w-90p w-full flex flex-col text-[15px]">



            <div className="flex h-[35px] w-[200px]">
                <button className="flex justify-center items-center p-[5px] w-fit h-fit   border-[1px] rounded-3p border-solid" onClick={()=>onclick_minus_page_num()}>이전</button>
                <button className="flex justify-center items-center p-[5px] w-[35px] h-fit ">{page_num+1}</button>
                <button className="flex justify-center items-center p-[5px] w-fit h-fit   border-[1px] rounded-3p border-solid " onClick={()=>onclick_add_page_num()}>다음</button>
                <button className="flex justify-center items-center p-[5px] w-fit h-fit   border-[1px] rounded-3p border-solid " onClick={()=>{move_to_wirte_page()}}>토론작성</button>
            </div>
        
        </div>


                


 

    </div>)
}


export default Disucssion