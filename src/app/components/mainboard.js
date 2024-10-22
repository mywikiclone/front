"use client"
//부모가 useclient일경우 자식도 클라이언트 사이드 에서 렌더링이 되나 자식 자체가 클라이언트 사이드훅 useeffect등을 쓸경우
//자식도 선언해줘야도니다.

import { useState,useEffect,useRef} from "react"
import { makebase64 } from "./action";
import Link from 'next/link';
import { Bakbak_One } from "next/font/google";
import {useSelector,useDispatch} from "react-redux";
import { useRouter } from "next/navigation"
import {check_in_db} from "./indexdb"

import { fetching_get_with_no_token } from "./fetching";
import TextEngine from "./textengine";

const Main_Board=({content_title})=>{
    const router=useRouter();
    const dispatch=useDispatch();
    const current_content=useSelector((state)=>state.current_content);
    console.log("current_content in mainboard:",current_content);
    const current_box=useRef(1);
    const current_big_list_box=useRef(null);
    const current_small_list_box=useRef(null);
    const [preview_text,set_preview_text]=useState("");
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
    const [error,seterror]=useState(false);
    const svg_url_arr=["public/star.svg","public/edit.svg","public/history.svg"];
    const edit=useRef(null);
    const star=useRef(null);
    const history=useRef(null);
    const ref_arr=[star,edit,history]
    //const compiler_data=useRef();


 



    const on_change_btn_color=(event)=>{
        event.target.style.borderColor="black"
    }
    const off_change_btn_color=(event)=>{
        event.target.style.borderColor=" #cbd5e1"
    }



    const show_window=(texts)=>{

   
      let strs="";
      let introductions=""
      let intro_index=""
      Array.from(texts).map((text)=>{
          
        //compiler_data.current=[...compiler_data.current,{id:x.id,text:x.value,height:(x.scrollHeight+"px")}]
     
        //let texts=x.value;
  
        text=TextEngine(text);
  
  
  
        strs+=text;
      })
      intro_index=TextEngine("intro_index");
      introductions=TextEngine("intro");
      strs=introductions+strs+TextEngine("각주리스트");




      return strs;
    }
  

    const change_img=(event)=>{
        if(event.target.tagName==="A"){
                   return ;
             }
        
        let child_node=event.target.children
        console.log("target:",event.target);
        console.log("child_node:",child_node)
               
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
      console.log("redux 값:",current_content.content);
      seterror(false)
      if(current_content.title!==title){
        
        console.log("기존과 다른 리덕스 이므로 dispathc 실행")
       /* let data=await fetching_get_with_no_token(`${back_end_url}search/${title}`);
        console.log("data:",data)
        if(data.success){
          
        data=data.data;
   
        //{content_id,title,content 로구성됨.}

        dispatch({type:"Change_Content",content:{content_id:data.content_id,title:data.title,content:data.content,email:data.email,update_time:data.update_time}})
        }
        else{

          seterror(true);
          //alert("없는 문서입니다")
          //router.push("/")
        }*/

          return;
      }




      
    }



    useEffect(()=>{

      console.log("normal use effect!!!")
      get_data_from_redux(content_title)
      svg_url_arr.map((x,idx)=>{
        check_in_db("img_store",idx,x,ref_arr[idx],0);
      })


    },[])



    useEffect(()=>{
     
      console.log("normal use effect222222!!!")
      let doc=document.getElementById("content_area");
      //let strs=data.content.split("\n");
      
      let strs=current_content.content.split("\n");
      console.log("저장된값:",strs);
      strs=show_window(strs);
      //console.log("current_content:",current_content);
      doc.innerHTML=strs;

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
          let big_areas=doc.getElementsByClassName("big_area");
       

          let small_areas=doc.getElementsByClassName("small_area")
          
  
          let sup_hrefs=doc.getElementsByClassName("sup_href");

  
          Array.from(big_areas).map(x=>{
              let header_ul=x.children[0];
              
  
              header_ul.addEventListener("click",change_img);
          })
          Array.from(small_areas).map(x=>{
              
              let small_ul=x.children[0];
              small_ul.addEventListener("click",change_img);
          })

    },[current_content])



    return(
          <div className="lg:w-90p w-full">
               { error ? <div>                
                <div className=" flex w-full h-auto justify-between items-center border-solod border-[2px] border-black">
                    <div className=" text-[35px] w-auto h-auto ml-[10px]">
                          no found page
                    </div>
                    
                  </div>    
                    </div> 
               
               
               :
               <div className="w-full">
                <div className="flex w-full h-auto justify-between items-center border-solod border-[2px] border-black">
                    <div className=" text-[35px] w-auto h-auto ml-[10px]">
                        {current_content.title}
                        <div className="text-[15px]">
                            <div className="w-fit h-fit flex flex-col">
                            최근수정일:{current_content.update_time.substring(0,16)}
                            </div>
                            <div>작성자:{current_content.email}</div>
                        </div> 
                    </div>
      

                    <div className="flex w-[240px] h-[50px]  mr-[10px]">
                        <button className="flex justify-center items-center  w-[80px] h-full  border-solid border-[2px] border-slate-300 rounded-l-10p"
                            onMouseEnter={(e)=>on_change_btn_color(e)}
                            onMouseLeave={(e)=>off_change_btn_color(e)} >

                <div className="flex flex-col w-fit -fit">
                            <img ref={star} ></img>
                            </div>
                         
                        </button>
                        <Link href={`/edit/${current_content.content_id}`} 
                        className="flex justify-center items-center w-[80px]
                         h-full border-solid border-[2px] border-slate-300 text-[10px] text-center " 
                        onMouseEnter={(e)=>on_change_btn_color(e)}
                        onMouseLeave={(e)=>off_change_btn_color(e)}>


                        <div className="flex flex-col w-fit -fit">
                            <img ref={edit} ></img>
                                <div className="w-fit h-fit">편집</div>
                          </div>
                     
                        </Link>
                        <Link href={`/history/${current_content.content_id}`} 
                        className="flex justify-center items-center w-[80px] h-full 
                         border-solid border-[2px] border-slate-300 rounded-r-10p text-[10px]  text-center"
                         onMouseEnter={(e)=>on_change_btn_color(e)}
                         onMouseLeave={(e)=>off_change_btn_color(e)}
                         onClick={()=>click_change_window()}>
                      

                            <div className="flex flex-col w-fit -fit">
                            <img ref={history} ></img>
                            <div className="w-fit h-fit">역사</div> 
                            </div>
                      
                        </Link>
  
                    </div>

                </div>
                <div className=" w-90p h-auto  " id="content_area">


                </div>
                </div>
            }
             
            </div>

    )

}


export default Main_Board;

//<img ref={history} src="../../history.svg" ></img>