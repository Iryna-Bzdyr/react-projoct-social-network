const addPost = 'ADD-POST';
const upDateNewPostText = 'UPDATE-NEW-POST-TEXT';
let initialState =   {
    postData: [
        {id: 1, post: 'Hi. how are you', likesCount: 12},
        {id: 2, post: 'It"s my first post', likesCount: 35}
    ],
        searchBar: [
        {id: 1, name: 'Activity'},
        {id: 2, name: 'MyPost'},
        {id: 3, name: 'Friends'},
        {id: 4, name: 'Groups'},
        {id: 5, name: 'Forums'},
    ],
        newPostText: 'it-kamasutra'
}


const profileReducer = (state=initialState, action) => {
    switch (action.type) {
        case addPost:
            let post = state.newPostText
            return {
                ...state,
                newPostText: '',
                postData: [...state.postData, {id:5, post: post, likesCount: 5}]
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
export const addPostActionCreator = () => ({type: addPost})
export const upDateNewPostTextActionCreator = (text) => (
    {type: upDateNewPostText, newText: text})
export default profileReducer