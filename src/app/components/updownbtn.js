
"use client"
const UpDownBtn=()=>{


    const upfunc=()=>{

        window.scrollTo({left:0, top:0, behavior:'smooth'})
        
        
    }
    const downfunc=()=>{

        let down=document.documentElement.scrollHeight;
        console.log("down:",down)
        window.scrollTo({left:0, top:Number(down), behavior:'smooth'})
    }




    return (

        <div className="flex flex-col h-[70px] w-[30px]  justify-between ">
            <button className="h-[30px] w-full border-solid rounded-3p  border-[2px] text-[10px]" onClick={()=>{upfunc()}}>up</button>
            <div className="h-[10px] w-full  "></div>
            <button className="h-[30px] w-full border-solid rounded-3p  border-[2px]  text-[10px]"onClick={()=>{downfunc()}}>down</button>
        </div>
    )
}



export default UpDownBtn