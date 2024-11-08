"use client"
import { fetching_post__with_token_and_csrf} from "@/app/components/fetching";
import { clear_redirect_path, set_redirect_path } from "@/app/reducers/redirect_path";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";



const MakeDiscussion=()=>{
    let title=useRef(null);
    let subject_title=useRef(null);
    let days=useRef(null)
    let back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
    let router=useRouter();
    let usedispatch=useDispatch();
    let introduction_texts=useRef(null)
    const current_redirect_path=useSelector((state)=>state.current_redirect_path);
    const redirect_handler=(text)=>{

        usedispatch({type:"Change_User",userdata:{user_id:""}})
        usedispatch(set_redirect_path(text));

    }
    const makediscussion=async (event)=>{
        event.preventDefault();
        let title_to_send=title.current.value.trim();


    

        title_to_send=title_to_send;
        introduction_texts=introduction_texts.current.value;
        subject_title=subject_title.current.value.trim()
        let deadline=days.current.value.trim()
        let data=await fetching_post__with_token_and_csrf(`${back_end_url}topicsave`,{topic_title:title_to_send,subject_title:subject_title,deadline:deadline,introduction_text:introduction_texts},redirect_handler)


        if(data.success){
    
        
            router.push(`/discussion/${data.data.topic_id}`)
        }
        else{
            /*if(data.msg===relogin_sign){


                usedispatch({type:"Change_User",userdata:{user_id:""}})
                router.push("/login")
            }*/
            return ;


        }

       return ;

    }
    useEffect(()=>{

        usedispatch(clear_redirect_path())

    },[])

    useEffect(()=>{

        if(current_redirect_path.path){
            router.push(current_redirect_path.path);
        }

    },[current_redirect_path])





    return(

        <div className="lg:w-90p w-full flex justify-center items-around">
            <form className="flex flex-col items-center justify-center text-[15px] my-[10px]" onSubmit={(event)=>makediscussion(event)}>
                <input type="text" className="outline-none border-solid border-[1px] border-slate-300 rounded-sm w-[300px] mb-[10px]" ref={subject_title} placeholder="관련 문서명"></input>
                <input  type="text"className="w-[300px] outline-none border-solid border-[1px] border-slate-300 rounded-sm mb-[10px]" ref={title} placeholder="제목을 입력해주세요"></input>




                <div className="w-[300px] flex flex-col items-end">
                <input type="text" className="w-full outline-none border-solid border-[1px] border-slate-300 rounded-sm mb-[10px]" ref={days} placeholder="일단위로 데드라인"></input>  

                <textarea ref={introduction_texts} maxlength="250" className="w-full h-[200px] outline-none resize-none border-[1px] border-slate-300 rounded-sm  mb-[10px]" placeholder="간단한 토론 소개글"></textarea> 
               
                <button type="submit" className="w-fit h-fit p-[5px] border-solid border-[1px] border-slate-300 rounded-sm" >작성</button>
                </div>
            </form>
                

        </div>


    )



}


export default MakeDiscussion