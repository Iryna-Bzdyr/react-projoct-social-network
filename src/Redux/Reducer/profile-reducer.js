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
            let newPost = {
                id: 5,
                post: state.newPostText,
                likesCount: 0
            }
            state.postData.push(newPost)
            state.newPostText = ''
            return state
        case upDateNewPostText:
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}
export const addPostActionCreator = () => ({type: addPost})
export const upDateNewPostTextActionCreator = (text) => (
    {type: upDateNewPostText, newText: text})
export default profileReducer