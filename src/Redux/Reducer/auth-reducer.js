import {usersAPI, userLoginAPI} from "../../firebase";
import {reset, stopSubmit} from 'redux-form';

const setResultCode = 'SET-RESULT-CODE'
const setUserID = 'SET-USER-ID'
const setCurrentUser = 'SET-CURRENT-USER'

let initialState = {
    login: null,
    password: null,
    userID: null,
    currentUser: [],
    resultCode: null,
    isFetching: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case setCurrentUser:
            return {
                ...state,
                currentUser: [...action.currentUser]
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

export const setCurrentUserAC = (currentUser) => ({type: setCurrentUser, currentUser: currentUser})
export const setResultCodeAC = (resultCode) => ({type: setResultCode, resultCode: resultCode})
export const setUserIDAC = (userID) => ({type: setUserID, userID: userID})

export const checkLogin = (login, password, formName) => (dispatch) => {
    let user = []
    let action = stopSubmit('LoginForm', {_error:"Incorrect login or password"})
    userLoginAPI.orderByChild('/login').equalTo(login).on('value', (snap) => {
        snap.forEach(u => {
            user.push(u.val())
        })

        if (user.length == 0) {
            dispatch(setResultCodeAC(0))
            dispatch(action)
        } else if (user[0].password == password) {
            dispatch(setUserIDAC(user[0].id))
            usersAPI.orderByChild('id').equalTo(user[0].id).on('value', (snap) => {
                let user = []
                snap.forEach(u => {
                    user.push(u.val())
                })
                dispatch(setCurrentUserAC(user))
                dispatch(setResultCodeAC(1))
                dispatch(reset(formName));
            });
        } else {
            dispatch(setResultCodeAC(0))
            dispatch(action)
        }

    })
}

export default authReducer


