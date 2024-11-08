"use client"
export default function Error({error,reset}){

    return(
        <div className="w-full h-[300px] flex flex-col items-center justify-center">
        
            <p>무언가 잘못되었어요.새로고쳐보는게 어떨까요?</p>
            <button className="w-fit h-fit p-[10px] border-solid border-[1px] border-slate-300" onClick={()=>reset()}>복구</button>

        </div>


    )



}
