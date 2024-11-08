"use client"

import Link from "next/link"
import { useRouter,useEffect } from "next/navigation";
import { fetching_get_with_no_token } from "./fetching";
import LoginNav from "./LoginNav";
import { backIn } from "framer-motion";
import EditLink from "./editlinknav";
const NavBtn=()=>{
    const router=useRouter();
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;

   
    
    return(
      <div className="flex justify-between">
            <Link href="/" className="text-nowrap mr-[10px]">나무위키</Link>
            <Link href="/changelog" className=" text-nowrap mr-[20px]">최근변경</Link>
            <Link href="/discussion" className=" text-nowrap mr-[20px]">최근토론</Link>
            <EditLink/>
            <LoginNav/>
            
        </div>

    )



}


export default NavBtn;
// <Link href="/edit" className="mr-[20px]" >작성</Link>

 //<Link href="/edit" className="mr-[60px] text-nowrap">작성하기</Link>