import Link from "next/link"


export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">   
      <div className="flex content-center justify-center items-center border-[2px] text-[24px] w-70p h-95p ">
        <div className="flex w-full h-full bg-white border-[2px] border-solid border-slate-500 justify-center mr-[20px] rounded-1p">main</div>
        <div className="flex justify-center items-center border-[2px] border-solid border-slate-500 bg-white rounded-3p w-30p h-55p">sub</div>
      </div>
    </div>
  );
}