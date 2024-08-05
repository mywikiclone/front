

const Search_before_version=({id})=>{
    const ids=id;
    
    //fetch 문으로 글 내용을 가져오는 과정-->추후에작성.
    const revert_text=(event)=>{

        console.log(event.target.parentElement.parentElement.children[1].value)

    }


    return(
        <div className="flex h-screen justify-center items-center">
            <div className=" flex flex-col  items-center border-[2px] text-[24px] w-full h-95p">
                <div className="w-90p text-left h-[75px] bg-blue-200 text-[50px]">dhzzzz</div>
                <textarea  disabled className="w-90p text-left h-70p bg-slate-200 overflow-auto text-[20px]"
                value=" zxcxcxxcxc">
                                           
                </textarea>
                <div className="flex w-90p  h-auto justify-end">
                    <button className="border-solid border-[2px] border-salte-200 bg-blue-200"
                    onClick={(event)=>revert_text(event)}>
                        되돌리기
                    </button>
                </div>
            </div>
        </div>
    )




}



export default Search_before_version