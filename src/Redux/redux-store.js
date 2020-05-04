import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./Reducer/profile-reducer";
import dialogsReducer from "./Reducer/dialogs-reducer";
import sideBarReducer from "./Reducer/sidebar-reducer";
import userReducer from "./Reducer/user-reducer";
import authReducer from "./Reducer/auth-reducer";
import { reducer as formReducer } from 'redux-form'
import thunk from "redux-thunk";

let reducers = combineReducers({
    profilePage:profileReducer,
    messagesPage:dialogsReducer,
    sideBar: sideBarReducer,
    usersPage:userReducer,
    auth:authReducer,
    form: formReducer
})

let store =createStore(reducers, applyMiddleware(thunk))
window.store =store

export default store
