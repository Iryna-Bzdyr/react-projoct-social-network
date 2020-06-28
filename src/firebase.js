import * as firebase from 'firebase'
import firestore from 'firebase/firestore'

export const config = {
    apiKey: "AIzaSyBIsTbTS3lfVW9in5zxYq2oqvYF2S_bhN8",
    authDomain: "react-social-network-a5dc0.firebaseapp.com",
    databaseURL: "https://react-social-network-a5dc0.firebaseio.com",
    projectId: "react-social-network-a5dc0",
    storageBucket: "react-social-network-a5dc0.appspot.com",
    messagingSenderId: "403301898250",
    appId: "1:403301898250:web:9409a7e449fdcdd3e7e7f3"
};


const fire = firebase.initializeApp(config);

const database = fire.database();
export const storage = fire.storage()
//Main folder access
export const usersAPI =  database.ref('database/users/')
export const profileAPI =  database.ref('database/profile/')
export const userLoginAPI = database.ref('database/loginData/')
export const dialogsAPI = database.ref('database/dialogs/')
export const countryAPI =  database.ref('citiesData/')


export const userAPI = (id)=>{
    return (
     usersAPI.orderByKey().equalTo(id)
    )
}
export const userProfileAPI = (id)=>{
    return (
        profileAPI.orderByChild('id').equalTo(id)
    )
}


export const currentUserAPI = (id) => {
    return (
        database.ref(`database/users/${id}`)
    )
}
//Current user photo access
export const currentUserPhotoAPI = (id) => {
    return (
        database.ref(`database/profile/${id}/photo`)
    )
}

//Current user photo access
export const currentUserPostAPI = (id) => {
    return (
        database.ref(`database/profile/${id}/post`)
    )
}

export const userDataBase= (id) =>{
    return (
        database.ref(`database/users/${id}`)
    )
}

//For login user. Login user data access
export const loginDataBase= (id) =>{
    return (
        database.ref(`database/loginData/${id}`)
    )
}


//Current user Profile access
export const profileDataBase= (id) =>{
    return (
        database.ref(`database/profile/${id}`)
    )
}

//Change user photo API
export const profilePhotoBase= (id, photoId) =>{
    return (
        database.ref(`database/profile/${id}/photo/${photoId}`)
    )
}
//Change user photo API

export const profilePhotoBaseLike=(id, photoId, likeID) =>{
    return (
        database.ref(`database/profile/${id}/photo/${photoId}/likeUsers/${likeID}`)
    )
}

export const checkUserPhotoLike=(id, photoId) =>{
    return (
        database.ref(`database/profile/${id}/photo/${photoId}/likeUsers`)
    )
}

//Change avatar API
export const userAvatar= (id) =>{
    return (
        database.ref(`database/users/${id}/avatar`)
    )
}

//Get User avatar
export const getUserAvatarAPI = (id)=>{
    return (
        database.ref(`database/users/${id}/avatar/url`)
    )
}
export const getUserFirstNameAPI = (id)=>{
    return (
        database.ref(`database/users/${id}/fullName/firstName`)
    )
}

export const getUserLastNameAPI = (id)=>{
    return (
        database.ref(`database/users/${id}/fullName/lastName`)
    )
}
//Post Block
//Current user post API
export const profilePostBase= (id, postId) =>{
    return (
        database.ref(`database/profile/${id}/post/${postId}`)
    )
}

export const profilePostBaseLike=(id, postId, likeID) =>{
    return (
        database.ref(`database/profile/${id}/post/${postId}/likeUsers/${likeID}`)
    )
}
export const checkUserPostLike=(id, postId) =>{
    return (
        database.ref(`database/profile/${id}/post/${postId}/likeUsers`)
    )
}

//Current user post comment API
export const profilePostCommentBase= (id, postId) =>{
    return (
        database.ref(`database/profile/${id}/post/${postId}/comment`)
    )
}


export const profileCurrentPostComment= (id, postId, commentID) =>{
    return (
        database.ref(`database/profile/${id}/post/${postId}/comment/${commentID}`)
    )
}


export const profilePostCommentBaseLike=(id, postId, commentID, userId) =>{
    return (
        database.ref(`database/profile/${id}/post/${postId}/comment/${commentID}/likeUsers/${userId}`)
    )
}

export const checkUserPostCommentLike=(id, postId,commentID) =>{
    return (
        database.ref(`database/profile/${id}/post/${postId}/comment/${commentID}/likeUsers/`)
    )
}

//friends datadase API
export const followerAPI = (id, followUserID)=>{
    return(
        database.ref(`database/follower/${id}/${followUserID}`)
    )
}

export const checkFollowerAPI = (id)=>{
    return(
        database.ref(`database/follower/${id}`)
    )
}

//Location database access
export const citiesAPI = (country) => {
    return (
        countryAPI.orderByChild('country').equalTo(country)
    )
}

//dialogs access
export const userDialogsAPI = (authUserID)=>{
    return (
        database.ref(`database/dialogs/${authUserID}`)
    )
}


export const currentDialogAPI = (authUserID,dialogUserID)=>{
    return(
        database.ref(`database/dialogs/${authUserID}/${dialogUserID}`)
    )
}

export const currentMessageAPI = (authUserID, dialogUserID, messageID)=>{
    return(
        database.ref(`database/dialogs/${authUserID}/${dialogUserID}/${messageID}`)
    )
}
//storage API
export const photoStorageRef=(name)=> storage.ref('/photo/'+name)

export default database;
