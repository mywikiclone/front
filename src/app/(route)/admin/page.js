"use client"
import { fetching_get_with_no_token, fetching_get_with_token_and_csrf, fetching_post__with_token_and_csrf } from "@/app/components/fetching";
import { clear_redirect_path, set_redirect_path } from "@/app/reducers/redirect_path";


import {  useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
const AdminPage=()=>{

    const router=useRouter()
    const dispatch=useDispatch();
    const backendurl=process.env.NEXT_PUBLIC_BACK_END_URL;
    const current_redirect_path=useSelector((state)=>state.current_redirect_path);
    const user_data_window=useRef(null);
    const content_data_window=useRef(null);
    const input_box=useRef(null);
    let [finded_user_data,set_finded_user_data]=useState(null);
    const content_input_box=useRef(null);
    let [finded_content_data,set_finded_content_data]=useState(null);
    const change_btn=useRef(null);
    const change_btn2=useRef(null);
    let [popup,set_popup]=useState(false);
    let [admin,set_admin]=useState(false);
    let [content_admin,set_content_admin]=useState(false);
    let [content_list,set_content_list]=useState([]);


    const handle_redirect=(text)=>{

        dispatch(set_redirect_path(text));
    
    }



    const checkadmin=async ()=>{
        
        let data=await fetching_get_with_token_and_csrf(`${backendurl}admin/check`,handle_redirect)

        /*if(!data.success){
            alert("허용된 이용자가아닙니다")

            router.push("/")
        }*/


        set_popup(true);

    }


    const get_content_list=async()=>{

         let data= await fetching_get_with_no_token(`${backendurl}admin/contentlist`,handle_redirect);

         if(!data.success){

            /*if(data.msg===admin_error_msg){

                alert("권한 부족")
                router.push("/")
            }*/


            set_content_list([]);

            return ;
         }
        set_content_list(data.data);

    }
    const show_admin_set_window=()=>{

        set_admin(!admin);

    }
    const show_content_admin_set_window=()=>{

        set_content_admin(!content_admin);

    }



    const get_user_data=async()=>{

       
       let data=await fetching_post__with_token_and_csrf(`${backendurl}admin/finduser`,{email:input_box.current.value,password:""},handle_redirect)
       if(!data.success){


            /*if(data.msg===admin_error_msg){

               alert("권한 부족")
                router.push("/")
            }*/
           // alert("없는 회원입니다")
            set_finded_user_data(null);
            return;
        }
      
      
       set_finded_user_data(data.data);


    }
    const get_content_data=async()=>{
        let data=await fetching_get_with_token_and_csrf(`${backendurl}admin/content/${content_input_box.current.value}`,handle_redirect)
        
        if(!data.success){

            /*if(data.msg===admin_error_msg){

                alert("권한 부족")
                router.push("/")
            }*/



            //alert("없는자료입니다.")
            set_finded_content_data(null);
            return;
        }
        
        set_finded_content_data(data.data);
     }
    const changeadmin=async(event)=>{

         event.preventDefault();
         console.log(event.target.admin.value)
         change_btn.current="대기중..."
         let data= await  fetching_post__with_token_and_csrf(`${backendurl}admin/changeuser`,{email:finded_user_data.email,grade:event.target.admin.value},handle_redirect)
        if(!data.success){

           /* if(data.msg===admin_error_msg){

                alert("권한 부족")
                router.push("/")
            }*/





            alert("오류발생 다시시도해주세요");


            change_btn.current="재시도"
            return;
        }

        set_admin(false);
        finded_user_data.grade=data.msg;
        change_btn.current="변경"
        return;

    }

    const change_contentadmin=async(event)=>{

        event.preventDefault();
    
        change_btn.current="대기중..."
        let data= await  fetching_post__with_token_and_csrf(`${backendurl}admin/contentadmin`,{content_id:finded_content_data.content_id,grade:event.target.content.value},handle_redirect)
       if(!data.success){


        /*if(data.msg===admin_error_msg){

            alert("권한 부족")
            router.push("/")
        }*/






           alert("오류발생 다시시도해주세요");


           change_btn.current="변경"
           return;
       }

       set_admin(false);
       set_finded_content_data({...finded_content_data,grade:event.target.content.value})
       change_btn.current="변경"
       return;

   }




    useEffect(()=>{

       dispatch(clear_redirect_path())
       checkadmin();
    

    },[])

    useEffect(()=>{
        if(current_redirect_path.path){
            router.push(current_redirect_path.path)
        }
    },[current_redirect_path])




    return(
        <div className="lg:w-90p w-full h-fit flex flex-col items-center">
            {
                !popup ? "검증중...." 
                : <div className="w-full flex flex-col h-fit items-center justify-center my-[5px]">
                    <div className="w-fit h-fit flex mb-[10px] items-center">
                        <input ref={input_box} className="w-[200px] h-fit mr-[10px] border-solid border-[1px] border-slate-500 outline-none"  type="text" placeholder="유저 검색기"/>
                        <button onClick={()=>get_user_data()} className="p-[5px] h-fit text-[12px] w-[40px] h-fit border-solid border-[1px] border-slate-500">검색</button>
                    </div>

                     {finded_user_data ===null ? null :
                    <div ref={user_data_window} className="w-[300px] h-fit border-solid border-[1px] border-slate-300 flex flex-col mb-[10px]">
                        
                        <div className="w-full h-fit border-solid border-b-[1px] border-slate-300 p-[5px] text-[15px]">이메일:{finded_user_data.email}</div>
                        <div className="w-full flex flex-col h-fit border-solid border-b-[1px] border-slate-300 p-[5px] text-[15px]">
                          권한:{finded_user_data.grade}
                          
                            <button className="w-fit h-fit text-[12px]" onClick={()=>{show_admin_set_window()}}>재설정</button>
                            {admin ?
                                <div className="w-full h-fit text-[12px] flex border-[1px] p-[5px] border-slate-200">
                                <form className="W-full h-fit" onSubmit={(event)=>changeadmin(event)} >
                                 
                                        <div>
                                            <input type="radio" name="admin" value="User" id="User" /><label for="User">User</label>
                                        </div>
                                        <div>
                                             <input type="radio" name="admin" value="Admin" id="Admin"/><label for="Admin">Admin</label>
                                        </div>
                                        <div className="mb-[5px]">
                                            <input type="radio" name="admin" value="Ban" id="Ban"/><label for="Ban">Ban</label>
                                        </div>
                                       
                                  
                                    <button ref={change_btn} className="w-30px h-fit border-solid border-[1px]">변경</button>
                                </form>
                                </div> :null
                            }
                          </div>
                
                        <div className="w-full h-fit p-[5px] border-solid border-slate-300 border-t-[1px] text-[15px]">가입날짜:{finded_user_data.create_time.substring(0,16).replace("T","-")}</div>
                  

                    </div>

               
                    }


                    <div className="w-full flex flex-col h-fit items-center justify-center my-[5px]">

                        <input ref={content_input_box} className="w-[200px] h-fit mr-[10px] border-solid border-[1px] border-slate-500 outline-none"  type="text" placeholder="게시글 검색기"></input>
                        <button onClick={()=>get_content_data()} className="p-[5px] h-fit text-[12px] w-[40px] h-fit border-solid border-[1px] border-slate-500">검색</button>
                    </div>
                    {finded_content_data ===null ? null :
                    <div ref={content_data_window} className="w-[300px] h-fit border-solid border-[1px] border-slate-300 flex flex-col mb-[10px]">
                        <div className="w-full h-fit border-solid border-b-[1px] border-slate-300 p-[5px] text-[15px]">아이디:{finded_content_data.id}</div>
                        <div className="w-full h-fit border-solid border-b-[1px] border-slate-300 p-[5px] text-[15px]">제목:{finded_content_data.title}</div>
                        <div className="w-full h-fit border-solid border-b-[1px] border-slate-300 p-[5px] text-[15px]">작성자:{finded_content_data.email}</div>
                        <div className="w-full flex flex-col h-fit border-solid border-b-[1px] border-slate-300 p-[5px] text-[15px]">
                          권한:{finded_content_data.grade}
                          
                            <button className="w-fit h-fit text-[12px]" onClick={()=>{show_content_admin_set_window()}}>재설정</button>
                            {content_admin ?
                                <div className="w-full h-fit text-[12px] flex border-[1px] p-[5px] border-slate-200">
                                <form className="W-full h-fit" onSubmit={(event)=>change_contentadmin(event)} >
                                 
                                        <div>
                                            <input type="radio" name="content" value="User" id="User" /><label for="User">User</label>
                                        </div>
                                        <div>
                                             <input type="radio" name="content" value="Admin" id="Admin"/><label for="Admin">Admin</label>
                                        </div>
                                        <div className="mb-[5px]">
                                            <input type="radio" name="content" value="Ban" id="Ban"/><label for="Ban">Ban</label>
                                        </div>
                                       
                                  
                                    <button ref={change_btn2} className="w-30px h-fit border-solid border-[1px]">변경</button>
                                </form>
                                </div> :null
                            }
                          </div>
                
                          <div className="w-full h-fit p-[5px] border-solid border-slate-300 border-t-[1px] text-[15px]">작성일:{finded_content_data.create_time.substring(0,16).replace("T","-")}</div>
                          <div className="w-full h-fit p-[5px] border-solid border-slate-300 border-t-[1px] text-[15px]">수정일:{finded_content_data.update_time.substring(0,16).replace("T","-")}</div>

                    </div>

               
                    }


                    


                </div>



            }

        </div>
    )




}


export default AdminPage;