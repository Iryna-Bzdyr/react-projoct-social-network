import { userAPI, usersAPI} from "../../firebase";

const follow = 'FOLLOW'
const unFollow = 'UN-FOLLOW'
const setUsers = 'SET-USERS'
const setCurrentPage = 'SET-CURRENT-PAGE'
const setTotalUsersCount = 'SET-TOTAL-USERS-COUNT'
const setPageSize = 'SET-PAGE-SIZE'
const toggleIsFetching = 'TOGGLE-IS-FETCHING'
const setCurrentUserId = 'SET-CURRENT-USER-ID'
const setCurrentUserData = 'SET-CURRENT-USER-DATA'

let initialState = {
    users: [],
    currentUserData: [],
    currentUserId: 0,
    pageSize: 3,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
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
        case setCurrentUserData:
            return {
                ...state,
                currentUserData: [...action.currentUserData]
            }
        case setCurrentPage:
            return {...state, currentPage: action.page}
        case setTotalUsersCount:
            return {...state, totalUsersCount: action.totalUsersCount}
        case setPageSize:
            return {...state, pageSize: action.pageSize}
        case toggleIsFetching:
            return {...state, isFetching: action.isFetching}
        case setCurrentUserId:
            return {...state, currentUserId: action.currentUserId}
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
export const toggleIsFetchingAC = (status) => ({type: toggleIsFetching, isFetching: status})
export const setCurrentUserIdAC = (userID) => ({type: setCurrentUserId, currentUserId: userID})
export const setCurrentUserDataAC = (currentUserData) => ({type: setCurrentUserData, currentUserData: currentUserData})

export const setCurrentUserMainData = (id) => (dispath) => {
    userAPI(`${id}`).on('value', (snap) => {
        let data = []
        snap.forEach(u => {
            data.push(u.val())
        })
        dispath(setCurrentUserDataAC(data))
    })
}


export const setTotalUserCount = () => (dispatch) => {
    usersAPI.on('value', (snap) => {
        let count = snap.numChildren()
        dispatch(setTotalUsersCountAC(count))

    });
}

export const getUsersThunkCreator = (pageSize, currentPage) => (dispatch) => {
    dispatch(toggleIsFetchingAC(true))

    usersAPI.orderByKey().startAt(`0`).limitToFirst(pageSize).on('value', (snap) => {
        dispatch(setCurrentPageAC(currentPage))
        let users = []
        snap.forEach(u => {
            users.push(u.val())
        })
        dispatch(setUsersAC(users))
        if (users.length > 0) {
            dispatch(toggleIsFetchingAC(false))
        }
    });
}

export const changeUserPage = (page, pageSize) => (dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    let startPoint = null
    if (page == 1) {
        startPoint = 0
    } else (startPoint = (page - 1) * pageSize)
    let limit = page * pageSize

    usersAPI.orderByKey().limitToFirst(limit).on('value', (snap) => {
        let users = []
        snap.forEach((u) => {
            users.push(u.val())
        })
        let newUsers = []
        users.forEach((u, index) => {
            if (index >= startPoint) {
                newUsers.push(u)
            }
        })
        dispatch(setUsersAC(newUsers))
        if (users.length > 0) {
            dispatch(toggleIsFetchingAC(false))
        }
    });
}

export const setUserThunk = (id) => (dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    let user = []
    userAPI(id).on('value', (snap) => {
        snap.forEach(u => {
            user.push(u.val())
        })
        dispatch(setUsersAC(user))
        dispatch(setCurrentUserIdAC(id))

    });

    setTimeout((dispatch(toggleIsFetchingAC(false))), 2000)
}

export const setCurrentUserThunk = (id) => (dispatch) => {
    userAPI(id).on('value', (snap) => {
        let user = []
        snap.forEach(u => {
            user.push(u.val())
        })
        dispatch(setUsersAC(user))
    });
}

export default userReducer
