import { combineReducers } from "redux";
import current_content from "./change_content";
import login_state from "./login_state";


const root_reducer=combineReducers({
    current_content:current_content,
    login_state:login_state
})


export default root_reducer;