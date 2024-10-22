const current_content=(state={content_id:0,title:"잠시만 기다려주세요",content:"로딩중입니다",update_time:"없음",email:""},action)=>{

    switch(action.type){
        case "MainTain":
            return state;
        case "Change_Content":
            return  action.content


        default:
            return state;
    }







}

export default current_content;