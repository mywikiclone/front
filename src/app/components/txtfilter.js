
const back_end_url=process.env.NEXT_PUBLIC_BACK_END_URL;

export const txtfilter=(text)=>{

    if(text.match(/[<|>]/g)!=null){
        text=text.replace(/[<|>]/g,(match)=>{


        if (match === "<") {
                 return "&lt;";
            }
        return "&gt;";
        })

        return text;

    }
    else{

        return text;
    }



}

export const video_filtering=(text)=>{
        if(text.startsWith("https://www.youtube.com/embed/")){

            return text;

        }


        return "";



}


export const img_src_filtering=(text)=>{

   
    if(text.startsWith(`${back_end_url}applyimg/`)){


        return text;
    }



    return "";


}