import database, {
    currentUserAPI,
    userAPI,
    currentUserPhotoAPI,
    profileAPI,
    profilePhotoBase,
    userAvatar,
    storage, userProfileAPI, profilePhotoBaseLike, checkUserPhotoLike, profileDataBase, usersAPI, profilePostBase,
} from "../../firebase";
import {toggleIsFetchingAC} from "./user-reducer";
import {setFileRefAC, setOpenModalAC, setUpLoadFileAC} from "./photo-reducer";
import {setDeleteModalAC} from "./process-reducer";
import {register} from "../../serviceWorker";


const addPost = 'ADD-POST';
const upDateNewPostText = 'UPDATE-NEW-POST-TEXT';
const setProfileData = 'SET-PROFILE-DATA'
const setPostData = 'SET-POST-DATA'
const setPhotoData = 'SET-PHOTO-DATA'
const sliderIsOpen = 'SLIDER-IS-OPEN'
const setUserStatus = 'SET-USER-STATUS'


let initialState = {
    profileData: [],
    postData: [],
    photoData: [],
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
    userStatus: ""
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
        case setPhotoData: {
            return {
                ...state,
                photoData: [...action.photoData]
            }
        }
        case addPost:
            let post = state.newPostText
            return {
                ...state,
                newPostText: '',
                postData: [...state.postData, {id: 5, post: post, likesCount: 5}]
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
        default:
            return state
    }
}

export const setProfileDataAC = (profileData) => ({type: setProfileData, profileData: profileData})

export const setCurrentUserProfileData = (id) => (dispatch) => {
    userProfileAPI(id).on('value', (snap) => {
        let data = []
        snap.forEach(u => {
            data.push(u.val())
        })
        dispatch(setProfileDataAC(data))
    })
}


export const setPostDataAC = (postData) => ({type: setPostData, postData: postData})
export const setPhotoDataAC = (photoData) => ({type: setPhotoData, photoData: photoData})
export const addPostActionCreator = () => ({type: addPost})
export const upDateNewPostTextActionCreator = (text) => (
    {type: upDateNewPostText, newText: text})
export const sliderIsOpenAC = (status) => ({type: sliderIsOpen, sliderIsOpen: status})
export const setUsersStatusAC = (userStatus) => ({type: setUserStatus, userStatus})


export const setUserPostThunk = (id) => (dispatch) => {
    let data = []
    profileAPI.orderByChild('userID').equalTo(id).on('value', (snap) => {
        snap.forEach(u => {
            data.push(u.val())
        })

        dispatch(setPostDataAC(data[0].post))
        dispatch(toggleIsFetchingAC(false))
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
            if (index == 0 || index % 8 == 0) {
                rowOrder = 3
            } else if (index == 1 || index % 5 == 0|| index % 4 == 0|| index % 6 == 0|| index % 7 == 0|| index % 9 == 0) {
                rowOrder = 1
            } else {
                rowOrder = 2
            }
            return rowOrder
        }
        // const orderPhotoData = data.map((v,indexV)=>({...v, order:indexV}))
        // const sortPhotoData = orderPhotoData.sort((a,b)=>b.order-a.order)
        const newPhotoData = data.map((v, indexV) => ({...v, rows: setRowOrder(indexV)}))
        dispatch(setPhotoDataAC(newPhotoData))
        // dispatch(setPhotoDataAC(data))

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
            // dispatch(setUserPhotoThunk(userId))
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

//Photo likes block

export const addLikePhoto = (userID, photoID, likes, currentUserID) => (dispatch) => {
    profilePhotoBase(userID, photoID).update(
        {likes: likes + 1}
    )
    profilePhotoBaseLike(userID, photoID,currentUserID).set({
        userID: currentUserID
    })
    dispatch(setUserPhotoThunk(userID))
}

export const photoLikesData = (id, photoId,currentUserID) => (dispatch) => {
    let data = []
    checkUserPhotoLike(id, photoId).orderByChild('userID').equalTo(currentUserID).on('value', (snap) => {
        snap.forEach(u => {
            data.push(u.val())
        })
    })
let check = 0
    if(data.length>0){
        check = data[0].userID
    }
    else {
        check = 0
    }
    return check
}


export const deleteLikePhoto = (userID, photoID, likes, currentUserID) => (dispatch) => {
    profilePhotoBase(userID, photoID).update(
        {likes: likes - 1}
    )
    profilePhotoBaseLike(userID, photoID,currentUserID).remove()
    dispatch(setUserPhotoThunk(userID))
}

export const photoLikesUserData= (id,photoId)=>(dispatch)=>{
    let data =[]
    usersAPI.on('value', (snap) =>{
        snap.forEach(u => {
            data.push(u.val())
        })
    })
    let users = []
    data.forEach((u)=>{
        if(dispatch(photoLikesData(id,photoId,u.id))==u.id){
            users.push(u)
        }
    })
    return users
}


//new post
export const addNewPostThunk = (id, url) => (dispatch) => {
    const postID = 'PS' + Date.now()
    let postData = {
        id: postID,
        url: url,
        likes: 0
    }
    profilePostBase(id, postID).set(postData)

    // dispatch(setUserPhotoThunk(id))
    dispatch(setUpLoadFileAC(''))
    dispatch(setFileRefAC(''))
}

export default profileReducer
