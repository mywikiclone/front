"use client"
import {useEffect} from "react"
import { motion } from "framer-motion"
import { txtfilter, video_filtering } from "./txtfilter"
const DiscussionPreview=({text,show})=>{
  
    const show_window=(text)=>{
        current_big_list_box.current=null;
        current_small_list_box.current=null;
        if(show_preview!==true){
        compiler_data.current=[];
        let txtarea=document.getElementsByClassName("texts")
        let strs=""
        let reg_exp_big_title=/==.*?==/g
        let reg_exp_small_title=/=.*?=/g
        
        let big_title_list=[]
        let small_title_list=[]
        
        
        
        let strs_list=[]
      
        let small_list_num=1;
      

        let bigs_match=text.match(reg_exp_big_title);
        let small_match=tetx.match(reg_exp_small_title);


        if(bigs_match!=null){
            bigs_match.map((x,idx)=>{
                let y=x.split("==");
                let middletext=y[1];
                let big_box=`<div id=${idx+1} class="w-full big_area  h-auto bg-white">`
                let img_box=`<div class="flex  content-center justify-content w-full h-fit border-b-2 border-solid border-gray-300 text-[20px]"><img  src="../../../arrow_down.svg" class="pointer-events-none w-[30px]  h-[30px]" ></img>${idx+1}.${middletext[1]}</div>`;
                let text_area=`<div class="w-full h-auto bg-white "><div class="m-[10px] break-words text-[15px]"><end>`


                return big_box+img_box+text_area;
            })
            let idx=0;
            text=text.replace(reg_exp_big_title,()=>{
                return bigs_match[idx++]
            })

        }


        if(small_match!=null){
            small_match.map((x,idx)=>{
                let y=x.split("==");
                let middletext=y[1];
                let small_box=`<div id=${big_title_list.length}.${small_list_num} class="w-full small_area h-auto bg-white">`
                let img_box=`<div class="flex  content-center justify-content w-full h-fit border-b-2 border-solid border-gray-300 text-[20px]"><img  src="../../../arrow_down.svg" class="pointer-events-none w-[30px]  h-[30px]" ></img>${big_title_list.length}.${small_list_num}.${middletext[1]}</div>`
                let text_area=`<div class="w-full h-auto bg-white "><div class="m-[10px] break-words text-[15px]"><end>`


                return small_box+img_box+text_area;
            })
            let idx=0;
            text=text.replace(reg_exp_small_title,()=>{
                return small_match[idx++]
            })

        }




        set_compiler_text([])
        Array.from(txtarea).map((x)=>{
          
          compiler_data.current=[...compiler_data.current,{id:x.id,text:x.value,height:(x.scrollHeight+"px")}]
          //set_compiler_text(prev=>[...prev,{id:x.id,text:x.value,height:(x.scrollHeight+"px")}])
          //let texts=x.value.replace(/\n/g,"<br/>");
          let texts=x.value;
          if(texts.match(reg_exp_big_title)!=null){
          
    
            let middletext=texts.split("==")
            console.log("big:",texts,middletext)
            let big_box=`<div id=${big_title_list.length+1} class="w-full big_area  h-auto bg-white">`
            let img_box=`<div class="flex  content-center justify-content w-full h-fit border-b-2 border-solid border-gray-300 text-[20px]"><img  src="../../../arrow_down.svg" class="pointer-events-none w-[30px]  h-[30px]" ></img>${big_title_list.length+1}.${middletext[1]}</div>`;
            let text_area=`<div class="w-full h-auto bg-white "><div class="m-[10px] break-words text-[15px]"><end>`
            current_big_list_box.current=big_box+img_box+text_area;
            strs_list.push(current_big_list_box.current)
            //big_list_and_small_list_relation[strs_list.length-1]=[];
            big_title_list.push(middletext[1]);
            small_title_list[big_title_list.length-1]=[];
    
    
            current_small_list_box.current=null
            small_list_num=1
          
            return;
          }
          else if(texts.match(reg_exp_small_title)!=null){
    
     
            let middletext=texts.split("=")
           
            let small_box=`<div id=${big_title_list.length}.${small_list_num} class="w-full small_area h-auto bg-white">`
            let img_box=`<div class="flex  content-center justify-content w-full h-fit border-b-2 border-solid border-gray-300 text-[20px]"><img  src="../../../arrow_down.svg" class="pointer-events-none w-[30px]  h-[30px]" ></img>${big_title_list.length}.${small_list_num}.${middletext[1]}</div>`
            let text_area=`<div class="w-full h-auto bg-white "><div class="m-[10px] break-words text-[15px]"><end>`
           
            current_small_list_box.current=small_box+img_box+text_area
           
            strs_list.push(current_small_list_box.current)
            
            
            small_title_list[big_title_list.length-1].push(middletext[1]);
            small_list_num+=1
           
            return;
          }
    
    
          else if(!texts.endsWith("</img>")){
            if(current_small_list_box.current===null&&current_big_list_box.current===null){
              texts+="<br/>"
              strs+=texts
              return ;
            }
            else if(current_small_list_box.current===null&&current_big_list_box.current!==null){
       
        
              let bigs_list=current_big_list_box.current.split("<end>")
              console.log("bigs_list before:",bigs_list);
              bigs_list.pop()
              bigs_list.push(texts+"<br/><end>")
              bigs_list=bigs_list.join(" ")
              console.log("bigs_list after:",bigs_list);
              current_big_list_box.current=bigs_list
              strs_list.pop()
              strs_list.push(bigs_list)
              console.log("strs_list after:",strs_list)
            
              return ;
            }
         
            let small_list=current_small_list_box.current.split("<end>")
           
            small_list.pop()
            small_list.push(texts+"<br/><end>")
            small_list=small_list.join(" ")
            current_small_list_box.current=small_list
            strs_list.pop()
            strs_list.push(small_list)
            //strs_list.pop()
            //strs_list.push(bigs_list)
    
          
    
           /* let lastIndex =current_small_list_box.current.lastIndexOf("</div><end>");
            let small_list=current_small_list_box.current.substring(0, lastIndex) + current_small_list_box.current.substring(lastIndex).replace("</div><end>","");
            
            console.log("small_list:",small_list);
     
            console.log("texts:",texts==="");
           
            small_list=small_list+texts+"</br></div><end>"
            current_small_list_box.current=small_list
            
            big_list_and_small_list_relation[strs_list.length-1].pop()
            big_list_and_small_list_relation[strs_list.length-1].push(small_list)*/
     
    
            return ;
          }
         
          else{
            strs+=texts
          return;
          }
    
        })
       
        //console.log(compiler_text)
        //console.log(texts.match(/<(?!\/?(?:s|b|i|h[1-3]|br|u)\b)[^>]*>/g));
        
        /*if(strs_list.length>0){
          strs_list=strs_list.map(x=>{
        
            let y=x.replace(/<end>
            /g,"</div></div>")
            console.log("y:",y)
            return y;
          })
            strs+=strs_list.join("</br>")}*/
        console.log("strslist:",strs_list);
        if(strs_list.length>0){
    
          strs_list=strs_list.map((x,idx)=>{
    
    
            return x.replace(/<end>/g,"</div></div></div>")
    
    
            /*let small_list=big_list_and_small_list_relation[idx]
            small_list=small_list.join(" ")
            small_list=small_list.replace(/<end>/g,"</div></div>")
            let lastIndex=x.lastIndexOf("</div><end>");
            x=x.substring(0, lastIndex) + x.substring(lastIndex).replace("</div><end>","");
            x=x+small_list+"</div></div></div>"
            return x;*/
          })
          strs+=strs_list.join(" ")
    
        }
    
        let introduction=`<div id="introduction" class="w-fit border-solid border-black border-[3px] text-[20px]">목차`
        let ul=`<ul class="pl-[10px]">`
        introduction+=ul
        big_title_list.map((x,idx)=>{
          let li=`<li class="mb-[10px] text-[15px]"><a class="text-blue-400" href=#${idx+1}>${idx+1}</a>.${x}</li>`
          let ul2=`<ul class="pl-[10px]">`
          small_title_list[idx].map((x,index)=>{
              
              let li2=`<li class="mb-[10px] text-[15px]"><a class="text-blue-400" href=#${idx+1}.${index+1}>${idx+1}.${index+1}</a>.${x}</li>`
              ul2+=li2
          })
          
          ul2+='</ul>'
          introduction+=(li+ul2)
    
        })
        introduction+="</ul></div>"
    
        strs=introduction+strs;
    
    
        set_preview_text(strs)
        set_show_preivew(true)
        set_deafult_view(false)
        
        } 
      }




   
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
        let pattern=/\n/g;
        let texts=text;
        texts=texts.replace(pattern,()=>{

            return "<br>"
        })
        texts=txtfilter(texts);
        texts=video_filtering(texts);
        doc.innerHTML=texts

        /*let docs=doc.getElementsByClassName("big_area");
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
        })*/


  

        
    },[text])

    const vars={

        open:{height:"100px"},
        closed:{height:0}}
        





    return(
    <motion.div  id="text_box" className="flex flex-col resize-none outline-none overflow-y-auto bg-white break-words border-solid border-slate-400 border-[1px]"
    variants={vars}
    initial={show ? "open":"closed"}
    animate={show ? "open":"closed" }
    transition={{duration:0.5}}
    >


    </motion.div>
    )





}


export default DiscussionPreview;