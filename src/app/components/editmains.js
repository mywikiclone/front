import React,{useEffect,useState,useRef} from 'react'
//import Preview from "./preview"

import { useRouter } from "next/navigation"
import { useSelector,useDispatch } from "react-redux"
import dynamic from 'next/dynamic'
import { get_db,get_data_from_db,add_data_in_db,check_in_db } from './indexdb'
import { fetching_post__with_token,fetching_get_with_no_token} from './fetching'

import TextEngine from './textengine'

const Edit_Main = () => {

  const dispatch=useDispatch();
  const title_input=useRef(null);
  const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
  const relogin_error_msg=process.env.NEXT_PUBLIC_RELOGIN_SIGN;
  const DnynamicPreview=dynamic(()=>import('./editpreview'),{loading:()=><div>...loading</div>,ssr:false})
  //<Preview text={preview_text}/>

  const route=useRouter();
  const tags_for_edit={
    bold:"<b></b>",
    strike:"<s></s>",
    italic:"<i></i>",
    underline:"<u></u>",

  }
  //const [current_box,set_current_box]=useState(1);-->usestate는 값이바뀔떄마다 리랜더링발생
  const current_box=useRef(1);
  const [show_preview,set_show_preivew]=useState(false);
  const [preview_text,set_preview_text]=useState("");
  const [titles,set_titles]=useState("");
  const [compiler_text,set_compiler_text]=useState([])
  const compiler_data=useRef();
  const [default_view,set_deafult_view]=useState(true);
  const [start_text,set_start_text]=useState([""]);
  const italic=useRef(null);
  const bold=useRef(null);
  const strike=useRef(null)
  const img_useref_list=[italic,bold,strike];
  const set_current_num=(event)=>{
     // set_current_box(Number(event.target.id))
     current_box.current=Number(event.target.id)
  }
  
const svg_url_arr=["public/italic.svg","public/bold.svg","public/strike.svg"]

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
    let x=doc.scrollHeight+"px"
    doc.style.height=x;
  }

  const auto_end=(text)=>{
    let reg_exp_big_title=/=_=.*?=_=/
    let reg_exp_small_title=/=-=.*?=-=/
    let intro_free_box_pattern=/====.*?====/g;

    console.log("ayto_end_text:",text);


    if(text.match(intro_free_box_pattern)!=null&&text.split("====")[1]!=="끝"){

      
      return "====끝====";

    }
    if(text.match(reg_exp_big_title)!=null&&text.split("=_=")[1]!=="끝"){

      
      return "=_=끝=_=";

    }
    if(text.match(reg_exp_small_title)!=null&&text.split("=-=")[1]!=="끝"){

      
      return "=-=끝=-=";

    }

    return "";


  }



  const make_new_rows=(auto_end_text,parent,row_number)=>{
    let text_area_arr=document.querySelectorAll(".texts");
    let row_number_div_arr=document.querySelectorAll(".row_box_num");
    let fir_box=document.createElement("div")
    let second_box=document.createElement("div")
    let third_box=document.createElement("textarea");
    
    fir_box.className=`row_box my-[1px] flex`
    //fir_box.id=`${row_number+1}`

    second_box.className="flex justify-center row_box_num w-[50px] h-fit  text-[15px]"
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
    third_box.className="texts w-full h-fit resize-none outline-0 text-[15px]"
    third_box.rows="1";
    third_box.textContent=auto_end_text;
    third_box.addEventListener("keydown",add_row_num)
    third_box.addEventListener("input",textarea_auto_sizing)
    third_box.addEventListener("click",set_current_num)
    third_box.addEventListener("focus",function(event){
      show_border_line(event,true)
    })
    third_box.addEventListener("blur",function(event){
      show_border_line(event,false)
    })


    fir_box.appendChild(second_box)
    fir_box.appendChild(third_box)
    parent.after(fir_box)
    return {fir:fir_box,third:third_box};
  }

  const add_row_num=(event)=>{
    if(event.keyCode===13){

    let auto_end_text=auto_end(event.target.value);
    console.log("ayto text check:",auto_end_text,event.target.value);
    event.preventDefault();
   
    let row_number=Number(event.target.id);
    let parent=event.target.parentElement;
    let returnobject;
    returnobject=make_new_rows("",parent,row_number);

    
    if(auto_end_text!==""){
      row_number+=1;
      make_new_rows(auto_end_text,returnobject.fir,row_number);

    }

    returnobject.third.focus();
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
    Array.from(targets).map(x=>{
      
      strs+=x.children[1].value+"\n"
    })
    console.log("업데이트 되는값:",strs);
    console.log("제목:",title_input.current.value);
    //api 로 strs보내기!


    
    let res_data=await fetching_post__with_token(`${back_end_url}save`,{title:title_input.current.value,content:strs})
    console.log("res_data:",res_data);

      if(res_data.success){

            console.log("res_data:",res_data);
            dispatch({type:"Change_Content",content:{content_id:res_data.data.content_id,title:res_data.data.title,content:res_data.data.content,update_time:res_data.data.update_time,email:res_data.data.email}})
            route.push(`/currentversion/${encodeURIComponent(res_data.data.title)}`)
          
      }
      else{

        if(res_data.msg===relogin_error_msg){
          dispatch({type:"Change_User",userdata:{user_id:""}})
          route.push("/login")

        }
        else{
          alert("알수없는 오류발생")
        }
      
      }
     return ;
    
    }

  const setting_start_text=async(id)=>{

   let datas="";
    if(id!==current_content.content_id){
      console.log("id:",id,typeof(id))
      console.log("id2:",current_content.content_id,typeof(current_content.content_id));

      datas=await fetching_get_with_no_token(`${back_end_url}search/id/${id}`)


      if(datas.success){
      datas=datas.data;



      //{content_id,title,content 로구성됨.}



      dispatch({type:"Change_Content",content:{content_id:datas.content_id,title:datas.title,content:datas.content}})
     
      console.log("dispatch in edit");
      set_start_text(datas.content.split("\n"))

      set_titles(datas.title);
      }
      else{
        console.log("여기서발생하는건가?")
        alert("없는 문서입니다!")
        route.push("/")

      }
     return ;
  

    }
    else{
      console.log("기존에잇던거")
      datas=current_content.content;
      console.log("datas:",datas);
      set_titles(current_content.title);
      set_start_text(datas.split("\n"))
    }

    //왜인지는 모르겟는대 아래맵에서 start_text를 참조하지않고 reducr의 current_content의 content혹은 current_content.content.split(~~) 혹은 content_arr
    //를 참조하는 map을 넣어도 첫번쨰 값은 항상 이전 state값이 유지가된다. current_content자체는 업데이트가 잘되는대
    //영문을 모르겠다. useeffect에다가 current_content를 넣은것을 주석을 해제하면 분명
    //useeffect가 2번 작동하나 그럼에도 불구하고 첫번쨰값은 그대로 이전 reducer의 상태값을 가져온다 ,..왜지???
    

    //진짜모르겟다 여기함수의 set함수를 지워놓고 아래의 current_content를 의존성 배열로갖느,ㄴ useeffect를 해제해도
    //첫번쨰값은 무조건이전state값이 달려나온다 나머지값은 바뀐값으로 나오는대...
    //값자체는 store든 state는 업데이트가되는대 랜더링 되는 화면이상핟. useeffect는 정상작동하고 왜지..?
    //reducer->state로가는 시간차가 머ㅜㄴ가있나??그렇다쳐도 current_content자체가 바뀌는 상황인대 처음부터 재랜더링되는게맞지않나?
    console.log("somethingtocheck");

    


  }

  useEffect(()=>{
    //console.log("searbh_box:",current_search_box.popup)
    //setting_start_text(current_content.content_id)
    svg_url_arr.map((x,idx)=>{

      check_in_db("img_store",idx,x,img_useref_list[idx],3)


    })
    console.log("default_view:",default_view);

  },[])


  const show_border_line=(event,check)=>{
    if(check){
    event.target.className="texts w-full   overflow-hidden resize-none outline-0 text-[15px] h-fit border-solid border-[1px] border-slate-300"}
    else{
      event.target.className="texts w-full  overflow-hidden resize-none outline-0 text-[15px] h-fit"
    }
  }



  return (
    <div className="flex w-full h-screen  lg:items-center items-start lg:justify-center justify-start ">
    <div className=" flex flex-col  items-center border-[2px] text-[24px] w-full h-95p">
      <div className=" text-left h-[75px]  lg:w-90p w-full">
        <input ref={title_input} className="text-[15px] h-fit w-fit" placeholder='제목을 입력해주세요'></input>
      </div>
      <div className="flex justify-center lg:w-90p w-full h-[50px] bg-blue-200">
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
              ref={bold}
            />
        </button>
        <button
          onClick={() => func("italic")}
          
          className= ' h-[25px] w-[25px] border-2 border-black' 
        >
                               <img ref={italic}
              
            />
        </button>
        <button
          onClick={() =>func("strike")}

          className= ' h-[25px] w-[25px] border-2 border-black'
        >
                               <img
             ref={strike}
            />
        </button>
      





        </div>

      </div>



      {
        show_preview ?   <DnynamicPreview text={preview_text}/>: 
        (
          <div id="text_box" className="flex flex-col lg:w-90p w-full h-55p border-solid border-[1px] overflow-auto ">

          { default_view ? 
          

            start_text.map((x,idx)=>(
                
                <div key={idx+1} className="row_box my-[1px] flex">
                   <div className="text-center row_box_num w-[50px] h-fit  text-[15px]">
                          {idx+1}
                    </div>
                <textarea  id={idx+1} spellCheck='false'rows={1}   
                    onInput={(event)=>textarea_auto_sizing(event)}
                    onKeyDown={(event)=>add_row_num(event)}
                    onClick={(event)=>set_current_num(event)}
                    onFocus={(event)=>show_border_line(event,true)}
                    onBlur={(event)=>show_border_line(event,false)}
                    className="texts w-full resize-none outline-0 overflow-hidden
                     text-[15px] h-fit"
                    defaultValue={x} >    
                </textarea>
                    
                </div> 
  
                ))
               
                  
             : 
          (
              compiler_data.current.map((x)=>(
              
              <div key={x["id"]} className="row_box my-[1px] flex">
                  <div className="text-center row_box_num w-[50px] h-fit  text-[15px]">
                        {x["id"]}
                  </div>
                  <textarea  id={x["id"]} spellCheck='false'rows={1}
                      onInput={(event)=>textarea_auto_sizing(event)} 
                      onKeyDown={(event)=>add_row_num(event)}
                      onClick={(event)=>set_current_num(event)}
                      onFocus={(event)=>show_border_line(event,true)}
                      onBlur={(event)=>show_border_line(event,false)}
                      style={{height:x.height}}
                      className="texts w-full   resize-none outline-0 text-[15px] h-fit overflow-hidden"
                       defaultValue={x["text"]}>    
                  </textarea>
              </div>

              ))
          )
    
          


          }
          </div>

          
      )
      }
      <div className="lg:w-90p w-full flex justify-end ">
      <button  onClick={(event)=>save_text(event)}className="border-[2px] border-solid border-slate-200 bg-blue-100">저장하기</button>
      </div>
    </div>
    </div>
  )

}



export default Edit_Main;