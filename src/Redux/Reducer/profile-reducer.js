import database, {currentUserAPI, userAPI, currentUserPhotoAPI, profileAPI} from "../../firebase";
import {toggleIsFetchingAC} from "./user-reducer";


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
    profileAPI.orderByChild('userID').equalTo(id).on('value', (snap) => {
        snap.forEach(u => {
            console.log(u.val)
            data.push(u.val())
        })
        console.log(data)
        let rowOrder = 0
        let setRowOrder = (index) => {
            if (index == 0 || index % 4 == 0) {
                rowOrder = 3
            } else if (index == 1 || index % 5 == 0) {
                rowOrder = 1
            } else {
                rowOrder = 2
            }
            return rowOrder
        }
        const newData = data[0].photo.map((v, indexV) => ({...v, rows: setRowOrder(indexV)}))

        dispatch(setPhotoDataAC(newData))
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

export const addNewPhotoThunk = (id, url) => (dispath) => {
    let data = []
    profileAPI.orderByChild('userID').equalTo(id).on('value', (snap) => {
        snap.forEach(u => {
            console.log(u.val)
            data.push(u.val())
        })})
    // console.log(currentUserPhotoAPI(id))
    const photoID = Date.now()
   let ref  = currentUserPhotoAPI(id).key()
    console.log(ref)
    //
   // currentUserPhotoAPI(id).key().set({
   //     id: photoID,
   //     likes: 0,
   //     url: url
   // })
    // ref.set({
    //     id: photoID,
    //     likes: 0,
    //     url: url
    // })
}

export default profileReducer
