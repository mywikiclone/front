import { useEffect,useState,useRef } from "react"
import { fetching_get_with_no_token, fetching_post__with_token, fetching_post_with_no_token } from "./fetching"
import { motion } from "framer-motion"
import DiscussionPreview from "./discussionpreview"
import Link from "next/link"
import { useSelector,useDispatch } from "react-redux"
import { Denk_One } from "next/font/google"
import Edit_By_Id from "./edit_by_id"
import { useRouter } from "next/navigation"


const Topic=({topic_id})=>{



    const current_discussion=useSelector((state)=>state.current_discussion);

    const dispatch=useDispatch();


    const edit_box=useRef(null);
    const router=useRouter();
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL
    const end_point=useRef(null);
    let [comment_list,set_comment_list]=useState([]);
    let save_btn=useRef(null);
    let [discussion,setting_discussion]=useState(null);
    let [click_num,set_click_num]=useState(0);
    let [end,set_end]=useState(false);
    let [show,set_show]=useState(true)
    let [preview,set_preview]=useState(false);
    let [text,set_text]=useState([]);
    const reqlogin_msg=process.env.NEXT_PUBLIC_RELOGIN_SIGN;




    const comment_list_box=useRef(null);
    const get_comments=async()=>{


       let data=await fetching_get_with_no_token(`${back_end_url}getcomments/${topic_id}/${click_num}`)

       if(data.success){
        data.data.map((x)=>{
            console.log("타입:",typeof(x.create_Time))
        })
        set_comment_list(data.data);


        return ;
       }

       set_comment_list([]);
       return ;

    }
    const savecomment=async()=>{
         
            save_btn.current.disabled=true;
            let disables=await fetching_get_with_no_token(`${back_end_url}timecheck/${topic_id}`)
            console.log("test:",disables.data);
            
            if(disables.success && disables.data!=null){
                alert("마감");
                return ;
            }
          
       
                
            let data=await fetching_post__with_token(`${back_end_url}savecomment`,{topic_id:topic_id,comment_content:text})
                if(data.success){

                    make_child_list([data.data]);
                    //doc.value="";
                    set_text("");
                    

                    console.log("잇나:",edit_box.current);
                    if(edit_box.current!=null){

                        edit_box.current.value=""


                    }

                    setTimeout(()=>{save_btn.current.disabled=false
                    
                    },1000)
                    console.log("savecommentend");
                    return;
                }


                else{
                    if(data.msg===reqlogin_msg){
                        setTimeout(()=>{save_btn.current.disabled=false
                            
                        },1000)
                        dispatch({type:"Change_user",userdata:{user_id:""}})
                        router.push("/login")
                        return ;
                    
                    }





                    alert("모종의이유로실패")
                    setTimeout(()=>{save_btn.current.disabled=false
                                
                    },1000)

                }
    
            


    }

    const make_child_list=(arrs)=>{
        let div_for_list=document.getElementById("comment_list")
        let nums=Array.from(div_for_list.children).length;
        
        let hrefpattern=/#.*?#/g;
        let pattern=/\n/g;
        let hrefarr=[]
        
        arrs.map((x,idx)=>{
            hrefarr=x.comment_content.match(hrefpattern);
            
            let comment_content=x.comment_content;
            if(hrefarr){
            let hrefarrs=hrefarr.map((x)=>{

                let arrs=x.split("#");

                return `<a class="text-blue-400" href=#${arrs[1]}>${arrs[1]}</a>`;

            })
            let idx=0;
            comment_content=x.comment_content.replace(hrefpattern,()=>{
                return `${hrefarrs[idx++ %hrefarrs.length]}` 
            })
            }

            comment_content=comment_content.replace(pattern,()=>{
                return "<br>";
            })
           
      
            let divs=document.createElement("div");
            let divs_title=document.createElement("div");
            
            let divs2=document.createElement("div");
            let divs3=document.createElement("div")
            let divs4=document.createElement("div");
            let text_box=document.createElement("div");
            text_box.className="overflow-y-auto max-h-[300px]"
            
            divs.id=`${idx+nums}`;
            divs.className="text-[13px] min-w-[300px] max-w-90p  flex flex-col border-solid border-[1px] rounded border-slate-500 mt-[10px] mb-[10px]"
            
            
            
            divs2.textContent=`#${idx+nums} ${x.writer_email}`
            divs2.className="text-blue-500 ml-[5px]"
            divs3.textContent=`${x.create_Time.substring(0,16)}`
            divs3.className="mr-[5px] text-blue-500"


            divs_title.className="flex justify-between bg-green-300"
            divs_title.appendChild(divs2);
            divs_title.appendChild(divs3);

            divs4.innerHTML=`${comment_content}`
            divs4.className="m-[5px] break-words"
            divs.appendChild(divs_title);
            text_box.appendChild(divs4);
            divs.appendChild(text_box);

            div_for_list.appendChild(divs);
        })

       



    }


    const vars={

        open:{height:"100px"},
        closed:{height:0}}

    const setting_preview=(event)=>{
        let btnarea=document.getElementById("btnarea");
        let childs=Array.from(btnarea.children);
        childs.pop();
        console.log(childs)
        childs.map((x)=>{
            change_color(x,false);
          


        })
    
        change_color(event.target,true);
        set_preview(true);
        let doc=document.getElementById("text");
        console.log("setting_preview:",doc.value);
        set_text(doc.value);

        

    }


    const setting_preview2=(event)=>{
        let btnarea=document.getElementById("btnarea");
        let childs=Array.from(btnarea.children);
        childs.pop()
        console.log(childs)
        childs.map((x)=>{
            change_color(x,false);
          


        })
    
        change_color(event.target,true);
        set_preview(false)            
    
        



    }



    const show_more=async()=>{


        let data= await fetching_get_with_no_token(`${back_end_url}getcomments/${topic_id}`)

        if(data.success){
            
            console.log("success");
  
            make_child_list(data.data);
            
            
            return ;
        }

       
        set_end(true);
        console.log("fail");
        
        
        return ;

    }
    const change_color=(targets,bools)=>{
        if(bools){
        targets.className="flex items-center border-[1px] bg-slate-100 border-solid border-slate-500  text-[20px]"}
        else{
            targets.className="flex items-center border-[1px] bg-slate-100 border-solid border-slate-200  text-[20px]"
        }
    }

    const change_show=()=>{

        set_show(!show)
    

    }

    const disable_set=(now,deadline)=>{
        if(now.getTime()>=deadline.getTime()){
            save_btn.current.disabled=true;
            return ;
        }


    }
    const set_discussion=async (topic_id)=>{
        console.log("토픽체크:",topic_id!=current_discussion.topic_id)
        if(topic_id!=current_discussion.topic_id){
            
            let data=await fetching_get_with_no_token(`${back_end_url}getdiscussion/${topic_id}`);
            if(data.success){

                let now=new Date();
                let deadline=new Date(data.data.deadline+"Z");
                disable_set(now,deadline);
                console.log("deadline:",deadline);
                deadline=data.data.deadline.substring(0,16).replace("T","-");
                dispatch({type:"Change_Discussion",discussion:{
                    topic_id:topic_id,
                    topic_title:data.data.topic_title,
                    deadline:deadline,
                    subject_title:data.data.subject_title,
                    member_id:data.data.writer_email,
                    introduction_text:data.data.introduction_text
                }})
        

                return;

            }
            return;

        }


        return;



    }
    const textsetting=()=>{

        set_text(edit_box.current.value);
        console.log("text세팅완료");


    }


  


    useEffect(()=>{

        console.log("topic_id:",topic_id);
        set_discussion(topic_id)

    },[])
    useEffect(()=>{
        console.log("discussion:",current_discussion);
        if(current_discussion.topic_id!=0){
        
        show_more();
        }


    },[current_discussion])

 


    return (


        <div id="main realtive" className="w-full flex flex-col justify-center items-center text-[15px]">
            <div className="w-90p mt-[5px] flex flex-col ">
                <Link className="mb-[5px] text-[30px] text-[25px] " href={`/currentversion/${encodeURIComponent(current_discussion.subject_title)}`}>{current_discussion.subject_title} (토론)</Link>
                <div className="text-[20px]">{current_discussion.topic_title}</div>
                <div className="text-[20px]">{current_discussion.member_id}</div>
                <div className="text-[20px]">{current_discussion.deadline}에 마감됩니다.</div>
                <div className="text-[15px]">간단한 소개글:{current_discussion.introduction_text}</div>
                
            </div>
            <div id="comment_list" className="mb-[20px] w-90p flex flex-col " ref={comment_list_box}>


            </div>
            <div className="fixed lg:w-52.5p w-full flex flex-col bottom-[0px] ">
            <div id="btnarea" className="ml-auto flex justify-end "> 
                
                <button ref={save_btn} onClick={()=>savecomment()}className="flex items-center border-[1px] bg-slate-100  border-solid border-slate-200 text-[20px]">save</button>
                <button onClick={(event)=>setting_preview2(event)}className="flex items-center border-[1px] bg-slate-100  border-solid border-slate-500 text-[20px]">edit</button>
                <button onClick={(event)=>setting_preview(event)} className="flex items-center border-[1px] bg-slate-100  border-solid border-slate-200 text-[20px]">preview</button>
                <button className="flex items-center border-[1px] border-solid border-slate-200 text-[20px] bg-slate-100  lg:mr-0 mr-[10px]"onClick={()=>change_show()}>x</button>
            </div>   
            {preview ?  <DiscussionPreview text={text} show={show}/> : <motion.textarea id="text" ref={edit_box} onChange={(event)=>textsetting(event)} className="relative bg-slate-100 border-solid border-slate-300 border-[1px]"
                     variants={vars}

                     initial={show ? "open":"closed"}
                         
                     animate={show ? "open":"closed"}
                     transition={{duration:0.5}}
            
                    defaultValue={text}
            
            >
            
            </motion.textarea>
            } 
           
           
            </div>

    
        </div>


    )



}


export default Topic;

/*
<Link href={`/discussion/${}`}>{topic_title}</Link>*/ 
/*






*/ 