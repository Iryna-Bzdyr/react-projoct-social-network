const setUsersNav = 'SET-USERS-NAV'

let initialState = {
    users: [],
    pageSize: 8,
    totalUsersCount: 0,
    currentPage: 1
}


let sideBarReducer = (state = initialState, action) => {
    switch (action.type) {

        case setUsersNav:
            return {
                ...state,
                users: [...action.users]
            }

        default:
            return state
    }
}

export const setUserNavsAC = (users) => ({type: setUsersNav, users})

export default sideBarReducer
