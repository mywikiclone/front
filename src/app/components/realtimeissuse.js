"use client"
import { motion,useAnimationControls } from 'framer-motion';
import { fetching_get_with_no_token } from './fetching';
import { useEffect,useState,useRef } from 'react';
const RealTimeIssue=()=>{
   let [update_last_list,set_update_last_list]=useState([]);
   const doc=useRef(null);
   const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;
   const controls=useAnimationControls();
   const timebar=useRef(null);
   


   const [states,set_states]=useState(false);

   const get_update_list=async ()=>{
      
     /* let data=await fetching_get_with_no_token(`${back_end_url}lastchange`)
      //console.log("패치실행완료:",data.data)
      //console.log("getdata:",data.data);
      if(data.success){
         
         set_update_last_list([...data.data])
         return ;
      }*/
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
      console.log("시작")
      doc.style.transition = 'width 30s linear';
      doc.style.width = '0px';
           
      
   }
   

   useEffect(()=>{
      //window.addEventListener('resize',test);   
      test_start();
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
    <div ref={timebar} className="w-full border-solid border-[2px]   rounded-3p border-white">
      <div
      id="load_bar"

      className="h-[5px] bg-slate-200 w-full"
      onTransitionEnd={()=>{transitionend()}}
      >


      </div>



    <div classNmae="flex flex-col justify-center">
      {update_last_list.map((x,idx)=>(

         <div key={idx}>
            {x.title}
            </div>


      ))}
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