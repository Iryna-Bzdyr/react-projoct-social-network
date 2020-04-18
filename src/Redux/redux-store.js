import {combineReducers, createStore} from "redux";
import profileReducer from "./Reducer/profile-reducer";
import dialogsReducer from "./Reducer/dialogs-reducer";
import sideBarReducer from "./Reducer/sidebar-reducer";
import userReducer from "./Reducer/user-reducer";

let reducers = combineReducers({
    profilePage:profileReducer,
    messagesPage:dialogsReducer,
    sideBar: sideBarReducer,
    usersPage:userReducer
})

let store =createStore(reducers)
window.store =store
console.log(store)
export default store