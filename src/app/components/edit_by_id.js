
import React,{useEffect,useState,useRef} from 'react'
//import Preview from "./preview"

import { useRouter } from "next/navigation"
import { useSelector,useDispatch } from "react-redux"
import dynamic from 'next/dynamic'
import { check_in_db } from './indexdb'
import { fetching_get_with_no_token, fetching_post__with_token_and_csrf} from './fetching'

import TextEngine from './textengine'
import Nothing from './nothing'

import MyClass from './MyClass'
import { clear_redirect_path, set_redirect_path } from '../reducers/redirect_path'

const Edit_By_Id = ({content_id}) => {

 

  let [error,set_error]=useState(false)
  const myclassinstance=new MyClass();
  const current_redirect_path=useSelector((state)=>state.current_redirect_path);
  const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
 
  const DnynamicPreview=dynamic(()=>import('./editpreview'),{loading:()=><div>...loading</div>,ssr:false})
  //<Preview text={preview_text}/>

  const current_content=useSelector((state)=>state.current_content);
  const dispatch=useDispatch();
  const redirect_handler=(text)=>{
    dispatch({type:"Change_User",userdata:{user_id:""}})
    dispatch(set_redirect_path(text));

  }

 


  const route=useRouter();
  const tags_for_edit={
    bold:"<b></b>",
    strike:"<s></s>",
    italic:"<i></i>",
    underline:"<u></u>",

  }
  //const [current_box,set_current_box]=useState(1);-->usestate는 값이바뀔떄마다 리랜더링발생
  const current_box=useRef(1);
  const current_big_list_box=useRef(null);
  const current_intro_box=useRef(`<div class="w-fit h-fit">`);
  const current_free_detail_box=useRef(null);
  let intro_free_detail_box_list=[];




  const current_small_list_box=useRef(null);
  let [big_titles,set_big_titles]=useState([])
  let[small_titles,set_small_titles]=useState([]);


 

  const [show_preview,set_show_preivew]=useState(false);
  const [preview_text,set_preview_text]=useState("");
  const [titles,set_titles]=useState("");
  const [compiler_text,set_compiler_text]=useState([])
  const compiler_data=useRef();
  const [default_view,set_deafult_view]=useState(true);
  const [start_text,set_start_text]=useState([]);
  const italic=useRef(null);
  const bold=useRef(null);
  const strike=useRef(null)
  const img_useref_list=[italic,bold,strike];
  const set_current_num=(event)=>{
     // set_current_box(Number(event.target.id))
     current_box.current=Number(event.target.id)
  }
  
const svg_url_arr=["public/italic.svg","public/bold.svg","public/strike.svg"]

  /*const check_in_db=async (idx,url)=>{

    let db=await get_db();
    let data=await get_data_from_db(db,"img_store",idx)
    let base64string="";   
    if(data===undefined){
      base64string=await makebase64(url)
      let x= await add_data_in_db(db,"img_store",idx,base64string)
      switch(idx){
        case 3:
          italic.current.src=base64string;
          break;
        case 4:
          bold.current.src=base64string;
          break;
        case 5:
          strike.current.src=base64string;
          break;

        default:
          break;
      }
    }
    else{
     
      switch(data.id){
        case 3:
          italic.current.src=data.data;
          break;
        case 4:
          bold.current.src=data.data;
          break;
        case 5:
          strike.current.src=data.data;
          break;

        default:
          break;
    }
    }


  }*/


  const show_window=()=>{
    compiler_data.current=[];
    let txtarea=document.getElementsByClassName("texts")
    let strs="";
    let introductions=""
    let intro_index=""
    Array.from(txtarea).map((x)=>{
        
      compiler_data.current=[...compiler_data.current,{id:x.id,text:x.value,height:(x.scrollHeight+"px")}]
   
      let texts=x.value;

      texts=TextEngine(texts,myclassinstance);



      strs+=texts;
    })
    intro_index=TextEngine("intro_index",myclassinstance);
    introductions=TextEngine("intro",myclassinstance);
    strs=introductions+strs+TextEngine("각주리스트",myclassinstance);
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
      
      let docs=document.getElementById(`${nums}`)
      docs.focus();}
  

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
   
    }

  }
  const save_text=async (event)=>{
    let targets=event.target.parentElement.parentElement.children[2].children;
    let strs=""
    Array.from(targets).map(x=>{
      
      strs+=x.children[1].value+"\n"
    })
  
    //api 로 strs보내기!

    let title_to_save=titles;

    strs=strs;

    
    let res_data=await fetching_post__with_token_and_csrf(`${back_end_url}update`,{content_id:content_id,title:title_to_save,content:strs},redirect_handler)

      if(res_data.success){
          
          dispatch({type:"Change_Content",content:{
          content_id:content_id,
          title:title_to_save,
          content:strs,
          update_time:res_data.data,
          email:current_content.email,
          grade:current_content.grade
          }})

     
           route.push(`/currentversion/${encodeURIComponent(title_to_save)}`);
          
      }
      else{


       // alert("권한부족 혹은 알수없는 오류입니다");

        /*if(res_data.msg===relogin_error_msg){
          dispatch({type:"Change_User",userdata:{user_id:""}})
          route.push("/login")

        }*/
          set_error(false);

          return ;
      
      }
    
    }

  const setting_start_text=async(id)=>{

   let datas="";
    if(id!==current_content.content_id){
  
      

      datas=await fetching_get_with_no_token(`${back_end_url}search/id/${id}`,redirect_handler)


      if(datas.success){
      datas=datas.data;



      //{content_id,title,content 로구성됨.}


      dispatch({type:"Change_Content",content:{content_id:datas.content_id,title:datas.title,content:datas.content,email:datas.email,update_time:datas.update_time,grade:datas.grade}})
      //dispatch({type:"Change_Content",content:{content_id:datas.content_id,title:datas.title,content:datas.content}})
     
      set_start_text(datas.content.split("\n"))
  
      set_titles(datas.title);
      }
      else{
        set_error(true)

      }
     return ;
  

    }
    else{
    
      datas=current_content.content;
     
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
    

    


  }

  useEffect(()=>{
    dispatch(clear_redirect_path());
    setting_start_text(content_id)
    img_useref_list.forEach((x,idx)=>{
      if(x.current){
      check_in_db("img_store",idx,svg_url_arr[idx],x,3)
      }
    })



  },[])


  useEffect(()=>{

    if(current_redirect_path.path){


      route.push(current_redirect_path.path);

    }

  },[current_redirect_path])




  const show_border_line=(event,check)=>{
    if(check){
    event.target.className="texts w-full   overflow-hidden resize-none outline-0 text-[15px] h-fit border-solid border-[1px] border-slate-300"}
    else{
      event.target.className="texts w-full  overflow-hidden resize-none outline-0 text-[15px] h-fit"
    }
  }

/*
 이걸로 조건부 렌더링을 걸어두면은 useref값이 늦게들어간다 왜인지는모르겟다시발...
*/ 

  return (
    <div className="flex w-full h-screen  lg:items-center items-start lg:justify-center justify-start ">
    {error ?  <Nothing/> :
  

    <div className=" flex flex-col  items-center  text-[24px] w-full h-95p">
      
      <div className=" h-[75px]  flex flex-col justify-center  lg:w-90p w-full">
         <div  className="text-[30px] h-fit w-full border-solid border-[1px]">{current_content.title}</div>
      </div>
      <div className="flex justify-center items-center lg:w-90p w-full h-[50px] bg-white border-[1px] border-solid border-b-0">
        <div className="flex w-1/2 h-[25px]  mr-[20px] justify-evenly ">
          <button onClick={()=>show_window()} className="text-[20px]">
            미리보기
          </button>
          <button  className="text-[20px]"onClick={()=>show_compiler()}>
            편집기
          </button>
        </div>
        <div className="flex w-1/2 h-[25px] justify-evenly ">
        <button onClick={() => func("bold")} className= 'h-[25px] w-[25px] border-[1px] rounded-3p border-solid border-slate-300' >
              <img ref={bold}/>
        </button>
        <button onClick={() => func("italic")} className= 'h-[25px] w-[25px] border-[1px] rounded-3p border-solid border-slate-300' >
            <img ref={italic}/>
        </button>
        <button onClick={() =>func("strike")} className= 'h-[25px] w-[25px] border-[1px] rounded-3p border-solid border-slate-300'>
          <img ref={strike}/>
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
      <button  onClick={(event)=>save_text(event)}className="border-[2px] border-solid rounded-3p border-slate-200">저장하기</button>
      </div>
    </div>
  }
    
    </div>
  )

}
//w-full h-[200px] bg-white


/*
(
             start_text.length!==0 ?
            (start_text.map((x)=>(
                
                <div key={x["id"]} className="row_box my-[1px] flex">
                   <div className="text-center row_box_num w-[50px] h-[30px] bg-blue-200 border-2 text-[15px]">
                          {x["id"]}
                    </div>
                    <textarea  id={x["id"]} spellCheck='false'rows={1}  onInput={(event)=>textarea_auto_sizing(event)}  
                        onKeyDown={(event)=>add_row_num(event)}
                        onClick={(event)=>set_current_num(event)}
                        className="texts w-full h-[30px]  bg-slate-300 resize-none outline-0 text-[15px]"
                        defaultValue={x["text"]} >    
                    </textarea>
                </div> 
  
                )))
                :null
            
            )

*/ 




export default Edit_By_Id;