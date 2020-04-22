const addPost = 'ADD-POST';
const upDateNewPostText = 'UPDATE-NEW-POST-TEXT';
const setProfileData = 'SET-PROFILE-DATA'
const setPostData = 'SET-POST-DATA'


let initialState = {
    profileData: [],
    postData: [],
    searchBar: [
        {id: 1, name: 'Activity'},
        {id: 2, name: 'MyPost'},
        {id: 3, name: 'Friends'},
        {id: 4, name: 'Groups'},
        {id: 5, name: 'Photo'},
    ],
    newPostText: ''
}


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case setProfileData:
            return {
                ...state,
                profileData: [...action.profileData]
            }
        case setPostData:{
            return {
                ...state,
                postData:[...action.postData]
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
        default:
            return state
    }
}


export const setProfileDataAC = (profileData) => ({type: setProfileData, profileData: profileData})
export const setPostDataAC = (postData) => ({type: setPostData, postData: postData})
export const addPostActionCreator = () => ({type: addPost})
export const upDateNewPostTextActionCreator = (text) => (
    {type: upDateNewPostText, newText: text})
export default profileReducer
