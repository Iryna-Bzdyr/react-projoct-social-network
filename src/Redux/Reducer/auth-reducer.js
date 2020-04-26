const setUserLogin = 'SET-USER-LOGIN'
const setUserData = 'SET-USER-DATA'

let initialState = {
    login: null,
    password: null,
    userID: null,
    resultCode: null,
    isFetching: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case setUserData:
            return {
                ...state,
                ...action.data
            }
        case setUserLogin:
            return {
                ...state,
                ...action.login
            }
        default:
            return state
    }
}
export  const setUserLoginAC = (userLogin) => ({type: setUserLogin, login: userLogin})
export const setUserDataAC = (userID, login, password) => ({type: setUserData, data: {}})
export default authReducer


