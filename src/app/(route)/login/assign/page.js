"use client"
import { fetching_post_with_no_token } from "@/app/components/fetching";
import { useRouter } from "next/navigation";
import { useRef,useState } from "react"
const Assign_page=()=>{

    let router=useRouter();
    
    let mail_check=useRef(null);
    let email_number_check=useRef(null);
    let timer=useRef(null)
    let worker_ref=useRef(null);
    let refresh=useRef(null);
    let code=useRef(null);
    let id_exist_box=useRef(null);
    let Id=useRef(null);
    let Password=useRef(null);
    let PasswordCheck=useRef(null);
    let event_mem=useRef(null);
    let check_password_text=useRef(null);
    let id_check_text=useRef(null);
    let [password_check,set_password_check]=useState(false);
    let [email_check,set_email_check]=useState(false);
    let [auth_code,set_auth_code]=useState(false);
    let [id_exist,set_id_exist]=useState(true);
    let [id,set_id]=useState("")
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
    const id_exist_msg=process.env.NEXT_PUBLIC_ID_EXIST_SIGN;






    const timer_function=async ()=>{

        let data=await fetching_post_with_no_token(back_end_url+"requestmailauth",{
            mail_code:Id.current.value
        })

        if(data.success){

            const worker = new Worker('/timerworker.js');
            worker_ref.current=worker;
            let minutes=0;
            let seconds=0;
            worker.onmessage = function (e) {
                const { type, timeleft} = e.data;
                switch (type) {
                    case 'timer':
                        minutes = Math.floor(timeleft / 60000);
                        seconds = timeleft/1000%60;
                        timer.current.textContent=`${minutes}:${10>seconds ? 0:""}${seconds}`
                        break;
                    case 'timer-end':
                        timer.current.textContent="0:00"
                        worker.terminate(); // Worker 종료
                        worker.onmessage = null; // 이벤트 리스너 정리
                        break;
                }
            };
        
            worker.postMessage({ type: 'start-timer' });

        }
        else{

            console.log(data);
            alert("오류발생 다시시도해주세요")
        }
       return ;

    }

    const refresh_timer=()=>{
        console.log("타이머다시지작.")
        timer.current.textContent="2:00"
        worker_ref.current.terminate();
        worker_ref.current.onmessage=null;

        timer_function();


    }


    const check_email_user=()=>{
        if(email_check){
        set_id(Id.current.value)
        mail_check.current.classList.add("hidden")
        email_number_check.current.classList.remove("hidden")
        timer.current.classList.remove("hidden")
        refresh.current.classList.remove("hidden")
        timer_function();}
        else{

            mail_check.current.classList.remove("hidden")
            email_number_check.current.classList.add("hidden")
            timer.current.classList.add("hidden")
            refresh.current.classList.add("hidden")



            alert("id형식을 확인해주세요")
        }

    }




    const password_validation=()=>{

        if(Password.current.value!==""){
            
        
            if(event_mem.current!==null){
            
                clearTimeout(event_mem.current);
            }
    
            event_mem.current=setTimeout(()=>{check_password(Password.current.value)},300)

           // console.log(event_mem.current)
        }
        else{
            set_password_check(false);
        }
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


    const auth_number_check=async()=>{
        let data=await fetching_post_with_no_token(back_end_url+"mailauth",{
            email:Id.current.value,
            code:code.current.value
        })
        if(data.success){
                worker_ref.current.terminate();
                worker_ref.current.onmessage=null;
                set_auth_code(true);

        }
        else{

            alert("값이 다릅니다")

        }
    }


    
    
    const check_password=(text)=>{
        if(text!==PasswordCheck.current.value){

            check_password_text.current.classList.remove("invisible")
            set_password_check(false);
            set_password(PasswordCheck.current.value);
        }
        else{
            check_password_text.current.classList.add("invisible")
            set_password_check(true);
        }

    }

    const check_id_exist=async(event)=>{


        let data=await fetching_post_with_no_token(back_end_url+"idcheck",{email:Id.current.value,passowrd:""})

        if(data.msg===id_exist_msg){

            event.target.textContent="중복체크"
            id_exist_box.current.classList.remove("invisible");
            set_id_exist(true);
            return ;
            
        }


        id_exist_box.current.classList.add("invisible");
        set_id_exist(false);
        event.target.textContent="중복확인통과"

        return ;

        


    }

    const submit_func=async (event)=>{
        event.preventDefault();
        if(password_check&&email_check&&auth_code&&!id_exist){
            let data=await fetching_post_with_no_token(back_end_url+"assign",{email:Id.current.value,password:Password.current.value})
            if(data.success){


                router.push("/login")

            }
            else{

                alert("다시확인해주세요")
            }
        }
        else{



                alert("다시 확인해주세요")

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
                        <div className="text-[15px] w-fit h-fit" onClick={(event)=>{check_id_exist(event)}}>중복체크</div>
                        <div  ref={id_exist_box} className=" ml-[10px] text-[15px] text-red-400 invisible w-fit h-fit">이미 가입한 회원입니다.</div>
                    </div>
                    <div  ref={id_check_text} className="text-[15px] text-red-400 invisible w-fit h-fit">이메일 형식으로 해주세요</div>
                </div>




                <div className="flex mb-[5px] text-[15px] w-[400px]">
                    <input ref={code} className="mr-[5px] outline-none  border-solid border-slate-300 border-[1px] rounded"></input>

                    
                        <div ref={timer} className="mr-[5px] w-[47px] h-fit p-[5px] text-[15px] border-solid border-slate-300  border-[1px] rounded hidden">2:00</div>
                        <button ref={refresh} className="mr-[5px] w-fit h-fit p-[5px] text-[15px] border-solid border-slate-300  border-[1px] rounded hidden" onClick={()=>refresh_timer()}>재발급</button>
                        <button ref={email_number_check} className="w-fit h-fit p-[5px] text-[15px] border-solid border-slate-300  border-[1px] rounded hidden" onClick={()=>auth_number_check()}>번호 확인</button>
                  
                    
                    <div ref={mail_check} className="w-fit h-fit p-[5px] text-[15px] border-solid border-slate-300  border-[1px] rounded" onClick={()=>{check_email_user()}}>이메일 확인</div>
                </div>





                <div className="flex flex-col w-[400px] h-fit text-[15px] mb-[15px]">
                    <div className="mb-[5px]">Password</div>
                    <input className="outline-none  border-solid border-slate-300 border-[1px] rounded" type="password" ref={Password}></input>
                </div>

                
                <div className="flex flex-col w-[400px] h-fit text-[15px]">
                    <div className="mb-[5px] w-fit h-fit"> 비밀번호 일치 체크</div>
                    <input ref={PasswordCheck} className="outline-none  border-solid border-slate-300 border-[1px] rounded" onChange={()=>password_validation()}  type="password"></input>
                    <div  ref={check_password_text} className="text-[15px] text-red-400 invisible w-fit h-fit">비밀번호가 비었거나 일치하지 않습니다.</div>
                </div>
                
                
                <div className="flex mt-[10px] flex justify-end">
                    <button className="w-fit h-fit p-[5px] text-[15px] border-solid border-slate-300  border-[1px] rounded" onClick={(event)=>{submit_func(event)}}>submit</button>
                </div>
            </div>
        </div>


    </div>




    )
}


export default Assign_page;
