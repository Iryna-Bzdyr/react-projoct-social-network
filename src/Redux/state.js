import {renderEntireTree} from "../render";

let state = {
    messagesPage: {
        DialogsData: [
            {id: 1, name: 'Item 1'},
            {id: 2, name: 'Item 2'},
            {id: 3, name: 'Item 3'},
            {id: 4, name: 'Item 4'},
            {id: 5, name: 'Item 5'}
        ],
        MassageData: [
            {id: 1, text: 'Hello'},
            {id: 2, text: 'How are you'},
            {id: 3, text: 'What time is it'},
        ],
    },
    profilePage:{
       postData: [
           {id:1, post:'Hi. how are you', likesCount:12},
           {id:2, post:'It"s my first post', likesCount:35}
       ],
        newPostText: 'it-kamasutra'
   }
}

export let addPost = (postMassage) => {
    let newPost = {
        id:5,
        post: postMassage,
        likesCount: 0
    }
    state.profilePage.postData.push(newPost)
    renderEntireTree(state)
}

export let updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText
    renderEntireTree(state)
}

export default state