import {stopSubmit} from "redux-form";
import {userLoginAPI, usersAPI, profileAPI, userDataBase, loginDataBase, profileDataBase} from "../../firebase";


const checkRegistration = 'CHECK-REGISTRATION'

let initialState = {
    correctRegistration: false,

}

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case checkRegistration:
            return {
                ...state,
                correctRegistration: action.correctRegistration,
            }
        default:
            return state
    }
}

export const checkRegistrationAC = (correctRegistration) => ({
    type: checkRegistration,
    correctRegistration: correctRegistration
})
export const setNewUserDataThunk = (login, password, firstName, lastName, country, city) => (dispatch) => {
    let checkUser = []
    let action = stopSubmit('RegistrationForm', {_error: "User with such login already exit"})

    userLoginAPI.orderByChild('data/login').equalTo(login).on('value', (snap) => {
        snap.forEach(u => {
            checkUser.push(u.val())
        })
        if (!checkUser.length == 0) {
            dispatch(action)
        } else {
            let userId = (new Date()).getTime()
            // let user = {
            //     id: userId,
            //     fullName: {
            //         firstName: firstName,
            //         lastName: lastName
            //     },
            //     location: {
            //         country: country,
            //         city: city
            //     }
            // }
            // usersAPI.push(user)

            userDataBase(userId).set({
                id: userId,
                fullName: {
                    firstName: firstName,
                    lastName: lastName
                },
                location: {
                    country: country,
                    city: city
                }
            })
            loginDataBase(userId).set({
                id: userId,
                login: login,
                password: password,
            })

            // let userLoginData = {
            //     data: {
            //         login: login,
            //         password: password,
            //         userID: userId
            //     }
            // }
            // userLoginAPI.push(userLoginData)
            profileDataBase(userId).set({
                id: userId,
            })
            // let profileData = {
            //     userID: userId
            // }
            // profileAPI.push(profileData)
            dispatch(checkRegistrationAC(true))
        }
    })
}
export default registrationReducer