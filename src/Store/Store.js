import { applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import UserReducer from "./Reducers/AuthReducer";
import { composeWithDevTools } from 'redux-devtools-extension' ;

const store = createStore(UserReducer ,
     composeWithDevTools(applyMiddleware(thunk)) )

export default store