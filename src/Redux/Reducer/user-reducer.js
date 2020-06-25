import {
    checkFollowerAPI, currentUserAPI,
    followerAPI,
    getUserAvatarAPI,
    getUserFirstNameAPI, getUserLastNameAPI,
    userAPI,
    userAvatar,
    usersAPI
} from "../../firebase";


const setUsers = 'SET-USERS'
const setCurrentPage = 'SET-CURRENT-PAGE'
const setTotalUsersCount = 'SET-TOTAL-USERS-COUNT'
const setPageSize = 'SET-PAGE-SIZE'
const toggleIsFetching = 'TOGGLE-IS-FETCHING'
const setCurrentUserId = 'SET-CURRENT-USER-ID'
const setCurrentUserData = 'SET-CURRENT-USER-DATA'
const setFollowUsers = 'SET-FOLLOW-USERS'
const setFollowerUsersData = 'SET-FOLLOWER-USERS'

let initialState = {
    users: [],
    followerUserData: [],
    currentUserData: [],
    followUsers: [],
    currentUserId: 0,
    pageSize: 3,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
}

let userReducer = (state = initialState, action) => {
    switch (action.type) {
        case setUsers:
            return {
                ...state,
                users: [...action.users]
            }
        case setFollowerUsersData:
            return {
                ...state,
                followerUserData: [...action.followerUserData]
            }
        case setCurrentUserData:
            return {
                ...state,
                currentUserData: [...action.currentUserData]
            }
        case setFollowUsers:
            return {
                ...state,
                followUsers: [...action.followUsers]
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

export const setUsersAC = (users) => ({type: setUsers, users})
export const setFollowerUsersDataAC = (followerUserData) => ({type: setFollowerUsersData, followerUserData})
export const setCurrentPageAC = (currentPage) => ({type: setCurrentPage, page: currentPage})
export const setTotalUsersCountAC = (totalUsers) => ({type: setTotalUsersCount, totalUsersCount: totalUsers})
export const toggleIsFetchingAC = (status) => ({type: toggleIsFetching, isFetching: status})
export const setCurrentUserIdAC = (userID) => ({type: setCurrentUserId, currentUserId: userID})
export const setCurrentUserDataAC = (currentUserData) => ({type: setCurrentUserData, currentUserData: currentUserData})
export const setFollowersAC = (followUsers) => ({type: setFollowUsers, followUsers:followUsers})

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

export const followThunk = (currentID, followUserID) => (dispatch) => {
    followerAPI(currentID, followUserID).set({
        userID: followUserID
    })
    dispatch(getFollowers(currentID))
}

export const unFollowThunk = (currentID, followUserID) => (dispatch) => {
    followerAPI(currentID, followUserID).remove()
    dispatch(getFollowers(currentID))
}

export const getFollowers = (currentID) => (dispatch) => {
    let data = []
    checkFollowerAPI(currentID).on('value', (snap) => {
        snap.forEach(u => {
            data.push(u.val())
        })
        dispatch(setFollowersAC(data))
    })
}

export const checkFollow = (currentID, followUserID) => (dispatch) => {
    let check = 0
    let data = []
    checkFollowerAPI(currentID).orderByChild('userID').equalTo(followUserID).on('value', (snap) => {

        snap.forEach(u => {
            data.push(u.val())
        })
        if(data.length>0){
            check = data[0].userID
        }
        else {
            check = 0
        }
    })
    return check
}


export const getFollowerUsersData = (data)=>(dispatch)=>{
    let userData = []
    data.forEach(u=>{
        currentUserAPI(u.userID).on('value', (snap) => {
            userData.push(snap.exportVal())
        })
    })
    dispatch(setFollowerUsersDataAC(userData))
}






///
export const getUserAvatar = (id) => {
    let avatarUrl = ''
    getUserAvatarAPI(id).on('value', (snap) => {
        avatarUrl = snap.exportVal()
    })
    return avatarUrl
}

export const getUserFirstName = (id) => {
    let firstName = ''
    getUserFirstNameAPI(id).on('value', (snap) => {
        firstName = snap.exportVal()
    })
    return firstName
}
export const getUserLastName = (id) => {
    let lastName = ''
    getUserLastNameAPI(id).on('value', (snap) => {
        lastName = snap.exportVal()
    })
    return lastName
}


export default userReducer
