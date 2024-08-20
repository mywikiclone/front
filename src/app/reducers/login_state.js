const   login_state=(state=false,action)=>{
    switch(action.type){
        case "Login":
            return true;
        case "LogOut":
            return  false;


        default:
            return state;
    }







}

export default login_state;