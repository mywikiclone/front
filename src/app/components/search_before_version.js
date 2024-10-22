import {useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { fetching_get_with_no_token,fetching_post__with_token,make_storage_logout} from './fetching';
import { useDispatch,useSelector } from 'react-redux';
const Search_before_version=({id})=>{
    const dispatch=useDispatch();
    
    const ids=id;
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
    const relogin_sign=process.env.NEXT_PUBLIC_RELOGIN_SIGN;
    const router=useRouter();
    console.log("beforeversion!")
    const [change_text,set_change_text]=useState("nothing");
    const [change_title,set_change_title]=useState("title");
    //fetch 문으로 글 내용을 가져오는 과정-->추후에작성.
    const revert_text=async (event)=>{
        
        console.log(event.target.parentElement.parentElement.children[1].value)
        let text=event.target.parentElement.parentElement.children[1].value
        let title=event.target.parentElement.parentElement.children[0].textContent
        let response=await fetching_post__with_token(`${back_end_url}update`,{content_id:id,title:title,content:text})
        if(response.msg===relogin_sign){
           
            dispatch({type:"Change_User",userdata:{user_id:""}})

            router.push("/login")

        }
        else{

    

            console.log("업데이트 성공")
            router.push(`/currentversion/${title}`)


        }
    }

    const get_log_text=async ()=>{


        let data=await fetching_get_with_no_token(`${back_end_url}changelog/${id}`)
        console.log("data:",data);
        if(data.success){
            set_change_text(data.data.content);
            set_change_title(data.data.title)}
        
    
    }

    useEffect(()=>{
        get_log_text()
    },[])


    return(
        <div className="flex h-screen w-full justify-center lg:items-center items-start">
            <div className=" flex flex-col  items-center border-[2px] text-[24px] w-full h-95p">
                <div className="lg:w-90p w-full text-left h-[75px] bg-blue-200 text-[50px]">{change_title}</div>
                <textarea  disabled className="lg:w-90p w-full text-left h-70p bg-slate-200 overflow-auto text-[20px]"
                value={change_text}>
                                           
                </textarea>
                <div className="flex lg:w-90p w-full  h-auto justify-end">
                    <button className="border-solid border-[2px] border-salte-200 bg-blue-200"
                    onClick={(event)=>revert_text(event)}>
                        되돌리기
                    </button>
                </div>
            </div>
        </div>
    )




}



export default Search_before_version