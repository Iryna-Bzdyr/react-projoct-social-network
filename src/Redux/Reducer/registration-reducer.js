import {stopSubmit} from "redux-form";
import {userLoginAPI, userDataBase, loginDataBase, profileDataBase} from "../../firebase";


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
                avatar: {
                    id: 'AV' + userId,
                    likes: 0,
                    url: 'https://firebasestorage.googleapis.com/v0/b/react-social-network-a5dc0.appspot.com/o/photo%2F1014-512.png?alt=media&token=566a73ee-6ba4-4b80-9a6f-3bf52f08eed0',
                    default:true
                },
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