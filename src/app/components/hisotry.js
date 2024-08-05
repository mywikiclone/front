"use client"

const History=()=>{







  let data=[{id:1,date:"2024-08-02 15:17:25",text:"1번글"},{id:2,date:"2024-08-02 15:17:00",text:"2번글"}]    
  console.log(data)
    const serach_before_version=(event)=>{
        console.log(data[event.target.parentElement.id-1]);
    }

   const paging_func=()=>{
    //페이징 api이다!
    } 




    return(
      
        <div className="flex h-auto w-full justify-center items-center">
            <div className=" flex flex-col  items-center border-[2px] text-[24px] w-full h-95p">
                <div className="w-90p text-left h-[75px] bg-blue-200 text-[50px]">dhzzzz</div>
                <div className="w-90p flex justify-start">
                    <button className="flex items-center justify-center  border-[2px] rounded-3p border-solid text-[15px] text-center"><img src="../../arrow_left.svg"></img>이전</button>
                    <div className="w-[5px] h-[5px]"></div>
                    <button className="flex items-center justify-center border-[2px] rounded-3p border-solid text-[15px]">다음<img src="../../arrow_right.svg"></img></button>
                </div>
                <div className="w-90p h-auto bg-blue-200 ">
                {
                data.map(x=>(
                        
                       <li key={x.id} id={x.id} className="w-full h-auto text-[15px]">
                            {x.date}
                            <a className="ml-[5px]" href={`http://localhost:3000/beforeversion/${x.id}`}>
                             이전 버전 보기
                            </a>
                       
                        
                       
                       </li>
                    ))



                }
                </div>
                <div className="w-90p flex justify-start">
                    <button className="flex items-center justify-center  border-[2px] rounded-3p border-solid text-[15px] text-center"><img src="../../arrow_left.svg"></img>이전</button>
                    <div className="w-[5px] h-[5px]"></div>
                    <button className="flex items-center justify-center border-[2px] rounded-3p border-solid text-[15px]">다음<img src="../../arrow_right.svg"></img></button>
                </div>
            </div>
        </div>
        
      
    )



}

export default History