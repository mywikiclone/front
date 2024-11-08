"use client"
import { useEffect } from "react";

const Testing=()=>{



    const func=async()=>{


        let data=await fetch("http://ec2-43-203-240-88.ap-northeast-2.compute.amazonaws.com/healthycheck")
        .then((res)=>{
            console.log("proxy:",res);})





    }







    return(

  
            <img src="https://localhost:8080/logout"></img>


       
    )
}


export default Testing