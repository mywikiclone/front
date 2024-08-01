"use client"
import { useEffect } from "react"

const testing=()=>{
    
    console.log("testing")
}

const Test=()=>{
 const change_img=(event)=>{
    let x=document.getElementById("testing");
    x.innerHTML=`<img src="../../../arrow_right.svg"> </img>`
    if(event.target.tagName==="A"){
        return ;
    }

    let child_node=event.target.children
    console.log(child_node,event.target.parentElement)
   
    if(child_node[0].src==="http://localhost:3000/arrow_down.svg"){
        child_node[0].src="../../../arrow_right.svg"
       
        event.target.parentElement.children[1].style.display="none"
        return ;
    }

    child_node[0].src="../../../arrow_down.svg"
     event.target.parentElement.children[1].style.display="block"
        return ;
 }
 useEffect(()=>{
    let doc=document.getElementById("test")

    doc.innerHTML=`
    <div class="big_area w-full h-auto bg-white">
        <div class="w-full h-auto bg-white">
            <ul class="w-full h-[50px] border-b-2 border-solid border-gray-300">
                <img  src="../../../arrow_down.svg" class="pointer-events-none" ></img>
		        <a href="https://namu.wiki/w/NGC%205694" target="_blank">??</a>ul
	        </ul>
        
	        <div class="w-full h-auto bg-white"> 
		        ul<br/>
	        </div>
        </div>
    </div>
    </br>
    <div class="big_area w-full h-auto bg-white">
	    <div class="w-full h-auto bg-white">
		    <ul class="w-full h-[50px] border-b-2 border-solid border-gray-300">
			    <img  src="../../../arrow_down.svg" class="pointer-events-none" ></img>
			    <a href="https://namu.wiki/w/NGC%205694" target="_blank">??</a>ul1
		    </ul>
	        <div class="w-full h-auto bg-white">
		         ul1<br/>
	        </div>
        </div>
    </div>`
 }

 ,[])

 return(

    <div id="test" className="w-full h-screen ">


    </div>
 )

}


export default Test


/*
        <div className="w-full h-auto bg-white">
            <ul className="w-full h-[50px] border-b-2 border-solid border-gray-300" onClick={(event)=>change_img(event)}>
                <img  src="../../../arrow_down.svg" className="pointer-events-none" ></img>
                <a href="https://namu.wiki/w/NGC%205694" target="_blank">??</a>
            </ul>
            <div className="w-full h-auto bg-white">
                    zzzzzzzzzzzzzzzzzzz
            </div>

        </div>
        <div className="w-full h-auto bg-blue-200">
                                zxcxzcxzxcxzcxzczxczxczxczxc
        </div>



        <div id="testing" className="w-full h-[500px] bg-blue-200">

        </div>*/