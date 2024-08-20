import { useEffect,useState } from "react"


import Link from "next/link";
import Login from "./login";
import { check_cookie,delete_cookie} from "./action";
import { useSelector,useDispatch } from "react-redux";
const LoginNav=()=>{
    const login_state=useSelector((state)=>state.login_state)
    const usedispatch=useDispatch();
    const logout_func=()=>{
        usedispatch({type:"LogOut"})
        delete_cookie();
        console.log("로그아웃진행")
    }
    const get_cookie_data=async ()=>{


       let state= await check_cookie();
       if(state){
       usedispatch({type:"Login"})}
       else{
        return ;
       }
    }


    useEffect(()=>{
        get_cookie_data();

    },[])



    return(
        <div className="inline-block">
       { login_state ? <Link href="/" className="mr-[60px]" onClick={()=>{logout_func()}}>로그아웃</Link> : <Link href="/login" className="mr-[60px]">로그인</Link>
        }
        </div>
        
    )

}

export default LoginNav;