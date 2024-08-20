"use client"

import Edit_By_Id from "@/app/components/edit_by_id";

import { usePathname } from "next/navigation";





const Main=()=>{

  
    const path = usePathname();
    let nums=path.split("/")[2]


 
    return(
        <div>
         
            <Edit_By_Id content_id={nums}/>
       
        </div>
   

      
    )


}



export default Main;

/*<div className="w-full h-screen bg-white">
<MenuBar/>

</div>
*/