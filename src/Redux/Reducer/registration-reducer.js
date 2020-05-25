import {stopSubmit} from "redux-form";
import {userLogin, usersAPI} from "../../firebase";



const setNewUserData = 'SET-NEW-USER-DATA'

let initialState = {
    newUser: {},

}

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case setNewUserData:
            return {
                ...state,
                newUser: action.newUser,
            }
        default:
            return state
    }
}

const setNewUserDataAC = (newUser) => ({type: setNewUserData, newUser})
export const setNewUserDataThunk = (login, password, firsName, lastName) => (dispatch) => {
    let checkUser = []
    let action = stopSubmit('RegistrationForm', {_error:"User with such login already exit"})

    userLogin.orderByChild('data/login').equalTo(login).on('value', (snap) => {
        snap.forEach(u => {
            checkUser.push(u.val())
        })
        if (!checkUser.length == 0) {
            dispatch(action)
        }
        else {
            let userId = (new Date()).getTime()
            let user = {
                login: login,
                password: password,
                id: userId,
                fullName:{
                    firsName: firsName,
                    lastName: lastName
                },
                location:{
                    country:'',
                    city:''
                }
            }
            dispatch(setNewUserDataAC(user))
            usersAPI.push(user)

    }
    })
}
export default registrationReducer