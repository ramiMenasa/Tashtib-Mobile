import { combineReducers } from "redux";
import UserReducer from "./AuthReducer";
import CollReducer from "./CollReducer";


export default combineReducers({

    user: UserReducer,
    coll: CollReducer

});
