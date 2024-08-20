import RealTimeAnother from "./realtime2";
const RealTime2=async ()=>{


    const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL
    let data=await fetch(`${back_end_url}realtime`,{
            method:'GET',
            next:{revalidate:60,dynamic:"auto"},
            headers:{
                'Content-Type':"application/json"
            }
        })
        if(data.ok){
            data=await data.json();
            data=data.data;
            console.log("realtime2:",data);
        }
        else{
            data=[]
            console.log("realtime2:",data);
        }




    
    return(
        <div className=" relative flex  justify-start bg-slate-200 w-full h-[35px] border-solid rounded-3p  border-[2px]  ">
        {
             <div className="w-full h-[200px] bg-white 
            border-solid border-[1px] border-solid border-black rounded-3p z-50">
                    <RealTimeAnother data_from_rsc={data}/>
            </div>
        }
    </div>

    )

    //position을 설정해서 기존요소의 위치를 자식요소가따라가게 설정



}

export default RealTime2