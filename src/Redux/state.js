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
        newMessageText:'',
    },
    profilePage:{
       postData: [
           {id:1, post:'Hi. how are you', likesCount:12},
           {id:2, post:'It"s my first post', likesCount:35}
       ],
        searchBar:[
            {id:1, name:'Activity'},
            {id:2, name:'MyPost'},
            {id:3, name:'Friends'},
            {id:4, name:'Groups'},
            {id:5, name:'Forums'},
        ],
        newPostText: 'it-kamasutra'
   }
}

export let addPost = () => {
    let newPost = {
        id:5,
        post: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.postData.push(newPost)
    renderEntireTree(state)
    state.profilePage.newPostText = ''
}

export let updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText
    renderEntireTree(state)
}

export let addMessage= ()=>{
    let newMassage = {
        id:4,
        text: state.messagesPage.newMessageText
    }
    state.messagesPage.MassageData.push(newMassage)
    renderEntireTree(state)
    state.messagesPage.newMessageText = ''
}

export let updateNewMessageText = (newMessage) =>{
    state.messagesPage.newMessageText = newMessage
    renderEntireTree(state)
}
export default state