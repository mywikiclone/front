const Testing=()=>{



    const func=async()=>{


        let data=await fetch("http://http://ec2-43-203-240-88.ap-northeast-2.compute.amazonaws.com/healthycheck",{

            "method":GET
        });


        console.log("proxy test:",data)

    }

    useEffect(()=>{
            func()


    },[])







    return(

        <div>
            fdsfdf</div>


    )
}


export default Testing