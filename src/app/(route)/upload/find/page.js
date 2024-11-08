"use client"

import { useRef } from "react"

const FindFiles=()=>{

    const file_find=useRef(null)
    const img_to_show=useRef(null);
    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
    const createfile=()=>{
        img_to_show.current.src=`${back_end_url}applyimg/${file_find.current.value}`;

    }
    
    return (
        <div className="lg:w-90p w-full h-fit flex flex-col items-center">
            

            <div className="w-fit h-fit flex mt-[10px] mb-[10px] flex items-center">
                <input className="w-[200px] h-[30px] text-[15px] outline-none h-fit border-solid border-[1px] border-slate-300 mr-[10px]"ref={file_find} type="text" name="query" autoComplete="false" placeholder="찾고자하는 자료명을 입력하세요"></input>
                <button className="w-fit p-[5px] h-fit border-solid border-[1px] border-slate-300 text-[15px]" onClick={()=>{createfile()}}>검색</button>
            </div>
            <div className="w-fit h-fit">



                <img ref={img_to_show} src={`${back_end_url}applyimg/basic`}  className="w-[200px] h-[200px]"></img>

            </div>






        </div>
    )


}

export default FindFiles;