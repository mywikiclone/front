"use client"
import {useEffect} from "react"
const EditPreviewTest=({text})=>{

   
const change_img=(event)=>{
    if(event.target.tagName==="A"){
               return ;
         }
    
    let child_node=event.target.children
   // console.log(child_node,event.target.parentElement,event.target.parentElement.children)
           
     if(child_node[0].src==="http://localhost:3000/arrow_down.svg"){
        child_node[0].src="../../../arrow_right.svg"

        event.target.parentElement.children[1].style.display="none"
        return ;
        }
       
        child_node[0].src="../../../arrow_down.svg"
        event.target.parentElement.children[1].style.display="block"
        return ;
    }
    useEffect(()=>{

       
        console.log("들어갈 text:",text)
        let doc=document.getElementById("text_box")
        doc.innerHTML=text

        let big_areas=doc.getElementsByClassName("big_area");
       

        let small_areas=doc.getElementsByClassName("small_area")
        
        Array.from(big_areas).map(x=>{
            let header_ul=x.children[0];
            

            header_ul.addEventListener("click",change_img);
        })
        Array.from(small_areas).map(x=>{
            
            let small_ul=x.children[0];
            small_ul.addEventListener("click",change_img);
        })
    },[text])


    return(
    <div  id="text_box" className="flex flex-col lg:w-90p w-full h-55p overflow-auto bg-blue-100">


    </div>
    )





}


export default EditPreviewTest;