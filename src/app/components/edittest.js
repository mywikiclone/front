
import React,{useEffect,useState,useRef} from 'react'
//import Preview from "./preview"
import { Pridi, Stick, Zen_Tokyo_Zoo } from 'next/font/google'
import { useRouter } from "next/navigation"
import { useSelector,useDispatch } from "react-redux"
import dynamic from 'next/dynamic'
import { get_db,get_data_from_db,add_data_in_db,check_in_db } from './indexdb'
import { makebase64 } from "./action";
import { fetching_post__with_token,fetching_get_with_no_token} from './fetching'
//import './style.scss'
const Test_Edit = ({content_id}) => {



  const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;


  const DnynamicPreview=dynamic(()=>import('../components/editpreviewtest'),{loading:()=><div>...loading</div>,ssr:false})
  //<Preview text={preview_text}/>

  const current_content=useSelector((state)=>state.current_content);
  const dispatch=useDispatch();

  let test=[];

  let ex=current_content.content.split("/n");

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
    current_big_list_box.current=null;
    current_small_list_box.current=null;
    if(show_preview!==true){
    compiler_data.current=[];
    let txtarea=document.getElementsByClassName("texts")
    let strs=""
    let reg_exp_big_title=/==.*?==/
    let reg_exp_small_title=/=.*?=/
    
    let big_title_list=[]
    let small_title_list=[]
    
    
    
    let strs_list=[]
  
    let small_list_num=1;
  
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
    
    fir_box.className=`w-[50px] row_box my-[1px] flex`
    //fir_box.id=`${row_number+1}`

    second_box.className="flex justify-center row_box_num w-full h-fit bg-blue-200  text-[15px]"
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
    Array.from(targets).map(x=>{
      
      strs+=x.children[1].value+"\n"
    })
    console.log("업데이트 되는값:",strs);
    //api 로 strs보내기!


    
    let res_data=await fetching_post__with_token(`${back_end_url}update`,{content_id:content_id,title:titles,content:strs})


      if(res_data.success){
          dispatch({type:"Change_Content",content:{
          content_id:content_id,
          title:titles,
          content:strs
          }})

     
            route.push(`/currentversion/${encodeURIComponent(titles)}`)
          
      }
      else{
       
        dispatch({type:"LogOut"})
        route.push("/login")
      }
    
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

    

    /*let sts=current_content.content.split("\n")
  
    let sts=datas.content.split("\n");
    console.log("얻어온 데이터를 \n기준으로 나눈거:",sts)
    sts.map((x,idx)=>{


        set_start_text((prev)=>[...prev,{id:idx,text:x}])


    })
    set_titles(datas.title);
    set_titles(current_content.title);*/
  }

  useEffect(()=>{
    
    setting_start_text(content_id)
    svg_url_arr.map((x,idx)=>{

      check_in_db("img_store",idx,x,img_useref_list[idx],3)


    })
    console.log("default_view:",default_view);

  },[])


/*useEffect(()=>{

   let sts=current_content.content.split("\n")
  
    //let sts=datas.content.split("\n");
    console.log("얻어온 데이터를 \n기준으로 나눈거:",sts)
    set_start_text([])
    sts.map((x,idx)=>{

        
        set_start_text((prev)=>[...prev,{id:idx,text:x}])
        

    })
    
    
    //set_titles(datas.title);
    set_titles(current_content.title);

    
    console.log("바뀐 current_content값:",current_content);
    set_start_text(current_content.content.split("\n"))


  },[current_content])*/




  return (
    <div className="flex w-full h-screen  lg:items-center items-start lg:justify-center justify-start ">
    <div className=" flex flex-col  items-center border-[2px] text-[24px] w-full h-95p">
      <div className=" text-left h-[75px] bg-blue-200 text-[50px] lg:w-90p w-full">{current_content.title}
       
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
          <div id="text_box" className="flex flex-col lg:w-90p w-full h-55p overflow-auto bg-blue-100">

          { default_view ? 
          

            start_text.map((x,idx)=>(
                
                <div key={idx} className="row_box my-[1px]   flex">
                   <div className="text-center row_box_num w-[50px] h-[30px] bg-blue-200 border-2 text-[15px]">
                          {idx}
                    </div>
                <textarea  id={idx} spellCheck='false'rows={1}   
                    onInput={(event)=>textarea_auto_sizing(event)}
                    onKeyDown={(event)=>add_row_num(event)}
                    onClick={(event)=>set_current_num(event)}
                    className="texts w-full   bg-slate-300 resize-none outline-0 text-[15px]"
                    defaultValue={x} >    
                </textarea>
                    
                </div> 
  
                ))
               
                  
             : 
          (
              compiler_data.current.map((x)=>(
              
              <div key={x["id"]} className="row_box w-[50px] flex">
                  <div className="flex justfiy-center row_box_num w-full h-fit bg-blue-200  text-[15px]">
                        {x["id"]}
                  </div>
                  <textarea  id={x["id"]} spellCheck='false'rows={1}
                      onInput={(event)=>textarea_auto_sizing(event)} 
                      onKeyDown={(event)=>add_row_num(event)}
                      onClick={(event)=>set_current_num(event)}
                      style={{height:x.height}}
                      className={`texts w-full  bg-slate-300 resize-none outline-0 text-[15px]`}
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




export default Test_Edit;