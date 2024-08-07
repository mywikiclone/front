"use client"
import { useRef,useState } from "react"
import Search_List from "./searchedlist"








const Search_box=()=>{
    let event_mem=useRef(null)
    let [popup,setpopup]=useState(false)
    const search_event=(event)=>{
        if(event.target.value!==""){
            setpopup(true)
            console.log("이벤트값:",event.target.value)
            if(event_mem.current!==null){
                console.log("이벤트취소")
                clearTimeout(event_mem.current);
            }
    
            event_mem.current=setTimeout(()=>{console.log("event!")},300)

            console.log(event_mem.current)
        }
        else{

            setpopup(false)
            


        }
      } 
      
    
return(

    <div className="inline-block">


    <input className="w-[250px] h-[35px] ml-[10px]" onChange={(event)=>search_event(event)} placeholder="   여기에서 검색">
        </input>
        {   

     popup &&<Search_List/>}



  </div>

)

}

export default Search_box;


/*{   

    popup.current ?
    <div className="w-[250px] h-[200px] border-solid border-slate-200 border-[1px] rounded-3p bg-white ml-[10px] mt-[5px] shadow-xl"></div>
    :null}
*/