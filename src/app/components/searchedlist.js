"use client"

const Search_List=({data_list})=>{

  
    console.log("data_list:",data_list);
return(
    <div className="w-[250px] h-[200px] border-solid border-slate-200 border-[1px] rounded-3p bg-white ml-[10px] mt-[5px] shadow-xl">
        {
            data_list.map((x,idx)=>{
                <div key={idx} className='w-full h-[20px]'>
                
                    {x.title}
                </div>
            })
        }
    </div>
)


}

export default Search_List;