"use server"
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path"


const cookie_store=cookies();
export async function check_cookie(){
    //console.log("쿠키를보자:",cookiess.get("back_access_token"));
    console.log("쿠키를보자:",cookie_store.getAll()),cookie_store.get("back_access_token"),cookie_store.has("back_access_token");
    let cookie=cookie_store.get("back_access_token")
    console.log("쿠키:",cookie);
    if(cookie_store.has("back_access_token")){
        
        if(cookie!==undefined && (cookie.value!=="" )){
            console.log("쿠키존재")
            return true;
        }
        else{
            console.log("쿠키없음")
            return false;
        }
        
    }
    else{

        console.log("쿠키없음")
        return false;
    }


}

export async function set_cookie(token){
    console.log("세팅할 쿠키값:",token)


    cookie_store.set("back_access_token",token,{path:"/",maxAge:30,secure:false,sameSite: 'Lax'})
    

}


export async function delete_cookie(){
    let cookie=cookie_store.get("back_access_token");
    console.log("현재쿠키값:",cookie);
   
    cookie_store.delete("back_access_token");
    console.log("쿠키삭제후값:",cookie.value)
}


export async function get_token(){

    
    let cookie=cookie_store.get("back_access_token");

    return cookie.value;
}



export async function makebase64(svg_url){
    const filepath=path.join(process.cwd(),svg_url);
    let strings= await fs.readFile(filepath, 'utf8');
    const base64 = Buffer.from(strings).toString('base64');
    const base64String = `data:image/svg+xml;base64,${base64}`;




      return base64String;

}