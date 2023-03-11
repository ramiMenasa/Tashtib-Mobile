import { applyMiddleware } from "redux";
import {createStore} from "redux"
import thunk from "redux-thunk";
import Combine from "./Reducers/Combine";

const store = createStore(Combine, applyMiddleware(thunk))

export default store;