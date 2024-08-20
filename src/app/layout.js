import { Inter } from "next/font/google";
import './globals.css'
import Providers from "./components/provider";
import RealTimeIssue from "./components/realtimeissuse";
import Search_box from "./components/search_box";
import NavBtn from "./components/navbtns";
import RealTime2 from "./components/severcompoenenttest";

const x=""

const inter = Inter({ subsets: ["latin"] });



const RootLayout=({children})=>{
  console.log("루트레이아웃입니다!")
return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
      <div className="navbar">

        <NavBtn/>
        <div className="inline-block">
        <Search_box />
        </div>
      </div>
      <div className="flex h-screen justify-center items-center">   
        <div className="flex content-center justify-center items-center border-[2px] text-[24px] w-70p h-95p ">
          <div className="w-full h-full  bg-white border-[2px] border-solid border-slate-500  mr-[20px] rounded-1p">
            <div className="w-full h-full">
          
             
            
              {children}
           
             
            </div>
         
          </div>
       
          <div className="flex justify-center items-center flex-col border-[2px] border-solid border-slate-500 bg-white rounded-3p w-30p h-full">
            <RealTime2/>
            <RealTimeIssue/>
          </div>
    
        </div>
 
      </div>
      </Providers>

         </body>
     </html>
   );

  




}

export default RootLayout


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