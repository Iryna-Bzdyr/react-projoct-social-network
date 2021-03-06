import database, {
    currentUserAPI,
    userAPI,
    currentUserPhotoAPI,
    profilePhotoBase,
    userAvatar,
    storage,
    userProfileAPI,
    profilePhotoBaseLike,
    checkUserPhotoLike,
    usersAPI,
    profilePostBase,
    currentUserPostAPI,
    profilePostBaseLike,
    checkUserPostLike,
    profilePostCommentBase,
    profileAPI,
    profileCurrentPostComment, profilePostCommentBaseLike, checkUserPostCommentLike,
} from "../../firebase";
import {setFileRefAC, setOpenModalAC, setUpLoadFileAC} from "./photo-reducer";
import {setDeleteModalAC} from "./process-reducer";


const upDateNewPostText = 'UPDATE-NEW-POST-TEXT';
const setProfileData = 'SET-PROFILE-DATA'
const setPostData = 'SET-POST-DATA'
const setFollowerPostData = 'SET-FOLLOWER-POST-DATA'
const setPhotoData = 'SET-PHOTO-DATA'
const setActivityData = 'SET-ACTIVITY-DATA'
const sliderIsOpen = 'SLIDER-IS-OPEN'
const setUserStatus = 'SET-USER-STATUS'
const setNewPostComment = 'NEW-POST-COMMENT';
const setPostCommentData = 'SET-POST-COMMENT-DATA'
let initialState = {
    profileData: [],
    postData: [],
    postCommentData: [],
    photoData: [],
    photoLikeUsers: [],
    activityData: [],
    followerPostData: [],
    searchBar: [
        {id: 1, name: 'Activity'},
        {id: 2, name: 'MyPost'},
        {id: 3, name: 'Friends'},
        {id: 4, name: 'Groups'},
        {id: 5, name: 'Photo'},
    ],
    newPostText: '',
    sliderIsOpen: false,
    sliderAutoplay: false,
    userStatus: "",
    newPostComment: ""
}


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case setProfileData:
            return {
                ...state,
                profileData: [...action.profileData]
            }
        case setPostData: {
            return {
                ...state,
                postData: [...action.postData]
            }
        }
        case setFollowerPostData: {
            return {
                ...state,
                followerPostData: [...action.followerPostData]
            }
        }
        case setPhotoData: {
            return {
                ...state,
                photoData: [...action.photoData]
            }
        }
        case setActivityData: {
            return {
                ...state,
                activityData: [...action.activityData]
            }
        }

        case upDateNewPostText:
            return {
                ...state,
                newPostText: action.newText
            }
        case sliderIsOpen:
            return {
                ...state,
                sliderIsOpen: action.sliderIsOpen
            }
        case setUserStatus:
            return {
                ...state,
                userStatus: action.userStatus
            }
        case setNewPostComment:
            return {
                ...state,
                newPostComment: action.newPostComment
            }
        case setPostCommentData:
            return {
                ...state,
                postCommentData: [...action.postCommentData]
            }
        default:
            return state
    }
}

export const setProfileDataAC = (profileData) => ({type: setProfileData, profileData: profileData})
export const setPostDataAC = (postData) => ({type: setPostData, postData: postData})
export const setFollowerPostDataAC = (followerPostData) => ({
    type: setFollowerPostData,
    followerPostData: followerPostData
})
export const setPhotoDataAC = (photoData) => ({type: setPhotoData, photoData: photoData})
export const setActivityDataAC = (activityData) => ({type: setActivityData, activityData: activityData})
export const upDateNewPostTextActionCreator = (text) => (
    {type: upDateNewPostText, newText: text})
export const sliderIsOpenAC = (status) => ({type: sliderIsOpen, sliderIsOpen: status})
export const setUsersStatusAC = (userStatus) => ({type: setUserStatus, userStatus})
export const setNewPostCommentAC = (newPostComment) => ({type: setNewPostComment, newPostComment})
export const setPostCommentDataAC = (postCommentData) => ({type: setPostCommentData, postCommentData})


export const setCurrentUserProfileData = (id) => (dispatch) => {
    userProfileAPI(id).on('value', (snap) => {
        let data = []
        snap.forEach(u => {
            data.push(u.val())
        })
        dispatch(setProfileDataAC(data))
    })
}


export const setUserPhotoThunk = (id) => (dispatch) => {
    let data = []
    currentUserPhotoAPI(id).on('value', (snap) => {
        snap.forEach(u => {
            data.push(u.val())
        })
        let rowOrder = 0
        let setRowOrder = (index) => {
            if (index == 0 || index == 3 || index == 4 || index % 9 == 0 || index % 9 == 0 || index % 12 == 0 || index % 13 == 0 || index % 21 == 0 || index % 22 == 0) {
                rowOrder = 2
            } else {
                rowOrder = 1
            }
            return rowOrder
        }
        const orderPhotoData = data.map((v, indexV) => ({...v, order: indexV}))
        const sortPhotoData = orderPhotoData.sort((a, b) => b.order - a.order)
        const newPhotoData = orderPhotoData.map((v, indexV) => ({...v, rows: setRowOrder(indexV)}))
        dispatch(setPhotoDataAC(newPhotoData))
    })
}


export const setUserStatusThunk = (id) => (dispath) => {
    userAPI(id).on('value', (snap) => {
        let user = []
        snap.forEach(u => {
            user.push(u.val())
        })
        dispath(setUsersStatusAC(user[0].status))
    });
}

export const updateStatusThunk = (id, status) => (dispath) => {
    currentUserAPI(id).update({status: status})
    //     .then(userAPI(id).on('value', (snap) => {
    //     let user = []
    //     snap.forEach(u=>{
    //         user.push(u.val())
    //     })
    //     dispath(setUsersStatusAC(user[0].status))
    // }))
}

export const addNewPhotoThunk = (id, url) => (dispatch) => {
    const photoID = 'PH' + Date.now()
    let photoData = {
        id: photoID,
        url: url,
        likes: 0
    }
    profilePhotoBase(id, photoID).set(photoData)
    dispatch(setOpenModalAC(false));
    dispatch(setUserPhotoThunk(id))
    dispatch(setUpLoadFileAC(''))
    dispatch(setFileRefAC(''))
}

export const deleteCurrentUserPhoto = (userId, photoId, url) => (dispatch) => {
    profilePhotoBase(userId, photoId).remove().then(function () {
        storage.refFromURL(url).delete().then(function () {
            console.log('File was deleted')
            dispatch(setDeleteModalAC(false))
        })
    })
}

export const changeUserAvatar = (id, url, currentUserData) => (dispatch) => {
    const photoID = 'AV' + Date.now()
    if (currentUserData.avatar.default) {
        userAvatar(id).update({
                id: photoID,
                url: url,
                likes: 0,
                default: false
            }
        )
    } else {
        storage.refFromURL(currentUserData.avatar.url).delete().then(function () {
            userAvatar(id).update({
                url: url,
                likes: 0,
                default: false
            })

        }).catch(function (error) {
        });
        dispatch(setUpLoadFileAC(''))
        dispatch(setFileRefAC(''))
    }
}

///Photo likes block

export const addLikePhoto = (userID, photoID, likes, currentUserID) => (dispatch) => {
    profilePhotoBase(userID, photoID).update(
        {likes: likes + 1}
    )
    profilePhotoBaseLike(userID, photoID, currentUserID).set({
        userID: currentUserID
    })
    dispatch(setUserPhotoThunk(userID))
}

export const photoLikesData = (id, photoId, currentUserID) => (dispatch) => {
    let data = []
    checkUserPhotoLike(id, photoId).orderByChild('userID').equalTo(currentUserID).on('value', (snap) => {
        snap.forEach(u => {
            data.push(u.val())
        })
    })
    let check = 0
    if (data.length > 0) {
        check = data[0].userID
    } else {
        check = 0
    }
    return check
}


export const deleteLikePhoto = (userID, photoID, likes, currentUserID) => (dispatch) => {
    profilePhotoBase(userID, photoID).update(
        {likes: likes - 1}
    )
    profilePhotoBaseLike(userID, photoID, currentUserID).remove()
    dispatch(setUserPhotoThunk(userID))
}

export const photoLikesUserData = (id, photoId) => (dispatch) => {
    let data = []
    usersAPI.on('value', (snap) => {
        snap.forEach(u => {
            data.push(u.val())
        })
    })
    let users = []
    data.forEach((u) => {
        if (dispatch(photoLikesData(id, photoId, u.id)) == u.id) {
            users.push(u)
        }
    })
    return users
}


//new post
export const addNewPostThunk = (id, url, postText) => (dispatch) => {
    const postID = 'PS' + Date.now()
    const date = (new Date()).toString().split(' ').splice(1, 3).join(' ');
    const fullDate = Date.now()
    let postData = {
        id: postID,
        userID: id,
        url: url,
        likes: 0,
        commentsCount: 0,
        date: date,
        post: postText,
        fullDate: fullDate
    }
    profilePostBase(id, postID).set(postData)

    dispatch(setUserPostThunk(id))
    dispatch(setUpLoadFileAC(''))
    dispatch(setFileRefAC(''))
}

export const setUserPostThunk = (id) => (dispatch) => {
    let data = []
    currentUserPostAPI(id).on('value', (snap) => {
        snap.forEach(u => {
            data.push(u.val())
        })
        const orderPhotoData = data.map((v, indexV) => ({...v, order: indexV}))
        const sortPhotoData = orderPhotoData.sort((a, b) => b.order - a.order)
        dispatch(setPostDataAC(sortPhotoData))
    })
}

export const deleteCurrentUserPost = (userId, photoId, url) => (dispatch) => {
    profilePostBase(userId, photoId).remove().then(function () {
        storage.refFromURL(url).delete().then(function () {
            console.log('File was deleted')
        })
    })
}


///Post likes block

export const addLikePost = (userID, postID, likes, currentUserID) => (dispatch) => {
    profilePostBase(userID, postID).update(
        {likes: likes + 1}
    )
    profilePostBaseLike(userID, postID, currentUserID).set({
        userID: currentUserID
    })
    dispatch(setUserPostThunk(userID))
    dispatch(getAllPosts())
}

export const postLikesData = (id, postId, currentUserID) => (dispatch) => {
    let data = []
    checkUserPostLike(id, postId).orderByChild('userID').equalTo(currentUserID).on('value', (snap) => {
        snap.forEach(u => {
            data.push(u.val())
        })
    })
    let check = 0
    if (data.length > 0) {
        check = data[0].userID
    } else {
        check = 0
    }
    return check
}


export const deleteLikePost = (userID, postID, likes, currentUserID) => (dispatch) => {
    profilePostBase(userID, postID).update(
        {likes: likes - 1}
    )
    profilePostBaseLike(userID, postID, currentUserID).remove()
    dispatch(setUserPostThunk(userID))
    dispatch(getAllPosts())

}


export const postLikesUserData = (id, photoId) => (dispatch) => {
    let data = []
    usersAPI.on('value', (snap) => {
        snap.forEach(u => {
            data.push(u.val())
        })
    })
    let users = []
    data.forEach((u) => {
        if (dispatch(postLikesData(id, photoId, u.id)) == u.id) {
            users.push(u)
        }
    })
    return users
}


export const addPostComment = (id, postId, commentsCount, commentText, authUserID) => (dispatch) => {
    profilePostBase(id, postId).update(
        {commentsCount: commentsCount + 1}
    )
    const postID = 'PSCM' + Date.now()
    const date = (new Date()).toString().split(' ').splice(1, 3).join(' ');
    profileCurrentPostComment(id, postId, postID).set({
        postUserID: id,
        id: postID,
        likes: 0,
        date: date,
        comment: commentText,
        userID: authUserID
    })
    dispatch(getAllPosts())
}

export const deletePostComment = (id, postId, commentID, commentsCount) => (dispatch) => {
    profilePostBase(id, postId).update(
        {commentsCount: commentsCount - 1}
    )
    profileCurrentPostComment(id, postId, commentID).remove()
    dispatch(getAllPosts())
}


export const setUserPostCommentThunk = (id, postId) => (dispatch) => {
    let data = []
    profilePostCommentBase(id, postId).on('value', (snap) => {
        snap.forEach(u => {
            data.push(u.val())
        })
        // const orderPhotoData = data.map((v, indexV) => ({...v, order: indexV}))
        // const sortPhotoData = orderPhotoData.sort((a, b) => b.order - a.order)
        dispatch(setPostCommentDataAC(data))
    })
}


///post comment like
export const addLikePostComment = (userID, postID, commentId, likes, currentUserID) => (dispatch) => {
    profileCurrentPostComment(userID, postID, commentId).update(
        {likes: likes + 1}
    )

    profilePostCommentBaseLike(userID, postID, commentId, currentUserID).set({
        userID: currentUserID
    })
    dispatch(setUserPostCommentThunk(userID, postID))
}

export const postCommentLikesData = (id, postId, commentID, currentUserID) => (dispatch) => {
    let data = []
    checkUserPostCommentLike(id, postId, commentID).orderByChild('userID').equalTo(currentUserID).on('value', (snap) => {
        snap.forEach(u => {
            data.push(u.val())
        })
    })
    let check = 0
    if (data.length > 0) {
        check = data[0].userID
    } else {
        check = 0
    }
    return check
}

export const deleteLikePostComment = (userID, postID, commentId, likes, currentUserID) => (dispatch) => {
    profileCurrentPostComment(userID, postID, commentId).update(
        {likes: likes - 1}
    )

    profilePostCommentBaseLike(userID, postID, commentId, currentUserID).remove()
    dispatch(setUserPostCommentThunk(userID, postID))
}

export const getAllPosts = () => (dispatch) => {
    let data = []
    profileAPI.on('value', (snap) => {
        snap.forEach(u => {
            data.push(u.val())
        })
    })
    let postsData = []
    let newData = []
    data.forEach((d) => {
        if (d.post) {
            postsData.push(d.post)
        }
    })
    postsData.forEach((d) => {
        newData.push(Object.values(d))
    })
    let resultData = []
    newData.forEach((d) => {
        resultData.push(...d)
    })
    const sortPhotoData = resultData.sort((a, b) => b.fullDate - a.fullDate)
    dispatch(setActivityDataAC(sortPhotoData))
}

export const getFollowerPosts = (data) => (dispatch) => {
    let postsData = []
    data.forEach(d => {
        currentUserPostAPI(d.userID).on('value', (snap) => {
            snap.forEach(u => {
                postsData.push(u.val())
            })
            const sortPhotoData = postsData.sort((a, b) => b.fullDate - a.fullDate)
            dispatch(setFollowerPostDataAC(sortPhotoData))
        })
    })
}


export default profileReducer
