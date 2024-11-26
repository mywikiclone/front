"use client"

import { useEffect } from "react";
import { fetching_get_with_no_token } from "@/app/components/fetching";
const Xss=()=>{

    const testxss=()=>{
        let test=document.getElementById("test")
        let ints=document.getElementById("ints");
        console.log(ints.value);
        test.innerHTML=ints.value;
    }

    const handle_redirect=()=>{

    }
  


    return(
        <div>
              <input id="ints"></input><button className="w-[30px] h-[30px]"onClick={()=>testxss()}>x</button>  
              <div id="test">

              </div>
        </div>
    )
}


export default Xss;