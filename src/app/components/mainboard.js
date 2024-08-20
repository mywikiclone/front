"use client"
//부모가 useclient일경우 자식도 클라이언트 사이드 에서 렌더링이 되나 자식 자체가 클라이언트 사이드훅 useeffect등을 쓸경우
//자식도 선언해줘야도니다.

import { useState,useEffect,useRef} from "react"

import Link from 'next/link';
import { Bakbak_One } from "next/font/google";
import {useSelector,useDispatch} from "react-redux";
import { useRouter } from "next/navigation"


const Main_Board=({content_title})=>{
    const router=useRouter();
    const dispatch=useDispatch();
    const current_content=useSelector((state)=>state.current_content);
    const current_box=useRef(1);
    const current_big_list_box=useRef(null);
    const current_small_list_box=useRef(null);
    const [preview_text,set_preview_text]=useState("");
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
    const [error,seterror]=useState(null);
    //const compiler_data=useRef();

    



    const on_change_btn_color=(event)=>{
        event.target.style.borderColor="black"
    }
    const off_change_btn_color=(event)=>{
        event.target.style.borderColor=" #cbd5e1"
    }

    const click_change_window=()=>{
        console.log("check");
       
    }


    const show_window=(contents)=>{
        current_big_list_box.current=null;
        current_small_list_box.current=null;
         //compiler_data.current=[];
        let txtarea=document.getElementsByClassName("texts")
        let strs=""
        let reg_exp_big_title=/==.*?==/
        let reg_exp_small_title=/=.*?=/
        let strs_list=[]
        let big_list_and_small_list_relation={}
        let small_list_num=1;
        
        
        contents.map((x)=>{
          
         // compiler_data.current=[...compiler_data.current,{id:x.id,text:x.value,height:(x.scrollHeight+"px")}]
          //set_compiler_text(prev=>[...prev,{id:x.id,text:x.value,height:(x.scrollHeight+"px")}])
          //let texts=x.value.replace(/\n/g,"<br/>");
          let texts=x;
          if(texts.match(reg_exp_big_title)!=null){
          
    
            let middletext=texts.split("==")
            console.log("big:",texts,middletext)
            current_big_list_box.current=`<div class="big_area w-full h-auto bg-white"><div class="w-full h-auto bg-white"><ul class="w-full h-[50px] border-b-2 border-solid border-gray-300"><img  src="../../../arrow_down.svg" class="pointer-events-none" ></img><a href="https://namu.wiki/w/NGC%205694" target="_blank">??</a>${strs_list.length+1} ${middletext[1]}</ul><div class="w-full h-auto bg-white"></div><end>`
    
            strs_list.push(current_big_list_box.current)
            big_list_and_small_list_relation[strs_list.length-1]=[];
        
    
    
            current_small_list_box.current=null
            small_list_num=1
            return;
          }
          else if(texts.match(reg_exp_small_title)!=null){
    
     
            let middletext=texts.split("=")
            console.log("small:",texts,middletext)
            current_small_list_box.current=`<div class="small_area w-full h-auto bg-white"><div class="w-full h-auto bg-white"><ul class="w-full h-[50px] border-b-2 border-solid border-gray-300"><img  src="../../../arrow_down.svg" class="pointer-events-none" ></img><a href="https://namu.wiki/w/NGC%205694" target="_blank">??</a>${strs_list.length}.${small_list_num} ${middletext[1]}</ul><div class="w-full h-auto bg-white"></div><end>`
            big_list_and_small_list_relation[strs_list.length-1].push(current_small_list_box.current);
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
       
        
              
              let bigs_list=current_big_list_box.current.split("</div><end>")
           
              bigs_list.pop()
              bigs_list.push(texts+"<br/></div><end>")
              bigs_list=bigs_list.join(" ")
              current_big_list_box.current=bigs_list
              strs_list.pop()
              strs_list.push(bigs_list)
              
              return ;
            }
    
            let lastIndex =current_small_list_box.current.lastIndexOf("</div><end>");
            let small_list=current_small_list_box.current.substring(0, lastIndex) + current_small_list_box.current.substring(lastIndex).replace("</div><end>","");
            //let small_list=current_small_list_box.current.split("</div><end>");
            //console.log("small_list:",small_list);
            //small_list.pop()
            //small_list.push(texts+"<br/></div><end>")
            //small_list=small_list.join(" ")
            //console.log("texts:",texts==="");
           
            small_list=small_list+texts+"</br></div><end>"
            current_small_list_box.current=small_list
            
            big_list_and_small_list_relation[strs_list.length-1].pop()
            big_list_and_small_list_relation[strs_list.length-1].push(small_list)
           // lastIndex=current_big_list_box.current.lastIndexOf("</div><end>");
            //let big_list=current_big_list_box.current.substring(0, lastIndex) + current_big_list_box.current.substring(lastIndex).replace("</div><end>","");
            //big_list.pop()
            //big_list.push(small_list+"<br/></div><end>")
            //big_list=big_list.join(" ")
            //big_list=big_list+small_list+"<br/></div><end>"
           // console.log("big_list:",big_list)
           // current_big_list_box.current=big_list
           // strs_list.pop()
          //strs_list.push(big_list)
    
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
        if(strs_list.length>0){
    
          strs_list=strs_list.map((x,idx)=>{
    
            let small_list=big_list_and_small_list_relation[idx]
            small_list=small_list.join(" ")
            small_list=small_list.replace(/<end>/g,"</div></div>")
            let lastIndex=x.lastIndexOf("</div><end>");
            x=x.substring(0, lastIndex) + x.substring(lastIndex).replace("</div><end>","");
            x=x+small_list+"</div></div></div>"
            return x;
          })
          strs+=strs_list.join("</br>")
    
        }
        set_preview_text(strs)

        return strs;
        
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




    const get_data_from_redux=async(title)=>{
      console.log("값비교:",current_content.title!==title,current_content.title,title);
      if(current_content.title!==title){


        let datas=await fetch(`${back_end_url}search/${title}`,{
            method:"GET"
        })

        if(!datas.ok){
          
          
          //router.push("/404");
          seterror("에러발생");


        }
      else{
      let res=await datas.json();
        console.log("res:",res);
      res=res.data;
        console.log("datas:",datas);

        //{content_id,title,content 로구성됨.}

        dispatch({type:"Change_Content",content:{content_id:res.content_id,title:res.title,content:res.content,content_arr:res.content.split("\n")}})
        console.log("디스패치끝!")

      }
      }



    }



    useEffect(()=>{



      get_data_from_redux(content_title)



    },[])



    useEffect(()=>{
     
      
      let doc=document.getElementById("content_area");
      //let strs=data.content.split("\n");
      
      let strs=current_content.content.split("\n");
      strs=show_window(strs);
      console.log("current_content:",current_content);
      doc.innerHTML=strs;

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
      

    },[current_content])



    return(
          <div>
               { error ? <div>{error}</div> 
               
               
               :
               <div>
                <div className=" flex w-full h-auto justify-between items-center border-solod border-[2px] border-black">
                    <div className=" text-[35px] w-auto h-auto ml-[10px]">
                        {current_content.title}
                        <div className="text-[15px]">
                            최근수정일
                        </div> 
                    </div>
      

                    <div className="flex w-[240px] h-[50px]  mr-[10px]">
                        <button className="flex justify-center items-center  w-[80px] h-full  border-solid border-[2px] border-slate-300 rounded-l-10p"
                            onMouseOver={(e)=>on_change_btn_color(e)}
                            onMouseLeave={(e)=>off_change_btn_color(e)} >
                            <img src="../../star.svg"></img>
                         
                        </button>
                        <Link href={`/edit/${current_content.content_id}`} className="flex justify-center items-center w-[80px] h-full border-solid border-[2px] border-slate-300 text-[15px] text-center ">
                        <button className="  w-full h-full"
                            onMouseOver={(e)=>on_change_btn_color(e)}
                            onMouseLeave={(e)=>off_change_btn_color(e)}
                            onClick={()=>click_change_window()}>
                             
                                <img src="../../edit.svg" ></img>
                                    편집
                          
                        </button>
                        </Link>
                        <Link href={`/history/${current_content.content_id}`} className="flex justify-center items-center w-[80px] h-full  border-solid border-[2px] border-slate-300 rounded-r-10p text-[15px]  text-center">
                        <button className="w-full h-full" 
                            onMouseOver={(e)=>on_change_btn_color(e)}
                            onMouseLeave={(e)=>off_change_btn_color(e)}
                            onClick={()=>click_change_window()}>
                        
                            <img src="../../history.svg" ></img>
                                역사
                          
                        </button>
                        </Link>
  
                    </div>

                </div>
                <div className="w-full h-auto" id="content_area">
                       
                </div>
                </div>
            }
             
            </div>

    )

}


export default Main_Board;