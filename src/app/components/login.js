"use client"
import { useRef,useState } from "react"
import { useRouter } from "next/navigation";
import { useDispatch} from "react-redux";

import {fetching_post__with_token_forlogin} from "./fetching";


const Login=()=>{

    let Id=useRef(null);
    let Password=useRef(null);
    let usedispatch=useDispatch();
    let [secure_login,set_secure_login]=useState(false);    
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL
    const router=useRouter();
    const excced_sign=process.env.NEXT_PUBLIC_EXCEED_ACCESS_SIGN;
  
    const handle_redirect=(text)=>{

    }
    const loginevent=async(event)=>{

        event.preventDefault();
        event.target.textContent="대기중..."
        event.target.disabled=true;
        let id=Id.current.value;
        let password=Password.current.value;

        if(secure_login){
            let res=await fetching_post__with_token_forlogin(`${back_end_url}securelogin`,{email:id,
                password:password
            },handle_redirect)
    
            if(res.success){
    
                usedispatch({type:"Change_User",userdata:{user_id:id}})
               
               
               
                //router.psuh는 비동기적으로작동한다 
               router.push("/")
            }
            else{
           
                event.target.textContent="submit"
                event.target.disabled=false;
                Password.current.value=""
                return ;
    
            }


        }
        else{
            console.log("normallogin");
            let res=await fetching_post__with_token_forlogin(`${back_end_url}firlogin`,{email:id,
            password:password
            },handle_redirect)

            if(res.success){

                usedispatch({type:"Change_User",userdata:{user_id:id}})
                event.target.textContent="submit"
                event.target.disabled=false;
                router.push("/")
            }
            else{

                event.target.textContent="submit"
                event.target.disabled=false;
                if(res.msg===excced_sign){

                    set_secure_login(true);
                    return;
                }

           
                Id.current.value=""
                Password.current.value=""

            }
        }





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
                    

                        { secure_login ?  
                          <div className="flex flex-col w-[400px] h-fit text-[15px]">
                            <div className="mb-[5px] ">이미 전송된 혹은 이제 전송된 이메일 인증코드를 넣어주세요 기간은 10분입니다.</div>
                            <input className="outline-none  border-solid border-slate-300 border-[1px] rounded" type="password" ref={Password}></input>
                          </div>
                        
                        
                        :
                        <div className="flex flex-col w-[400px] h-fit text-[15px]">
                            <div className="mb-[5px]">Password</div>
                            <input className="outline-none  border-solid border-slate-300 border-[1px] rounded" type="password" ref={Password}></input>
                        </div>
                        }
                         
                    
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