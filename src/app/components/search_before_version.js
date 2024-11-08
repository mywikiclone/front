import {useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { fetching_get_with_no_token, fetching_post__with_token_and_csrf} from './fetching';
import { useDispatch,useSelector } from 'react-redux';
import Nothing from './nothing';
import { clear_redirect_path, set_redirect_path } from '../reducers/redirect_path';

const Search_before_version=({id})=>{
    const dispatch=useDispatch();
    
    const [error,set_error]=useState(false);
    const [content_id,set_content_id]=useState(0);
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
    const relogin_sign=process.env.NEXT_PUBLIC_RELOGIN_SIGN;
    const router=useRouter();
    
    const [change_text,set_change_text]=useState("nothing");
    const [change_title,set_change_title]=useState("title");
    const current_redirect_path=useSelector((state)=>state.current_redirect_path);
    //fetch 문으로 글 내용을 가져오는 과정-->추후에작성
    
    const redirect_handler=()=>{

        dispatch({type:"Change_User",userdata:{user_id:""}})
        dispatch(set_redirect_path())


    }
    const revert_text=async (event)=>{
        
        console.log(event.target.parentElement.parentElement.children[1].value)
        let text=event.target.parentElement.parentElement.children[1].value
        let title=event.target.parentElement.parentElement.children[0].textContent
        let response=await fetching_post__with_token_and_csrf(`${back_end_url}update`,{content_id:content_id,title:title,content:text},redirect_handler)
        /*if(response.msg===relogin_sign){
           
            dispatch({type:"Change_User",userdata:{user_id:""}})

            router.push("/login")

        }*/
       if(response.success){
        
       
        router.push(`/currentversion/${title}`)
        }

        else{


            alert("권한부족 혹은 알수없는 오류입니다");

            set_error(false);
            /*if(response.msg===relogin_sign){
                dispatch({type:"Change_User",userdata:{user_id:""}})
                router.push("/login")



            }*/

            return ;

        }
        
       return;
    }

    const get_log_text=async ()=>{


        let data=await fetching_get_with_no_token(`${back_end_url}changelog/${id}`,redirect_handler)
        console.log("data:",data);
        if(data.success){
            set_change_text(data.data.content);
            set_change_title(data.data.title)
            set_content_id(data.data.content_id)
            console.log("콘텐트id:",data.data.content_id)


            return ;
        }
  
        set_error(true);
      
       return ;
    
    }

    useEffect(()=>{
        get_log_text()
        dispatch(clear_redirect_path())
    },[])
    useEffect(()=>{
        if(current_redirect_path.path){

            router.push(current_redirect_path.path);
        }


    },[current_redirect_path])


    return(
        <div className="flex h-screen w-full justify-center lg:items-center items-start">

            {error ? <Nothing/> :

            <div className=" flex flex-col  items-center  text-[24px] w-full h-95p">
                <div className="lg:w-90p w-full text-left h-[75px] border-solid border-[1px] border-b-0 text-[50px]">{change_title}</div>
                <textarea  disabled className="lg:w-90p w-full text-left h-70p border-solid border-[1px] resize-none overflow-auto text-[20px]"
                value={change_text}>
                                           
                </textarea>
                <div className="flex lg:w-90p w-full  h-auto justify-end">
                    <button className="border-solid border-[2px] border-salte-200 rounded-3p"
                    onClick={(event)=>revert_text(event)}>
                        되돌리기
                    </button>
                </div>
            </div>
            }
        </div>
    )




}



export default Search_before_version