import Link from "next/link"
import RealTime from "./components/realtime";
import Main_Board from "./components/mainboard";
import RootLayout from "./layout";
export default function Home() {
  return (
      
    <div>
   
      <Main_Board/>
      
      
    </div>
    
  );
}

/*
    <div className="flex h-screen justify-center items-center">   
      <div className="flex content-center justify-center items-center border-[2px] text-[24px] w-70p h-95p ">
        <div className="flex w-full h-full bg-white border-[2px] border-solid border-slate-500 justify-center mr-[20px] rounded-1p"></div>
        <div className="flex justify-center items-center  border-[2px] border-solid border-slate-500 bg-white rounded-3p w-30p h-full">
       
        <RealTime/>
        
        </div>
       
      </div>
    </div>


*/