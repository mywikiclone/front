"use client"
import { useRef,useState,useEffect } from "react"

import Link from "next/link"
//import { useRouter } from "next/router"-->usecliuent 사용시에는 next navigation이용
import { useRouter } from "next/navigation"
import { fetching_get_with_no_token } from "./fetching"
import { useDispatch } from "react-redux"



const Search_box=()=>{
    let [related_search_list,set_related_serach_list]=useState([]);
    let event_mem=useRef(null)
    const usedispatch=useDispatch();
    let [popup,setpopup]=useState(false)
    const popup_window=useRef(null);
    const router=useRouter();
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
    let searchbox=useRef(null);




    const get_related_data=async(title)=>{
        
        if(title===""){
            set_related_serach_list([]);
            return ;
        }


       /* let res=await fetching_get_with_no_token(`${back_end_url}searchlogic/${title}`);

        console.log("data:",res.data);
        if(res.success){
  
            set_related_serach_list(res.data);
            setpopup(true);

            return ;
        }*/

   

        set_related_serach_list([]);
        
        return ;


    }

    const search_event=(value)=>{


        if(value!==""){
            
        
            if(event_mem.current!==null){
            
                clearTimeout(event_mem.current);
            }
    
            event_mem.current=setTimeout(()=>{get_related_data(value)},300)

           // console.log(event_mem.current)
        }
        else{
         
          

        }
      } 



    const search_submit=(event)=>{
        event.preventDefault();
    
        let strs= event.target.children[0].value
    
        event.target.children[0].value=""
        router.push(`/currentversion/${encodeURIComponent(strs)}`)
        setpopup(false);
        // 나중에 링크 태그와 라우터의 차이를 알아보도로갛자 ㅇㅇ;window.location.assign()    

    }
    

    const foucus_out_func=()=>{
        setpopup(false);
       // console.log("focus out:",width);
        //console.log("값:",searchbox.current.value);
        
       
    }




    const click_search_submit=(event)=>{
        console.log("click_search_submit")
        searchbox.current.value="";
        setpopup(false);
        router.push(`/currentversion/${encodeURIComponent(event.target.textContent)}`)
        //router.push(`/currentversion/${encodeURIComponent(strs)}`)
        //window.location.assign(``)    

       
        

    }

    const handle_change=(e)=>{
        let value=e.target.value;
        console.log("change_Value:",value);
        if(value!==""){
        
        search_event(value);
        
    
        }
        else{

            setpopup(false);
        }


    }
    const random_search_event=async()=>{
        console.log("랜덤문서")
  
        let data=await fetching_get_with_no_token(`${back_end_url}random`)
        if(data.success){
  

            dispatch({type:"Change_Content",content:{content_id:data.content_id,title:data.title,content:data.content,email:data.email,update_time:data.update_time}})
 
            setpopup(false)
  
          router.push(`/currentversion/${data.title}`) 
  
        }
        else{





          console.log("랜덤할게없내요..?")
        }
        
  
      }

      const handleClickOutside=(event)=>{
        if (popup_window.current && !popup_window.current.contains(event.target)) {
            setpopup(false);
        }
      }

      useEffect(() => {
        if (popup) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popup]);
    




    //아래 왜안뜨나햇더니 global.css에서 nav a 즉 nav클래스의 a태그 애들에다가 전부다 마인 60을 주고있어서 안보였던것
    //이거는 양보해서 그냥 div를 클릭이벤트로 넘기도록하자.
return(

    <div className="w-full relative h-fit">
        <div className="flex items-center">
            <button className="flex justify-center items-center bg-white border-solid border-[1px] lg:border-l-[1px] border-l-0 border-slate-300 lg:rounded-lg rounded-none lg:h-[45px] h-[35px] w-[45px]" onClick={()=>{random_search_event()}}>⟳</button>
            <form className="w-full h-fit" onSubmit={(e)=>{search_submit(e)}}>
       
            <input ref={searchbox} type="text"  id="search_box" autoComplete="off" className="h-[35px] outline-none lg:border-0 border-[1px] lg:border-r-[1px] border-r-0 lg:border-l-[1px] border-l-0 lg:w-[250px] w-full lg:ml-[10px] border-solid border-slate-300 ml-0"onChange={(event)=>handle_change(event)} placeholder="값을 입력하세요">
            </input>
           
            </form>

        </div> 
        { popup && related_search_list.length>0 ? 
            <div ref={popup_window} className={`absolute bottom-[${-50*related_search_list.length}px] flex flex-col lg:left-[52px] left-0 border-solid border-slate-200 border-[1px] rounded-3p bg-white  mt-[5px] shadow-xl lg:w-[250px] w-full z-50`}>
                {related_search_list.map((x,idx)=>
                    <Link  href={`/currentversion/${encodeURIComponent(x.title)}`}key={idx} className="w-full h-[50px] text-[15px] p-[10px] truncate" onClick={(event)=>click_search_submit(event)}>
                        {x.title}
                    </Link>

                )}   
            </div>  
            
        :null}

    </div>
        



  

)

}

export default Search_box;


/*

               <Link  href=" "key={idx} className="w-full my-[5px] ml-[5px] text-[15px] p-[10px] truncate" onClick={(event)=>click_search_submit(event)}>
                        {x.title}
                    </Link>




*/




/*{   

    popup.current ?
    <div className="w-[250px] h-[200px] border-solid border-slate-200 border-[1px] rounded-3p bg-white ml-[10px] mt-[5px] shadow-xl"></div>
    :null}



     { popup &&<Search_List data_list={related_serach_list}/>}
        
*/