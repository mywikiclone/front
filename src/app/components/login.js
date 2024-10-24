"use client"
import { useRef } from "react"
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { set_cookie } from "./action";
import {fetching_post__with_token_forlogin} from "./fetching";
const Login=()=>{

    let Id=useRef(null);
    let Password=useRef(null);
    let usedispatch=useDispatch();
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL
    const router=useRouter();
    const none_member_sign=process.env.NEXT_PUBLIC_NONE_MEMBER_SIGN;
    const loginevent=async(event)=>{
        console.log("submit");
        event.preventDefault();
        let id=Id.current.value;
        let password=Password.current.value;


        let res=await fetching_post__with_token_forlogin(`${back_end_url}firlogin`,{email:id,
            password:password
        })

        if(res.success){
           
            usedispatch({type:"Change_User",userdata:{user_id:id}})
            router.push("/")
        }
        else{


            if(res.msg===none_member_sign){

                alert("없는 회원입니다");

            }

            Id.current.value=""
            Password.current.value=""

            alert("로그인 실패!")

        }

            return;



    }


    const assign=()=>{


        router.push("/login/assign");
    }

    return(

        <div className="w-full h-full flex flex-col items-center ">
            <div className="text-[20px]">로그인</div>
            <div className="w-fit h-fit">
                <div className="w-fit h-fit flex flex-col " >
            
            
                    <div className="flex flex-col mb-[5px] text-[15px] w-[400px]">
                        <div className="mb-[5px] w-fit h-fit">Email</div>
                        <input className="outline-none  border-solid border-slate-300 border-[1px] rounded"ref={Id}></input>
                    </div>
                    <div className="flex flex-col w-[400px] h-fit text-[15px]">
                        <div className="mb-[5px]">Password</div>
                        <input className="outline-none  border-solid border-slate-300 border-[1px] rounded" type="password" ref={Password}></input>
                    </div>

                    <div className="flex mt-[10px] flex justify-end">
                        
                        <button className="w-fit h-fit p-[5px] text-[15px] bg-blue-500 mr-[10px] border-solid border-slate-300 border-[1px] rounded" onClick={()=>{assign()}}>계정 만들기</button>
                        <button className="w-fit h-fit p-[5px] text-[15px] border-solid border-slate-300  border-[1px] rounded" onClick={(event)=>{loginevent(event)}}>submit</button>
                    </div>
                </div>
            </div>


        </div>



    )


}


export default Login;