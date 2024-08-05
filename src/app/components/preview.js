import {useEffect} from "react"
const Preview=({text})=>{

   
const change_img=(event)=>{
    if(event.target.tagName==="A"){
               return ;
         }
    
    let child_node=event.target.children
    console.log(child_node,event.target.parentElement,event.target.parentElement.children)
           
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

        let docs=doc.getElementsByClassName("big_area");
        Array.from(docs).map(x=>{
            let header_ul=x.children[0];

            header_ul.addEventListener("click",change_img);
            if(doc.getElementsByClassName("small_area")!==null){
                let docs2=doc.getElementsByClassName("small_area")
                Array.from(docs).map((y)=>{
                    let header_ul=y.children[0];
                    header_ul.addEventListener("click",change_img)
                })
            }
        })
    },[text])


    return(
    <div  id="text_box" className="flex flex-col w-90p h-55p overflow-auto bg-blue-100">


    </div>
    )





}


export default Preview;