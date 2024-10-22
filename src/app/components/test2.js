const Test2=()=>{




    let test=(event)=>{

        event.target.style.width="5px"

        event.target.style.backgroundColor="red";


    }


    return (
        <button className="w-[20px] h-[20px]" onClick={(e)=>test(e)}>x</button>    
    )
}


export default Test2;