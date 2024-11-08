"use client"
import Main_Board from "@/app/components/mainboard"
import { usePathname } from "next/navigation"
import {useEffect} from "react"



//redux로 리팩토링 시도

const Mainboard=()=>{



    const path = usePathname();
    let title=path.split("/")[2]
 



    return (

        
   
        <Main_Board content_title={decodeURIComponent(title)}/>
        
       
    

    )
}


export default Mainboard


/*
        <div>
         {data!==null ?<Main_Board data={data}/> :null}
        </div>*/ 