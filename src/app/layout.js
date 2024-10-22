import { Inter } from "next/font/google";
import './globals.css'
import Providers from "./components/provider";
import RealTimeIssue from "./components/realtimeissuse";
import Search_box from "./components/search_box";
import NavBtn from "./components/navbtns";
import RealTime2 from "./components/severcompoenenttest";
import updownbtn from "./components/updownbtn";
import Updownbtn from "./components/updownbtn";
import LoginNav from "./components/LoginNav";
const x=""

const inter = Inter({ subsets: ["latin"] });


//d아래처럼 감싸도 같은 store를 공유하며 redux상태값이 업데이트될떄리랜더링되는 애들은
//useselector로 해당값을 참조하는 애들만 해당된다 ㅇㅇ
const RootLayout=({children})=>{
  console.log("루트레이아웃입니다!")
return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
      <div className="bg-teal-400 flex flex  relative justify-center  lg:h-[55px] h-[79px] lg:p-[5px] p-0 items-center  font-black">
      
        <div className="flex lg:w-70p w-full justify-between  lg:items-center items-start lg:flex-row flex-col">
          <div className="lg:my-0 my-[10px]"> 
          <NavBtn/>
          </div>

          <div className="lg:w-[305px] w-full">
                 <Search_box/>
                 
          </div> 

        </div>
      
        
      </div>
      <div className="flex h-screen justify-center lg:items-center items-start">   
        <div className="flex  justify-center items-start border-[2px] text-[24px] h-95p lg:w-70p w-full ">
          <div className="w-full   bg-white border-[2px] border-solid border-slate-500  rounded-1p lg:mr-[20px] mr-0">


        

            <div className="w-full flex  lg: flex flex-col items-center ">
          
            
           
              {children}


              
        
             
            </div>
         
          </div>
       
          <div className="lg:static absolute flex flex-col border-[2px] border-0   border-solid border-none border-slate-500  rounded-3p w-30p w-0 h-full lg:visible invisible ">
            <div className="flex w-full flex-col h-[300px] border-[2px] border-solid border-blue-300">
              <div className="w-full mb-[20px]">
              <RealTime2/>
              </div>
              <div className="w-full">
                
              </div>


            </div>
      
          </div>

   
        <div className=" fixed bottom-[50px] lg:right-[300px] right-0 w-[40px]">
            <Updownbtn/>
          </div>  
      </div>
      </div>
      </Providers>

         </body>
     </html>
   );

  




}

export default RootLayout
//<Search_box />
//<RealTimeIssue/>
/*
          <div className="lg:block hidden">
          <Search_box/>
        
          </div> 






    <div className="  w-full border-[1px] border-sollid border-black rounded-1p lg:hidden block">
            <Search_box/>
          </div>*/ 
/*


*/ 



// <input className="search" placeholder="   여기에서 검색"></input>



//bg-green-500 justify-between relative p-[5px] pl-[300px] font-black
//justifty-center rounded-10p border-green-500 bg-white w-[45px] h-[45px] ml-[450px]
//

/*
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar">
        <Link href="/">나무위키</Link>
        <Link href="/pages/changed">최근변경</Link>
        <Link href="/pages/arg">최근토론</Link>
        <a>특수기능</a>
        { <ul className="hide">
          <ui>q</ui>
          <ui>q</ui>
          <ui>q</ui>
          <ui>q</ui>
        </ul>
         
         <button className="randomBtn">⟳</button>
         <input className="search" placeholder="   여기에서 검색"></input>
         </div>
 
         {children}</body>
     </html>



*/ 

/*
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="navbar">
    <Link href="/">나무위키</Link>
    <Link href="/pages/changed">최근변경</Link>
    <Link href="/pages/arg">최근토론</Link>
    <a>특수기능</a>
    { <ul className="hide">
      <ui>q</ui>
      <ui>q</ui>
      <ui>q</ui>
      <ui>q</ui>
    </ul>
     }
     <button className="randomBtn">⟳</button>
     <input className="search" placeholder="   여기에서 검색"></input>
     </div>
 
   <div className="flex h-screen justify-center items-center">   
     <div className="flex content-center justify-center items-center border-[2px] text-[24px] w-70p h-95p ">
       <div className="flex w-full h-full bg-white border-[2px] border-solid border-slate-500 justify-center mr-[20px] rounded-1p">
       {children}
       </div>
       <div className="flex justify-center items-center  border-[2px] border-solid border-slate-500 bg-white rounded-3p w-30p h-full">
         <RealTime/>
       </div>
    
     </div>
   </div>
         </body>
     </html>
   );
 } */