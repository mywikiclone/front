const current_userdata=(state={user_id:""},action)=>{

    switch(action.type){
        case "MainTain":
            return state;
        case "Change_User":
            return  action.userdata


        default:
            return state;
    }







}

export default current_userdata;