"use client"

import Link from "next/link"
import { useRouter,useEffect } from "next/navigation";
import LoginNav from "./LoginNav";
const NavBtn=()=>{
    const router=useRouter();

    const random_search_event=async()=>{
      console.log("랜덤문서")
      let data=await fetch("/api/random",{
        method:"GET"
      })
      .then((res)=>{return res.json()})
      .then((res)=>{return res.data;})
      router.push(`/currentversion/${data.title}`) 
    }
   
    
    return(
      <div className="inline-block">
            <Link href="/" className="mr-[60px]">나무위키</Link>
            <Link href="/pages/changed" className="mr-[60px]">최근변경</Link>
            <Link href="/pages/arg" className="mr-[60px]">최근토론</Link>
            <LoginNav/>
            <a>특수기능</a>
            <button className="randomBtn" onClick={()=>{random_search_event()}}>⟳</button>
        </div>

    )



}


export default NavBtn;