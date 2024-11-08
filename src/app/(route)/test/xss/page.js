"use client"
const Xss=()=>{

    const testxss=()=>{
        let test=document.getElementById("test")
        let ints=document.getElementById("ints");
        console.log(ints.value);
        test.innerHTML=ints.value;
    }


    return(
        <div>
              <input id="ints"></input><button className="w-[30px] h-[30px]"onClick={()=>testxss()}>x</button>  
              <div id="test">

              </div>
        </div>
    )
}


export default Xss;