import profileReducer from "./Reducer/profile-reducer";
import dialogsReducer from "./Reducer/dialogs-reducer";

let store = {
    _state: {
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
            newMessageText: '',
        },
        profilePage: {
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
    },
    _callSubscriber() {
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action)
        this._callSubscriber(this._state)
    }
}

export default store
window.store = store