"use client"
import { fetching_post_with_no_token } from "@/app/components/fetching";
import { useRouter } from "next/navigation";
import { useRef,useState } from "react"


const Assign_page2=()=>{

    let router=useRouter();
    
    
    let Id=useRef(null);
    

    let event_mem=useRef(null);

    let id_check_text=useRef(null);
   
    let [email_check,set_email_check]=useState(false);

    let [id_exist,set_id_exist]=useState(true);

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
    const id_exist_msg=process.env.NEXT_PUBLIC_ID_EXIST_SIGN;

    const redirect_handler=(text)=>{

    }

    const id_validation=()=>{

        if(Id.current.value!==""){
            
        
            if(event_mem.current!==null){
            
                clearTimeout(event_mem.current);
            }
    
            event_mem.current=setTimeout(()=>{check_id(Id.current.value)},300)

           // console.log(event_mem.current)
        }
        else{
            set_email_check(false)
        }
    }



    const check_id=(text)=>{
        if(text.match(regex)===null){

            id_check_text.current.classList.remove("invisible")
            set_email_check(false)
        }
        else{
            id_check_text.current.classList.add("invisible")
            set_email_check(true);
        }

    }


 


    


    const check_id_exist=async(event)=>{

        event.target.textContent="잠시만 기다려주세요..."
        let data=await fetching_post_with_no_token(back_end_url+"idcheck",{email:Id.current.value,passowrd:""},redirect_handler)

    
        if(data.success){
        
        set_id_exist(false);
        event.target.textContent="없는 아이디입니다."

        return ;
        }



        event.target.textContent="o"
           
        set_id_exist(true);
        return ;
        


    }

    const submit_func=async (event)=>{
        event.preventDefault();
        if(email_check&&id_exist){
          
            let data=await fetching_post_with_no_token(back_end_url+"requestpassword",{mail_code:Id.current.value},redirect_handler)
            if(data.success){

                alert("임시 비밀번호를 발급했습니다. 로그인후 교체해주세요")
                router.push("/login")

            }
           return ;
        }
        else{
            if(!email_check){
                alert("이메일 형식을 해주세요")
                return ;
            }
            if(!id_exist){
                alert("id존재여부를 체크해주세요")
                return ;
            }
   


        }
       return ;
    }





    return(

        <div className="w-full h-full flex flex-col items-center ">
        <div className="text-[20px]">회원가입</div>
        <div className="w-fit h-fit">
            <div className="w-fit h-fit flex flex-col " >
                <div className="flex flex-col mb-[5px] text-[15px] w-[400px]">
                    <div className="mb-[5px] w-fit h-fit">Email</div>
                    <input type="email" className="outline-none  border-solid border-slate-300 border-[1px] rounded" onChange={()=>id_validation()} ref={Id}></input>
                    
                    <div className="flex w-fit h-fit">
                        <div className="text-[15px] w-fit h-fit" onClick={(event)=>{check_id_exist(event)}}>가입여부</div>
                    </div>
                    <div  ref={id_check_text} className="text-[15px] text-red-400 invisible w-fit h-fit">이메일 형식으로 해주세요</div>
                </div>
                
                
                <div className="flex mt-[10px] flex justify-end">
                    <button className="w-fit h-fit p-[5px] text-[15px] border-solid border-slate-300  border-[1px] rounded" onClick={(event)=>{submit_func(event)}}>submit</button>
                </div>
            </div>
        </div>


    </div>




    )
}


export default Assign_page2;
