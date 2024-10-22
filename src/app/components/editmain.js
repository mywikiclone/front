"use client"

import React,{useEffect,useState,useRef} from 'react'
import Preview from "./preview"
import { Zen_Tokyo_Zoo } from 'next/font/google'
import {fetching_post_with_no_token} from './fetching'
import { useRouter } from 'next/navigation'
//import './style.scss'
const MenuBar = () => {
  const tags_for_edit={
    bold:"<b></b>",
    strike:"<s></s>",
    italic:"<i></i>",
    underline:"<u></u>",

  }
  //const [current_box,set_current_box]=useState(1);-->usestate는 값이바뀔떄마다 리랜더링발생
  const router=useRouter();
  const current_box=useRef(1);
  const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL
  const current_big_list_box=useRef(null);
  const current_small_list_box=useRef(null);
  const [show_preview,set_show_preivew]=useState(false);
  const [preview_text,set_preview_text]=useState("");
  const [compiler_text,set_compiler_text]=useState([])
  const compiler_data=useRef();
  const [default_view,set_deafult_view]=useState(true);
  const set_current_num=(event)=>{
     // set_current_box(Number(event.target.id))
     current_box.current=Number(event.target.id)
  }


  const func=(strs)=>{
    
    let txtarea=document.getElementById(`${current_box.current}`);
    let txtvalue=txtarea.value;
    let cursorposition=txtarea.selectionStart;

    let beforevalue=txtvalue.substring(0,cursorposition);
    let aftervalue=txtvalue.substring(cursorposition,txtvalue.length);
  
    console.log("txtvalue:",txtvalue)
    console.log("cursorposition:",cursorposition)
    beforevalue+=tags_for_edit[strs];


    txtarea.value=beforevalue+aftervalue;
    text_area_auto_sizing_normal(txtarea)
    txtarea.focus();



  }


  const show_window=()=>{
    compiler_data.current=[];
    let txtarea=document.getElementsByClassName("texts")
    let strs="";
    let introductions=""
    let intro_index=""
    Array.from(txtarea).map((x)=>{
        
      compiler_data.current=[...compiler_data.current,{id:x.id,text:x.value,height:(x.scrollHeight+"px")}]
   
      let texts=x.value;

      texts=TextEngine(texts);



      strs+=texts;
    })
    intro_index=TextEngine("intro_index");
    introductions=TextEngine("intro");
    strs=introductions+strs+TextEngine("각주리스트");
    set_preview_text(strs)
    set_show_preivew(true)
    set_deafult_view(false)
  }


  
  const show_compiler=()=>{

    if(show_preview){
    set_show_preivew(false)
    set_deafult_view(false)
    current_box.current=1}
  }


  const text_area_auto_sizing_normal=(doc)=>{
    doc.style.height="auto"
    doc.style.height=doc.scrollHeight+"px"
  }

  const textarea_auto_sizing=(event)=>{
    if(Number(event.target.id)!==current_box){
      //set_current_box(Number(event.target.id))
      current_box.current=Number(event.target.id)
    }

    let doc=event.target;
    doc.style.height="auto"
    //console.log(doc.height);
    //console.log(doc.scrollHeight);
    let x=doc.scrollHeight+"px"
    doc.style.height=x;
  }


  const add_row_num=(event)=>{

    if(event.keyCode===13){
    event.preventDefault();
   
    let row_number=Number(event.target.id);
    let parent=event.target.parentElement;
    //console.log("parent",parent)
    let text_area_arr=document.querySelectorAll(".texts");
    let row_number_div_arr=document.querySelectorAll(".row_box_num");
    let fir_box=document.createElement("div")
    let second_box=document.createElement("div")
    let third_box=document.createElement("textarea");
    
    fir_box.className=`row_box my-[1px] flex`
    //fir_box.id=`${row_number+1}`

    second_box.className=" text-center row_box_num w-[50px] h-[30px] bg-blue-200 border-2 text-[15px]"
    second_box.textContent=`${row_number+1}`
    Array.from(row_number_div_arr).map(x=>{
      if(Number(x.textContent)>row_number){
        x.textContent=Number(x.textContent)+1
      }
    })
    Array.from(text_area_arr).map(x=>{
      if(Number(x.id)>row_number){
        x.id=Number(x.id)+1

      }
    })
    


   //third_box.setAttribute("data-id",`${row_number+1}`)
    third_box.id=`${row_number+1}`
    third_box.spellcheck=false
    third_box.className="texts w-full h-[30px]  bg-slate-300  resize-none outline-0 text-[15px]"
    third_box.rows="1";
    third_box.addEventListener("keydown",add_row_num)
    third_box.addEventListener("input",textarea_auto_sizing)
    third_box.addEventListener("click",set_current_num)



    fir_box.appendChild(second_box)
    fir_box.appendChild(third_box)
    parent.after(fir_box)
  
 
   

    third_box.focus();
    //set_current_box(row_number+1)
    current_box.current=row_number+1
    
   
    }
    if(event.keyCode===8&&event.target.selectionStart===0&&Number(event.target.id)!==1){
      event.preventDefault();
      let text_box=document.getElementById("text_box")
      let row_number=Number(event.target.id);
      let parent=event.target.parentElement;
      let focus_to_div=document.getElementById(`${row_number-1}`)
      let text_area_arr=document.querySelectorAll(".texts");
      let row_number_div_arr=document.querySelectorAll(".row_box_num");
      Array.from(text_area_arr).map(x=>{
        if(Number(x.id)>row_number){
          x.id=Number(x.id)-1
        }
      })
      Array.from(row_number_div_arr).map(x=>{
        if(Number(x.textContent)>row_number){
          x.textContent=Number(x.textContent)-1
        }
      })
      focus_to_div.value=focus_to_div.value+event.target.value;
      text_box.removeChild(parent);
      text_area_auto_sizing_normal(focus_to_div)
      //focus_to_div.style.height="auto"
      //focus_to_div.style.height=focus_to_div.scrollHeight+"px"
      focus_to_div.focus();
      //set_current_box(row_number-1)
      current_box.current=row_number-1
    }
    if(event.keyCode===38&&event.target.selectionStart===0){
      let nums=Number(event.target.id)-1;
      if((nums+1)!==1){
      //set_current_box(nums) 
      current_box.current=nums 
      console.log(event.target.selectionStart,event.target.selectionEnd);
      let docs=document.getElementById(`${nums}`)
      docs.focus();}
      else{
        console.log("시작입니다.")
      }
      

      }
    if(event.keyCode===40&&event.target.selectionStart===event.target.value.length){
      let nums=Number(event.target.id)+1;
      let doc_arr=document.getElementsByClassName("texts")
      if((nums-1)!==doc_arr.length){
      //set_current_box(nums)
      current_box.current=nums
      let docs=document.getElementById(`${nums}`)
      docs.focus();
      }
      else{
        console.log("끝입니다.")
      }

    }

  }
  const save_text=async (event)=>{
    let targets=event.target.parentElement.parentElement.children[2].children;
    let strs=""
    let title=document.getElementById("title_area")
    title=title.value;
    Array.from(targets).map(x=>{
      
      strs+=x.children[1].value+"\n"
    })

    let data=await fetching_post_with_no_token(`${back_end_url}save`,{title:title,content:strs})
    //api 로 strs보내기!

    if(data.success){

      router.push(`currentversion/${title}`)
     
    }
    else{
      router.push("/")
    }




  }



  useEffect(()=>{
    console.log("useeffect:",default_view)
    if(default_view===false){
    let docs=document.getElementsByClassName("texts")
    Array.from(docs).map((x,idx)=>{

      //굳이 이렇게말고 아래의 태그에서 defaultvaluje를 설쟁해줘도 똑같이 돌아간다.
      x.value=compiler_data.current[idx]["text"]
      console.log(x.scrollHeight)
      
      x.style.height="auto"

      x.style.height=x.scrollHeight+"px"
      

    })
  }

  },[default_view])


  return (
    <div className="flex h-screen justify-center items-center">
    <div className=" flex flex-col  items-center border-[2px] text-[24px] w-full h-95p">
      <textarea id="title_area" className="w-90p text-left h-[75px] bg-blue-200 text-[50px] resize-none outline-0">dhzzzz</textarea>
      <div className="flex justify-center w-90p h-[50px] bg-blue-200">
        <div className="flex w-1/2 h-[25px] bg-blue-200  justify-evenly ">
      <button onClick={()=>show_window()} className="text-[20px]">
          미리보기
        </button>
        <button  className="text-[20px]"onClick={()=>show_compiler()}>
          편집기
        </button>
        </div>
        <div className="flex w-1/2 h-[25px] bg-blue-200  justify-evenly ">
       
        <button
          onClick={() => func("bold")}
    
          className= ' h-[25px] w-[25px] border-2 border-black' 
        >
                     <img
              src="../../bold.svg"
            />
        </button>
        <button
          onClick={() => func("italic")}
          
          className= ' h-[25px] w-[25px] border-2 border-black' 
        >
                               <img
              src="../../italic.svg"
            />
        </button>
        <button
          onClick={() =>func("strike")}

          className= ' h-[25px] w-[25px] border-2 border-black'
        >
                               <img
              src="../../strike.svg"
            />
        </button>
      





        </div>

      </div>



      {
        show_preview ?  <Preview text={preview_text}/>:
        (
          <div id="text_box" className="flex flex-col w-90p h-55p overflow-auto bg-blue-100">

          { default_view ? 
          (
        
          <div id="fir" className="row_box my-[1px] flex">
            <div className="text-center row_box_num w-[50px] h-[30px] bg-blue-200 border-2 text-[15px]">
                1
            </div>
            <textarea  id='1' spellCheck='false' rows={1} onInput={(event)=>textarea_auto_sizing(event)}  
            onKeyDown={(event)=>add_row_num(event)}
            onClick={(event)=>set_current_num(event)}
            className="texts w-full h-[30px]  bg-slate-300 resize-none outline-0 text-[15px]"
            >       
            
            </textarea>
          </div>) : 
          (
              compiler_data.current.map((x)=>(
              
              <div key={x["id"]} className="row_box my-[1px] flex">
                  <div className="text-center row_box_num w-[50px] h-[30px] bg-blue-200 border-2 text-[15px]">
                        {x["id"]}
                  </div>
                  <textarea  id={x["id"]} spellCheck='false'rows={1}  onInput={(event)=>textarea_auto_sizing(event)}  
                      onKeyDown={(event)=>add_row_num(event)}
                      onClick={(event)=>set_current_num(event)}
                      className="texts w-full h-[30px]  bg-slate-300 resize-none outline-0 text-[15px]"
                       >    
                  </textarea>
              </div>

              ))
          )
    
          


          }
          </div>

          
      )
      }
      <div className="w-90p flex justify-end ">
      <button  onClick={(event)=>save_text(event)}className="border-[2px] border-solid border-slate-200 bg-blue-100">저장하기</button>
      </div>
    </div>
    </div>
  )

}
//w-full h-[200px] bg-white


export default MenuBar;