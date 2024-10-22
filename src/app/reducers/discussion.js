const current_discussion=(state={topic_id:0,topic_title:"잠시만 기다려주세요",deadline:"",subject_id:0,member_id:"",introudction_text:""},action)=>{
    switch(action.type){
        case "MainTain":
            return state;
        case "Change_Discussion":
            return  action.discussion


        default:
            return state;
    }







}

export default current_discussion