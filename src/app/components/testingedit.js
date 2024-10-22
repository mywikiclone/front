import { useRef,useState } from "react";


const TestingEdits=()=>{
    let nums=1;
    const target=useRef(null);
    const current_rownum=useRef(0);
    let [texts,set_texts]=useState("");
    let [previous_curosr_pos,set_previous_curosr_pos]=useState(0);
    const showtext=(event)=>{
        console.log(target.current.value);
    }
    const row_nums=useRef(null);
    const inputs=()=>{
        console.log(target.current.value.match(/\n/g));
        const computedStyle = window.getComputedStyle(target.current);
        console.log("height:",computedStyle.lineHeight);
        set_texts(target.current.value)
        set_previous_curosr_pos(target.current.selectionStart);
    }

    const makerownum=(event)=>{
        
        if(event.key==="Enter"){
            console.log("eventstart:",event.target.selectionStart);
            let div=document.createElement("div");
            nums+=1;
            div.className="w-full h-fit text-[15px] flex justify-center"
            div.textContent=`${nums}`;
            row_nums.current.appendChild(div);
            return;
        }
        if(event.key==="Backspace"){
            console.log("backspace")
            const cursorPosition = target.current.selectionStart;

            // 사라질 문자 확인
            if (cursorPosition > 0) {
                const charToDelete = texts[cursorPosition-1];
                if(charToDelete==="\n"){
                    let childs=row_nums.current.children;
                    console.log(childs);
                    row_nums.current.removeChild(childs[childs.length-1]);


                }
            }
           return;
        }

        return;
    }

    return (
        <div className="w-full h-full overflow-y-auto flex">
            <div ref={row_nums} className="h-[500px] w-[30px] border-red-200 border-solid border-[2px] felx flex-col">
                <div className="w-full h-fit text-[15px] flex justify-center">{nums}</div>
            </div>
            <textarea ref={target} className="h-[500px] w-[500px]  resize-none outline-0 text-[15px]" onInput={()=>inputs()}onKeyDown={(event)=>makerownum(event)}>
            
            </textarea>
            <button onClick={()=>showtext()}>show</button>
        </div>
    )
}
export default TestingEdits;