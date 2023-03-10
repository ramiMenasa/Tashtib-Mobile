import { applyMiddleware } from "redux";
import {createStore} from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import Combine from "./Reducers/Combine";

const store = createStore(Combine, 
    composeWithDevTools(applyMiddleware(thunk)))

export default store;