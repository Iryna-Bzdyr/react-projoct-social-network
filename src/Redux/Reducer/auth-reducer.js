import {usersAPI, userLogin} from "../../firebase";


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

export const checkLogin = (login, password) => (dispath) => {
    let user = []
    userLogin.orderByChild('data/login').equalTo(login).on('value', (snap) => {
        snap.forEach(u => {
            user.push(u.val())
        })

        if (user.length == 0) {
            dispath(setResultCodeAC(0))
        } else if (user[0].data.password == password) {
            dispath(setUserIDAC(user[0].data.userID))

            usersAPI.orderByChild('id').equalTo(user[0].data.userID).on('value', (snap) => {
                let user = []
                snap.forEach(u => {
                    user.push(u.val())
                })
                dispath(setCurrentUserAC(user))
                dispath(setResultCodeAC(1))
            });
        } else {
            dispath(setResultCodeAC(0))
        }
    })
}

export default authReducer


