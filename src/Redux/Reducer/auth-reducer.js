import {userLogin} from "../../firebase";


const setUserPassword = 'SET-USER-PASSWORD'
const setResultCode = 'SET-RESULT-CODE'
const setUserID = 'SET-USER-ID'

let initialState = {
    login: null,
    password: null,
    userID: null,
    resultCode: null,
    isFetching: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case setUserPassword:
            return {
                ...state,
                ...action.password
            }
        case setResultCode:
            return {
                ...state,
                ...action.resultCode
            }
        case setUserID:
            return {
                ...state,
                ...action.userID
            }
        default:
            return state
    }
}

export const setUserPasswordAC = (password) => ({type: setUserPassword, login: password})
export const setResultCodeAC = (resultCode) => ({type: setResultCode, resultCode})
export const setUserIDAC = (userID) => ({type: setUserID, userID})

export const checkLogin = (login, password) => (dispath) => {
    let user = []
    userLogin.orderByChild('data/login').equalTo(login).on('value', (snap) => {
        snap.forEach(u => {
            user.push(u.val())
        })
        if (user.length==0){
            dispath(setResultCodeAC(0))
        }
        else if ( dispath(setUserPasswordAC(user[0].data.password==password))){
            dispath(setResultCodeAC(1))
            dispath(setUserIDAC(user[0].data.userID))
        }
        else{
            dispath(setResultCodeAC(0))
        }
    })
    console.log(user)

}

export default authReducer


