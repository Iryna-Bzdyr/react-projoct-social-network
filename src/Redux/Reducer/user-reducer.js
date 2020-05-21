import  {userAPI, usersAPI} from "../../firebase";

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
    isFetching:false,

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


export const getUsersThunkCreator = (pageSize, currentPage) => (dispath)=>{

    dispath(toggleIsFetchingAC(true))

    usersAPI.on('value', (snap)=> {
        let count = snap.numChildren()
        dispath(setTotalUsersCountAC(count))
        dispath(toggleIsFetchingAC(false))
    });

    usersAPI.orderByKey().startAt(`0`).limitToFirst(pageSize).on('value', (snap) => {
        dispath(setCurrentPageAC(currentPage))
        let users = []
        snap.forEach(u=>{
            users.push(u.val())
        })
        dispath(setUsersAC(users))
    });
}

export const changeUserPage = (index, page, pageSize) => (dispath)=>{
    dispath(toggleIsFetchingAC(true))
    let startPoint = index*pageSize+1
    usersAPI.orderByKey().startAt(`${startPoint}`).limitToFirst(pageSize).on('value', (snap) => {
        let users = []
        snap.forEach(u=>{
            users.push(u.val())
        })
        dispath(setCurrentPageAC(page))
        dispath(setUsersAC(users))
        dispath(toggleIsFetchingAC(false))
    });
}

export const setUserThunk = (id) => (dispath)=>{
    userAPI(id).on('value', (snap) => {
        let user = []
        snap.forEach(u=>{
            user.push(u.val())
        })
        dispath(setUsersAC(user))
        dispath(setCurrentUserIdAC(id))
    });
}


export default userReducer
