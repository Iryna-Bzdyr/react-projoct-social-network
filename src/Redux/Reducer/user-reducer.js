const follow = 'FOLLOW'
const unFollow = 'UN-FOLLOW'
const setUsers = 'SET-USERS'
const setCurrentPage = 'SET-CURRENT-PAGE'
const setTotalUsersCount = 'SET-TOTAL-USERS-COUNT'
const setPageSize = 'SET-PAGE-SIZE'
const toggleIsFetching ='TOGGLE-IS-FETCHING'
const setCurrentUserId = 'SET-CURRENT-USER-ID'
let initialState = {
    users: [],
    currentUserId:0,
    pageSize: 3,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching:false
}

let userReducer = (state = initialState, action) => {
    switch (action.type) {
        case follow:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case unFollow:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case setUsers:
            return {
                ...state,
                users: [...action.users]
            }
        case setCurrentPage:
            return {...state, currentPage: action.page}
        case setTotalUsersCount:
            return {...state, totalUsersCount: action.totalUsersCount}
        case setPageSize: return  {...state, pageSize:action.pageSize}
        case toggleIsFetching: return  {...state, isFetching:action.isFetching}
        case setCurrentUserId: return  {...state, currentUserId:action.currentUserId}
        default:
            return state
    }
}
export const followAC = (userId) => ({type: follow, userId})
export const unfollowAC = (userId) => ({type: unFollow, userId})
export const setUsersAC = (users) => ({type: setUsers, users})
export const setCurrentPageAC = (currentPage) => ({type: setCurrentPage, page: currentPage})
export const setTotalUsersCountAC = (totalUsers) => ({type: setTotalUsersCount, totalUsersCount: totalUsers})
export const setPageSizeAC = (pageSize) => ({type: setPageSize, pageSize: pageSize})
export const toggleIsFetchingAC = (status) => ({type:toggleIsFetching, isFetching:status})
export const setCurrentUserIdAC = (userID)=>({type:setCurrentUserId, currentUserId:userID})
export default userReducer
