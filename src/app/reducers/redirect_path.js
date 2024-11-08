export const current_redirect_path=(state={path:null},action)=>{


    switch(action.type){


        case "Redirect":
            return {...state,path:action.path};

        case "Init":
            return {...state,path:null};

        default:
            return state;
    }



}


export const set_redirect_path=(text)=>{
    
    return {
        type:"Redirect",
        path:text
    }

};


export const clear_redirect_path=()=>{

    return {
        type:"Init",
        path:null
    }
}