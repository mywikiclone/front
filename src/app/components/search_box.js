"use client"
import { useRef,useState } from "react"
import Search_List from "./searchedlist"
import Link from "next/link"
//import { useRouter } from "next/router"-->usecliuent 사용시에는 next navigation이용
import { useRouter } from "next/navigation"




const Search_box=({})=>{
    let [related_serach_list,set_related_serach_list]=useState([]);
    let event_mem=useRef(null)
    let [popup,setpopup]=useState(false)
    const router=useRouter();
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;

    const get_related_data=async(title)=>{
        

        if(title===""){
            set_related_serach_list([]);
            return ;
        }
        let res=await fetch(`${back_end_url}searchlogic/${title}`,{
            method:"GET"
        })
        console.log("에러체크:",res.ok);
    
        if(!res.ok){
            set_related_serach_list([])
        }
        else{
        let data=await res.json();
        
        console.log("연관검색어..?:",data.data);
        set_related_serach_list(data.data)
        }
    }

    const search_event=(event)=>{
        if(event.target.value!==""){
            setpopup(true)
            //console.log("이벤트값:",event.target.value)
            if(event_mem.current!==null){
                //console.log("이벤트취소")
                clearTimeout(event_mem.current);
            }
    
            event_mem.current=setTimeout(()=>{get_related_data(event.target.value)},300)

            console.log(event_mem.current)
        }
        else{

            setpopup(false)
            


        }
      } 

    const search_from_database=async(title)=>{
        let data=await fetch(`${back_end_url}search/${title}`,{
            method:"GET"
        })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            return res.data;
        })
        
        setData(data);
        set_view_main(true);
    }

    const search_from_database2=async(id)=>{
        let data=await fetch(`${back_end_url}search/id/${id}`,{
            method:"GET"
        })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            return res.data;
        })
        
        setData(data);
        set_view_main(true);
    }


    const search_submit=(event)=>{
        event.preventDefault();
        console.log(event.target.children[0].value)
        let strs= event.target.children[0].value
        console.log("strs:",strs);
        //search_from_database(event.target.children[0].value);
        event.target.children[0].value=""
        setpopup(false)
        router.push(`/currentversion/${encodeURIComponent(strs)}`)
        // 나중에 링크 태그와 라우터의 차이를 알아보도로갛자 ㅇㅇ;window.location.assign()    

    }



    const foucus_out_func=()=>{

        setpopup(false)


    }


    const click_search_submit=(event)=>{
        let doc=document.getElementById("search_box");
        doc.value="";
        setpopup(false)

        router.push(`/currentversion/${encodeURIComponent(event.target.textContent)}`)
        //router.push(`/currentversion/${encodeURIComponent(strs)}`)
        //window.location.assign(``)    

       
        

    }
      
    //아래 왜안뜨나햇더니 global.css에서 nav a 즉 nav클래스의 a태그 애들에다가 전부다 마인 60을 주고있어서 안보였던것
    //이거는 양보해서 그냥 div를 클릭이벤트로 넘기도록하자.
return(

    <div className="inline-block">

    <form onSubmit={(event)=>search_submit(event)}>
        <input id="search_box" className="w-[250px] h-[35px] ml-[10px]"onChange={(event)=>search_event(event)} onBlur={()=>foucus_out_func()} placeholder="   여기에서 검색">
        </input>
    </form>   
        { popup && related_serach_list.length>0 ? 
        <div className="absolute w-[250px] h-[200px] border-solid border-slate-200 border-[1px] rounded-3p bg-white ml-[10px] mt-[5px] shadow-xl">
        {
            related_serach_list.map((x,idx)=>
               
                <div key={idx} className="w-full my-[5px] ml-[5px] text-[15px]" onClick={(event)=>click_search_submit(event)}>
                        {x.title}

                </div>
               
            )
        }
        </div>
        
        :null}
        



  </div>

)

}

export default Search_box;


/*{   

    popup.current ?
    <div className="w-[250px] h-[200px] border-solid border-slate-200 border-[1px] rounded-3p bg-white ml-[10px] mt-[5px] shadow-xl"></div>
    :null}



     { popup &&<Search_List data_list={related_serach_list}/>}
        
*/