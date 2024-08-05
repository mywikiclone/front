'use client'
import Search_before_version from "@/app/components/search_before_version";

import { usePathname } from "next/navigation"

const main=()=>{
    const path = usePathname();
    let nums=path.split("/")[2]
    return(
    <div>
        <Search_before_version id={nums}/>
    </div>
    )


}

export default main;