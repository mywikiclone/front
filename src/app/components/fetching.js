"use client"
const relogin_sign=process.env.NEXT_PUBLIC_RELOGIN_SIGN;
const id_exist_sign=process.env.NEXT_PUBLIC_ID_EXIST_SIGN
const member_no_sign=process.env.NEXT_PUBLIC_NONE_MEMBER_SIGN;
const csrf_error_sign=process.env.NEXT_PUBLIC_CSRF_ERROR_SIGN;
const email_send_fail_sign=process.env.NEXT_PUBLIC_SEND_FAIL;
const cant_find_error_sign=process.env.NEXT_PUBLIC_CANT_FIND_ERROR;
const etc_error_sign=process.env.NEXT_PUBLIC_ETC_ERROR_SIGN;
const no_data_error=process.env.NEXT_PUBLIC_NO_DATA_ERROR;
const admin_error_msg=process.env.NEXT_PUBLIC_ADMIN_ERROR;
const excced_sign=process.env.NEXT_PUBLIC_EXCEED_ACCESS_SIGN;

const Response_switch_handler=(data,handle_redirect)=>{
    /*let dispatch=useDispatch();

    const router=useRouter();*/
   
    switch(data.msg){

        case relogin_sign:
        case csrf_error_sign:
            handle_redirect("/login");
            return {success:false,msg:data.msg,data:data.data};

        case id_exist_sign:
            return {success:false,msg:data.msg,data:data.data};

            
        case excced_sign:

            return {success:false,msg:data.msg,data:data.data};


        case cant_find_error_sign:
        case no_data_error:
            return {success:false,msg:data.msg,data:data.data};

        case admin_error_msg:
            alert("권한이 부족합니다");
            handle_redirect("/")
            return {success:false,msg:data.msg,data:data.data};


        case member_no_sign:
            alert("존재하지 않는 회원입니다");
            return {success:false,msg:data.msg,data:data.data};

        /*case email_send_fail_sign:
            alert("해당 메일로 전송을 실패했습니다.다시 시도 혹은 메일을 다시검증해주세요")
            return {success:false,msg:data.msg,data:data.data};*/

 
        case etc_error_sign:
            alert("오류 발생 다시시도해주세요")
            return {success:false,msg:data.msg,data:data.data};

     

        default:
           
            return {success:true,msg:data.msg,data:data.data};


    }



}











/*const Response_switch_handler=(data)=>{
    let dispatch=useDispatch();

    const router=useRouter();
   
    switch(data.msg){

        case relogin_sign:
        case id_exist_sign:
        case csrf_error_sign:
        case cant_find_error_sign:
        case no_data_error:
            return {success:false,msg:data.msg,data:data.data};




        case member_no_sign:
            alert("존재하지 않는 회원입니다");
            return {success:false,msg:data.msg,data:data.data};

        case email_send_fail_sign:
            alert("해당 메일로 전송을 실패했습니다.다시 시도 혹은 메일을 다시검증해주세요")
            return {success:false,msg:data.msg,data:data.data};

 
        case etc_error_sign:
            alert("오류가 발생했습니다.다시 시도해주세요");
            return {success:false,msg:data.msg,data:data.data};

     

        default:
           
            return {success:true,msg:data.msg,data:data.data};


    }



}*/



export const fetching_get_with_no_token=async (url,handle_redirect)=>{

    let data=await fetch(url,{
        method:"GET"
    })

    data=await data.json();

    return Response_switch_handler(data,handle_redirect);


} 



export const fetching_post_with_no_token=async (url,data_to_transfer,handle_redirect)=>{

    let data=await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':"application/json",
          
        },
        body:JSON.stringify(data_to_transfer)
    })


    data=await data.json();

    return Response_switch_handler(data,handle_redirect);

} 





export const fetching_get_with_token=async (url,handle_redirect)=>{

   
  

    let data=await fetch(url,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include"
    })
   



    data=await data.json();

    return Response_switch_handler(data,handle_redirect);
}


export const fetching_get_with_token_and_csrf=async (url,handle_redirect)=>{
   
    let csrf=localStorage.getItem("csrf-token");
    console.log("csrf:",csrf);

    let data=await fetch(url,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Csrf_check":csrf
        },
        credentials:"include"
    })




    data=await data.json();

    return Response_switch_handler(data,handle_redirect);


}

export const fetching_post__with_token=async (url,data_to_transfer,handle_redirect)=>{


    let data=await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':"application/json",
          
        },
        body:JSON.stringify(data_to_transfer)
        ,credentials:"include"
    })
    

    data=await data.json();

    return Response_switch_handler(data),handle_redirect



}




export const fetching_post__with_token_and_csrf=async (url,data_to_transfer,handle_redirect)=>{

    let csrf=localStorage.getItem("csrf-token");
    let data=await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':"application/json",
            "Csrf_check":csrf
          
        },
        body:JSON.stringify(data_to_transfer)
        ,credentials:"include"
    })


    data=await data.json();

    


    return Response_switch_handler(data,handle_redirect);

}





export const fetching_post__with_token_forlogin=async (url,data_to_transfer,handle_redirect)=>{

     let data=await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':"application/json",
          
        },
        body:JSON.stringify(data_to_transfer)
        ,credentials:"include"

    })
    

        const headers=data.headers;
      

        const csrf=headers.get("Csrf_check");
      
        localStorage.setItem("csrf-token",csrf)
        
       


        data=await data.json();


        return Response_switch_handler(data,handle_redirect);



    

}