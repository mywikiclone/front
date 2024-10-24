
"use client"
import { useEffect,useRef,useState } from "react"
import Link from "next/link";
import Login from "./login";

import { useSelector,useDispatch } from "react-redux";
import { fetching_get_with_token,fetching_get_with_no_token, fetching_post__with_token_forlogin } from "./fetching";



const LoginNav=()=>{
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
    const [popup,set_popup]=useState(false);
    let [login_status,set_login_status]=useState("비로그인");
    const usedispatch=useDispatch();
    const current_user_data=useSelector((state)=>state.current_userdata)
   
    const current_pop_up=useRef(null);
    const logout_func=async ()=>{
        set_popup(false)
        let data=await fetching_get_with_token(back_end_url+"logout")
        set_login_status("비로그인")
        usedispatch({type:"Change_User",userdata:{user_id:""}})
    


        console.log("로그아웃진행")
       
    }

    const show_login_popup=()=>{
        console.log("click")
     
        set_popup(true);
       
    }

    const login_func=()=>{
      
        set_popup(false)
      

    }

    const check_mouse_in=(event)=>{

        if(current_pop_up.current!==null&&!current_pop_up.current.contains(event.target)){

            set_popup(false);

        }

    }


    const check_login=async()=>{



        let data=await fetching_post__with_token_forlogin(back_end_url+"checkloginstate",{})
        console.log("login_data:",data);
    
        if(data.success){
            console.log("쿠키가존재하므로 로그인으로 간주")
        usedispatch({type:"Change_User",userdata:{user_id:data.data.email}})

        }
        else{
            console.log("로그인 안된상황!")
            //let user_ip=get_user_ip();
        usedispatch({type:"Change_User",userdata:{user_id:""}})
        }
        
        
    }
    useEffect(()=>{

        //chek_login_state로 최초 페이지 입장시에 쿠키값으로 백엔드에 애가 유효한 쿠키인지 즉
        //즉 로그인 상태가 아직 유지되는지 체크를하기--->이걸 바탕으로 로그인 ,로그아웃 여부를 결정.
        //이 api의 return값으로는 로그인이 맞다면은!===> 사용자의id값을 반환.
        //아니라면 ip값을 반환!
        
        check_login();


    },[])


    useEffect(()=>{
        console.log("현재데이터:",current_user_data.user_id);
     
        if(current_user_data.user_id!==""){
            set_login_status(current_user_data.user_id);
            return ;
        }
        set_login_status("비로그인")
        return ;
        


        
 
    },[current_user_data])


    useEffect(()=>{
        if(popup){
            document.addEventListener("mousedown",check_mouse_in)}
        else{
            document.removeEventListener("mousedown",check_mouse_in)
        }


        return ()=>{
            document.removeEventListener("mousedown",check_mouse_in)
        }
    
    },[popup])



    return(
        <div className="relative">
            
            <button  className=" w-[50px] h-fit " onClick={()=>{show_login_popup()}}>로그인</button>
            
        {
         popup ?   <div ref={current_pop_up} className="absolute bottom-[-140px] z-50 bg-white border-solid border-[1px] border-slate-300 w-[200px] h-fit rounded">

            <div className="w-full h-fit p-[10px] text-[15px]">{login_status}</div> 
            
            <div className="w-full h-fit p-[10px]  text-[15px]">설정</div> 


            <div className="w-full h-fit text-[15px] border-t-[1px] p-[10px]  border-solid border-slate-300">
            { current_user_data.user_id!=="" ? <Link className="w-full h-fit" href="/" onClick={()=>{logout_func()}} >로그아웃</Link> 
            : <Link className="w-full h-fit" href="/login" onClick={()=>{login_func()}} >로그인</Link>
            
            }
            </div>


         </div> :null
        }
        </div>
        
    )

}

export default LoginNav;