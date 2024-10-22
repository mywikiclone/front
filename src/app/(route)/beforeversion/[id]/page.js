'use client'
import Search_before_version from "@/app/components/search_before_version";

import { usePathname } from "next/navigation"

const Main=()=>{
    const path = usePathname();
    let nums=path.split("/")[2]
    console.log("beforeversion!")
    return(
    
        <Search_before_version id={nums}/>
   
    )


}

export default Main;