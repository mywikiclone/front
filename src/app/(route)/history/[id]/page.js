"use client"
import History from "@/app/components/hisotry"
import { usePathname } from "next/navigation"
const History_page=()=>{

    const path = usePathname();
    let nums=path.split("/")[2]

    return(
        
      
        <History content_id={nums}/>
      
      
    )


}


export default History_page