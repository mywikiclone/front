const current_search_box=(state={popup:false,related_data_list:[],input_box:"",active_window:false},action)=>{
 
    switch(action.type){
        case "MainTain":
            return state;
        case "Change_Search_Box":
            return  action.search_box


        default:
            return state;
    }







}

export default current_search_box;