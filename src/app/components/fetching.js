"use client"






const relogin_sign=process.env.NEXT_PUBLIC_RELOGIN_SIGN;


export const fetching_get_with_no_token=async (url)=>{

    let data=await fetch(url,{
        method:"GET"
    })

    if(!data.ok){
        console.log("get fetching 중에 error발생")
        console.log("에러위치:",url)
        return {success:false,data:null};
    }
    else{
    data=await data.json();
    if(data.success){
        return {success:true,data:data.data};
    }
    return {success:false,data:null};
    }
} 



export const fetching_post_with_no_token=async (url,data_to_transfer)=>{

    let data=await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':"application/json",
          
        },
        body:JSON.stringify(data_to_transfer)
    })

    if(!data.ok){
        console.log("get fetching 중에 error발생")
        return {success:false,data:null};
    }
    else{
    data=await data.json();
    if(data.success){
        return {success:true,data:data.data};
    }
    return {success:false,data:null};
    }
} 





export const fetching_get_with_token=async (url)=>{

   
  

    let data=await fetch(url,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include"
    })
    console.log("무슨일이일언난거지:",data);


    if(!data.ok){

            
            return {success:false,data:null};
        
       
    }


    else{
        

        data=await data.json();

        //return data;

        if(data.success){
            return {success:true,data:data.data};
        }
        return {success:false,data:null};



    }

}


export const fetching_post__with_token=async (url,data_to_transfer)=>{


    let data=await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':"application/json",
          
        },
        body:JSON.stringify(data_to_transfer)
        ,credentials:"include"
    })
    
    if(!data.ok){

        data=await data.json();

        
        console.log("리스폰스떄문에 안된다게이야!")
            return {success:false,msg:data.msg,data:data.data};
        
       
    }


    else{
        data=await data.json();


        console.log("애인가?:",data)
        if(data.success){
            return {success:true,data:data.data};
        }


        console.log("리스폰스떄문에 안된다게이야!")
        return {success:false,data:null};
        //return data;

    }

}


export const fetching_post__with_token_forlogin=async (url,data_to_transfer)=>{

     let data=await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':"application/json",
          
        },
        body:JSON.stringify(data_to_transfer)
        ,credentials:"include"
    })
    
    if(!data.ok){


        
         
            return {success:false,msg:data.msg,data:data.data};
        
       
    }


    else{
        data=await data.json();


        console.log("애인가?:",data)
        if(data.success){
            return {success:true,data:data.data};
        }
        return {success:false,data:null};
        //return data;

    }

}