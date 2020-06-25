import {userLoginAPI} from "../../firebase";
import {reset, stopSubmit} from 'redux-form';
import {getFollowers, setCurrentUserIdAC, setCurrentUserMainData} from "./user-reducer";
import {setCurrentUserProfileData} from "./profile-reducer";

const setResultCode = 'SET-RESULT-CODE'
const setUserID = 'SET-USER-ID'
const setCurrentLoginData = 'SET-CURRENT-USER'

let initialState = {
    currentUserLoginData: '',
    resultCode: null,
    isFetching: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case setCurrentLoginData:
            return {
                ...state,
                currentUserLoginData: action.currentUserLoginData
            }
        case setResultCode:
            return {
                ...state,
                resultCode: action.resultCode
            }
        case setUserID:
            return {
                ...state,
                userID: action.userID
            }
        default:
            return state
    }
}

export const setCurrentUserLoginDataAC = (currentUserLoginData) => ({
    type: setCurrentLoginData,
    currentUserLoginData: currentUserLoginData
})
export const setResultCodeAC = (resultCode) => ({type: setResultCode, resultCode: resultCode})


export const setLoginData =(login)=>(dispatch) =>{
    userLoginAPI.orderByChild('/login').equalTo(login).on('value', (snap) => {
        snap.forEach(u=>(
            dispatch(setCurrentUserLoginDataAC(u.val()))
        ))
    })
}

export const checkLogin = (login, password, formName, currentUserLoginData) => (dispatch) => {
    let action = stopSubmit('LoginForm', {_error: "Incorrect login or password"})
if(!currentUserLoginData){
    dispatch(setResultCodeAC(0))
    dispatch(action)
}
else if (currentUserLoginData.password == password){
    dispatch(setCurrentUserIdAC(currentUserLoginData.id))
    dispatch(setCurrentUserMainData(currentUserLoginData.id))
    dispatch(setCurrentUserProfileData(currentUserLoginData.id))
    dispatch(getFollowers(currentUserLoginData.id))
    dispatch(setResultCodeAC(1))
    dispatch(reset(formName))
}
else {
    dispatch(setResultCodeAC(0))
    dispatch(action)
}
}


export default authReducer


