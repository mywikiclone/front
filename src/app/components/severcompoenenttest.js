import RealTimeAnother from "./realtime2";





const RealTime2=async (props)=>{

//서버컴포넌트는 절대적경로만 필요ㅗ 서버에서 실행되니까
   
   let data=[]/*(await fetch("https://localhost:8080/realtime",{
            //https://mywikiback.shop/realtime
            method:'GET',
            //
            next:{revalidate:60,dynamic:"auto"},
            headers:{
                'Content-Type':"application/json"
            }
        })
        if(data.ok){
            data=await data.json();
        if(data.success){
            
            data=data.data;
   
        }
        else{
         
            data=[]
        }
        }

        else{

            


            data=[]
           
        }*/


            
      




    
    return(
        <div className="relative flex justify-start bg-white w-full h-[35px] ">
        {
             <div className="w-full bg-white">
                    <RealTimeAnother data_from_rsc={data} props={props}/>
            </div>
        }
    </div>

    )

    //position을 설정해서 기존요소의 위치를 자식요소가따라가게 설정



}

export default RealTime2