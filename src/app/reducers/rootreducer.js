import { combineReducers } from "redux";
import current_content from "./change_content";
import current_discussion from "./discussion";
import current_search_box from "./searchbox_data";
import current_userdata from "./userdata";
import { current_redirect_path } from "./redirect_path";


const root_reducer=combineReducers({
    current_content:current_content,
    current_discussion:current_discussion,
    current_search_box:current_search_box,
    current_userdata:current_userdata,
    current_redirect_path:current_redirect_path
})


export default root_reducer;