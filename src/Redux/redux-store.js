import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./Reducer/profile-reducer";
import dialogsReducer from "./Reducer/dialogs-reducer";
import sideBarReducer from "./Reducer/sidebar-reducer";
import userReducer from "./Reducer/user-reducer";
import authReducer from "./Reducer/auth-reducer";
import { reducer as formReducer } from 'redux-form'
import thunk from "redux-thunk";
import registrationReducer from "./Reducer/registration-reducer";
import locationReducer from "./Reducer/location-reducer";
import uploadPhotoReducer from "./Reducer/photo-reducer";
import processReducer from "./Reducer/process-reducer";

let reducers = combineReducers({
    profilePage:profileReducer,
    messagesPage:dialogsReducer,
    sideBar: sideBarReducer,
    usersPage:userReducer,
    auth:authReducer,
    registration:registrationReducer,
    location:locationReducer,
    uploadPhotoReducer:uploadPhotoReducer,
    processReducer:processReducer,
    form: formReducer
})

let store =createStore(reducers, applyMiddleware(thunk))
window.store =store

export default store
