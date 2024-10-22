"use client"
import Main_Board from "@/app/components/mainboard"
import { usePathname } from "next/navigation"
import {useEffect} from "react"

import {createStore} from "redux";
import root_reducer from "@/app/reducers/rootreducer";
import { Provider as ReduxProvider } from "react-redux";

//redux로 리팩토링 시도

const Mainboard=()=>{



    const path = usePathname();
    let title=path.split("/")[2]
    console.log("title:",title,decodeURIComponent(title));




    useEffect(()=>{
        console.log("디코딩된거:",decodeURIComponent(title));
   

    },[])




    return (

        
   
        <Main_Board content_title={decodeURIComponent(title)}/>
        
       
    

    )
}


export default Mainboard


/*
        <div>
         {data!==null ?<Main_Board data={data}/> :null}
        </div>*/ 