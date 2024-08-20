"use client"
import { useRef } from "react"
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { set_cookie } from "./action";
const Login=()=>{

    let dispatch=useDispatch();


    let Id=useRef(null);
    let Password=useRef(null);
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL
    const router=useRouter();

    const loginevent=async(event)=>{
        event.preventDefault();
        let id=Id.current.value;
        let password=Password.current.value;


        let res=await fetch(`${back_end_url}firlogin`,{
            method:"POST",
            body:JSON.stringify({email:id,
                password:password
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })

        if(res.ok){
            let data=await res.json();
            console.log("성공:",data);
            set_cookie(data.data);
            dispatch({type:"Login"})
                router.push("/")
        }
        else{
            Id.current.value=""
            Password.current.value=""

            alert("로그인 실패!")

        }


    }

    return(

        <div className="w-full h-full">

            <form className="w-[100px] h-[100px]" onSubmit={(event)=>{loginevent(event)}}>
                <input ref={Id} placeholder="id:"></input>
                <input type="password" ref={Password}placeholder="password:"></input>
                <button>submit</button>
            </form>


        </div>



    )


}


export default Login;