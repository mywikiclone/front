import RealTimeAnother from "./realtime2";
const RealTime2=async ()=>{

//서버컴포넌트는 절대적경로만 필요ㅗ 서버에서 실행되니까
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
        if(data.success){
            
            data=data.data;
            console.log("realtime2:",data);
        }
        else{
            console.log("빈데이터")
            data=[]
        }
        }

        else{

            


            data=[]
            console.log("애도 빈데이터");
        }
      




    
    return(
        <div className=" relative flex  justify-start bg-white w-full h-[35px] border-solid rounded-3p  border-[1px]  ">
        {
             <div className="w-full bg-white">
                    <RealTimeAnother data_from_rsc={data}/>
            </div>
        }
    </div>

    )

    //position을 설정해서 기존요소의 위치를 자식요소가따라가게 설정



}

export default RealTime2