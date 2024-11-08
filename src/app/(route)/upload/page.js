"use client"

import { useRef } from "react";


const RequestUploading= ()=>{
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
    const cant_find_msg=process.env.NEXT_PUBLIC_CANT_FIND_ERROR;
    const etc_error_msg=process.env.NEXT_PUBLIC_ETC_ERROR_SIGN;
    const btn_ref=useRef(null);
    const submit_event=async (event)=>{

        event.preventDefault();

        let formdata=new FormData(event.target);
        

        btn_ref.current.textContent="진행중..."

        let data=await fetch(back_end_url+"upload",{
            method:"POST",
            body:formdata
        })
        .then((res)=>{

            return res.json();
        })

        console.log("msg:",data.msg===etc_error_msg);

        if(data.msg===cant_find_msg){


            alert("파일이 없거나 혹은 파일 확장자명등을 확인해주세요")
            btn_ref.current.textContent="업로드"
            return ;
        }

        if(data.msg===etc_error_msg){


            alert("파일 크기가 너무 크거나 이미 존재하는 이름입니다")
            btn_ref.current.textContent="업로드"
            return ;
        }


        btn_ref.current.textContent="성공"

        return ;

    }



    return(

        <div className="w-full h-fit bg-white flex flex-col items-center">


            <div className="lg:w-90p flex justify-center w-full h-fit text-[30px] mb-[10px]">
                자료 올리기
            </div>
            <div className="lg:w-90p w-full flex justify-center truncate h-fit text-[15px] mb-[10px]">주의:2mb이하로 해주세요.파일이름은 검색에 이용됩니다 png,jpeg가능</div>
            <div className="lg:w-90p w-full flex justify-center p-[10px]  h-fit mb-[10px] text-[15px] ">
                
                <form className="flex items-center" onSubmit={(event)=>submit_event(event)}  enctype="multipart/form-data">
            
                    <input className="w-[200px] h-fit border-solid border-[1px] border-slate-300 mr-[10px]" type="file" id="image" name="filedata" accept=".png, .jpeg, image/png, image/jpeg" required></input>
                    <button ref={btn_ref} className="border-solid border-[1px] border-slate-300 w-fit  h-fit " type="submit">업로드</button>
                </form>


            </div>




        </div>

    )


}


export default RequestUploading;