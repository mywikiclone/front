"use client"
import {useEffect} from "react"
const EditPreview=({text})=>{

   
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

     
      
        let doc=document.getElementById("text-box")
        doc.innerHTML=text


        let big_areas=doc.getElementsByClassName("big_area");
       

        let small_areas=doc.getElementsByClassName("small_area")
        

        let sup_hrefs=doc.getElementsByClassName("sup_href");


        Array.from(sup_hrefs).map((x,idx)=>{
            let text=x.children[0].getAttribute('data-ex')
            let divs=document.createElement("div")
            console.log("Text:",text);
            divs.className="text-[15px] w-[300px] break-words  bg-slate-100 h-fit p-[10px] text-black border-[1px] border-solid border-slate-300 invisible absolute bottom-[25px] z-50"
           
            divs.textContent=x.children[0].getAttribute('data-ex');


            x.appendChild(divs);


            x.addEventListener("mouseover",()=>{
                console.log("over");
                divs.classList.remove("invisible");

            })
            x.addEventListener("mouseout",()=>{
                console.log("out");
                divs.classList.add("invisible");

            })
        })


        Array.from(big_areas).map(x=>{
            let header_ul=x.children[0];
            

            header_ul.addEventListener("click",change_img);
        })
        Array.from(small_areas).map(x=>{
            
            let small_ul=x.children[0];
            small_ul.addEventListener("click",change_img);
        })
    },[text])
    /*useEffect(()=>{

       
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
    },[text])*/


    return(
    <div  id="text-box" className="flex flex-col lg:w-90p w-full h-55p overflow-auto ">


    </div>
    )





}


export default EditPreview;