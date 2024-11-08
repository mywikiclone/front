"use client"
import {useEffect} from "react"
const Tutorial_Preview=({text,nums})=>{

   
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

        console.log("nums:",nums);
      
        let doc=document.getElementById(`${nums}`)
        doc.innerHTML=text


        let big_areas=doc.getElementsByClassName("big_area");
       

        let small_areas=doc.getElementsByClassName("small_area")
        

        let sup_hrefs=doc.getElementsByClassName("sup_href");


        /*Array.from(sup_hrefs).map((x,idx)=>{
               
                let href=x.children[0];
                console.log("href:",href);
               // <div class="</div>
                console.log(x.children[0]);
                console.log(x.children[0].getAttribute('data-ex'))
                let divs=document.createElement("div")
                divs.className="text-[15px] bg-slate-400  text-black border-[1px] border-solid border-slate-300 invisible absolute  left-full top-1/2  transform -translate-y-1/2  z-50"
                //divs.textContent=x.children[0].getAttribute('data-ex');
                divs.textContent=x.children[0].getAttribute('data-ex');
                
                x.appendChild(divs);
                
                href.addEventListener("mouseover",()=>{

                    divs.classList.remove("invisible");

                })
                href.addEventListener("mouseout",()=>{

                    divs.classList.add("invisible");

                })



        })*/


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
    <div  id={`${nums}`} className="flex flex-col lg:w-90p w-full h-55p overflow-auto ">


    </div>
    )





}


export default Tutorial_Preview;