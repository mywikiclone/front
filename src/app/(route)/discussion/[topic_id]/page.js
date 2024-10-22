"use client"
import { fetching_get_with_no_token } from "@/app/components/fetching";
import Topic from "@/app/components/topic";
import { usePathname } from "next/navigation"
import { useEffect } from "react";




const Main=()=>{

    const path = usePathname();
    let paths=path.split("/");
    
    let topic_id=paths[2]
    console.log("topic_id:",topic_id)


    
 

    return (
        <Topic  topic_id={topic_id}/>
    )



}


export default Main