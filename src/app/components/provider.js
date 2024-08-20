"use client"

import root_reducer from "../reducers/rootreducer";
import {createStore} from "redux";
import { Provider as ReduxProvider } from "react-redux";


const store=createStore(root_reducer);



const Providers=({children})=>{



    return(
        <ReduxProvider store={store}>
            {children}

        </ReduxProvider>
    )
}


export default Providers;