"use client"
import { useEffect } from "react";

const Testing=()=>{



    const func=async()=>{


        let data=await fetch("http://ec2-43-203-240-88.ap-northeast-2.compute.amazonaws.com/healthycheck")
        .then((res)=>{return res.json();})



        console.log("proxy test:",data)

    }

    useEffect(()=>{
            console.log("testing")
            func()


    },[])







    return(

        <div>
            fdsfdf</div>


    )
}


export default Testing