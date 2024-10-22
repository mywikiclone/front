"use client"
import { fetching_post__with_token, fetching_post_with_no_token } from "@/app/components/fetching";
import { useRouter } from "next/navigation";
import { useRef } from "react"
import { useDispatch } from "react-redux";



const MakeDiscussion=()=>{
    let title=useRef(null);
    let subject_title=useRef(null);
    let days=useRef(null)
    let back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
    let router=useRouter();
    let usedispatch=useDispatch();
    let introduction_texts=useRef(null)
    const relogin_sign=process.env.NEXT_PUBLIC_RELOGIN_SIGN;
    const makediscussion=async (event)=>{
        event.preventDefault();
        let title_to_send=title.current.value.trim();

        console.log("title_to_send:",title_to_send);
        /*let data=await fetching_post__with_token(`${back_end_url}topicsave`,{topic_title:title_to_send,subject_title:subject_title.current.value.trim(),deadline:Number(days.current.value.trim()),introduction_text:introduction_texts.current.value})


        if(data.success){
    
        
            router.push(`/discussion/${data.data.topic_id}`)
        }
        else{

            if(data.msg===relogin_sign){

                    usedispatch({type:"Change_User",userdata:{user_id:""}})

                    router.push("/login")
            }


            alert("제출 실패!")
        }*/
       return ;

    }

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