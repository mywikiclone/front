"use client"
import { motion,useAnimationControls } from 'framer-motion';
import { fetching_get_with_no_token } from './fetching';
import { useEffect,useState,useRef } from 'react';
import Link from 'next/link';
import { check_in_db } from './indexdb';

const RealTimeIssue=()=>{
   let [update_last_list,set_update_last_list]=useState([]);
   const doc=useRef(null);
   const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
   const controls=useAnimationControls();
   const timebar=useRef(null);
   const img_src="public/timer.svg"
   const timer_img=useRef(null);

   const [states,set_states]=useState(false);


   const redirect_handler=()=>{

   }
   const get_update_list=async ()=>{
      
      let data=await fetching_get_with_no_token(`${back_end_url}lastchange`,redirect_handler)
      //console.log("패치실행완료:",data.data)
      //console.log("getdata:",data.data);
      if(data.success){
         
         set_update_last_list([...data.data])
         return ;
      }
      set_update_last_list([])

      return ;


   }
   const test=async ()=>{
      let doc=document.getElementById("load_bar")
      let tm=timebar.current.offsetWidth-4;

      
      await get_update_list();
     // console.log("반복?")
      doc.style.transition = 'none'; // 트랜지션을 비활성화
      doc.style.width=`${tm}px`
      // 트랜지션을 설정하고, 애니메이션 상태를 변경합니다.
      doc.offsetHeight;//리플로우를 유발한다!
      doc.style.transition = 'width 30s linear';
      doc.style.width = '0px';
           
      set_states(false)
      
   }
   const test_start=async ()=>{
      let doc=document.getElementById("load_bar")
      await get_update_list();
      
      doc.style.transition = 'width 30s linear';
      doc.style.width = '0px';
           
      
   }
   

   useEffect(()=>{
      //window.addEventListener('resize',test);   
      test_start();

      check_in_db("img_store",8,img_src,timer_img,0)


      /*if(timeoutid.current){
         console.log("state값이 바꾸어서 기존거 취소.")
         clearTimeout(timeoutid.current);}*/
      /*set_times_for_update();
      set_states(true);*/

      /*return () => {
         if (timeoutid.current) {
           clearTimeout(timeoutid.current);
         }
       };*/
   },[])
   useEffect(()=>{
      if(states){
         //console.log("statestrue")
         test();
      }


   },[states])
   const transitionend=(event)=>{

   
      let doc=document.getElementById("load_bar")
      //console.log("값:",doc.style.width,timebar.current.offsetWidth-4);
      set_states(true);
         
  

   }


   return(
    <div ref={timebar} className="w-full border-solid border-[1px] rounded-3p border-slate-300">
      <div
      id="load_bar"

      className="h-[5px] bg-slate-200 w-full"
      onTransitionEnd={()=>{transitionend()}}
      >


      </div>
      <div className="w-full h-fit p-[10px]">
    <div className="w-full h-fit mb-[10px] border-slate-200 ">
      <Link className="w-full h-fit flex justify-between" href={`/changelog`}>
      <div className="w-full h-fit flex">
         <img ref={timer_img} className="w-[32px] h-[32px] mr-[10px]" src="../../../timer.svg"></img>
         <div className="text-[23px]">
            최근변경
         </div>
      </div>
      <img className="w-[30px] h-[30px]" src="../../../arrow_right.svg"></img>
      </Link>
    </div>

    <div classNmae="w-full h-fit">
      {update_last_list.map((x,idx)=>(
         <Link key={idx} href={`/currentversion/${encodeURIComponent(x.title)}`}>
            <div  id={idx} className="w-full h-auto my-[5px] ml-[5px] text-[15px] p-[10px]">

               {x.title}
  

            </div>
            </Link>

      ))}
    </div>
    </div>


    </div>
 )



}
/*

    <motion.div
    id="load_bar"
    ref={doc}
    className="h-[5px] bg-slate-200"
    onAnimationComplete={()=>{transitionend()}}
    initial={{width:"full"}}
    animate={{width:0}}
    transition={{duration:5 ,ease:'linear'}}>
    
   
    </motion.div>


*/

export default RealTimeIssue;