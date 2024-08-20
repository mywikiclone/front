"use server"
import { cookies } from "next/headers";


const cookie_store=cookies();
export async function check_cookie(){
    
   

    
    console.log("쿠키를보자:",cookie_store.getAll()),cookie_store.get("back_access_token"),cookie_store.has("back_access_token");
    let cookie=cookie_store.get("back_access_token")
    console.log("쿠키:",cookie);
    if(cookie_store.has("back_access_token")){

        if(cookie!==undefined && cookie.value!==""){
        return true;}
        else{
            return false;
        }
        
    }
    else{


        return false;
    }


}

export async function set_cookie(token){
   
    cookie_store.set("back_access_token",token,{maxAge:60})


}


export async function delete_cookie(){
    let cookie=cookie_store.get("back_access_token");
    console.log("쿠키잇니?:",cookie_store.has("back_access_token"))
    cookie_store.delete("back_access_token");
    console.log("쿠키삭제후값:",cookie.value)
}