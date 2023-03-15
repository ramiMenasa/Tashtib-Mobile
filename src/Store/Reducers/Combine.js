import { combineReducers } from "redux";
import UserReducer from "./AuthReducer";
import CartReducer from "./CartReducer";
import CollReducer from "./CollReducer";


export default combineReducers({

    user: UserReducer,
    coll: CollReducer,
    cart: CartReducer

});
