import {combineReducers, createStore} from "redux";
import profileReducer from "./Reducer/profile-reducer";
import dialogsReducer from "./Reducer/dialogs-reducer";
import sideBarReducer from "./Reducer/sidebar-reducer";

let reducers = combineReducers({
    profilePage:profileReducer,
    messagesPage:dialogsReducer,
    sideBar: sideBarReducer
})

let store =createStore(reducers)
console.log(store)
export default store