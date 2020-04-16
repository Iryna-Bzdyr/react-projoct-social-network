const addMessage = 'ADD-MESSAGE'
const updateNewMessageText = 'UPDATE-NEW-MESSAGE-TEXT'
let initialState = {
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
}

const dialogsReducer = (state=initialState, action) => {

    switch (action.type) {
        case addMessage :
            let text = state.newMessageText
            return {
                ...state,
                newMessageText: '',
                MassageData:[...state.MassageData, {id:4, text:text} ]
            }

        case updateNewMessageText:
            return {
                ...state,
                newMessageText: action.newMessage
            }

        default:
            return state
    }
}

export const addMessageActionCreator = () => ({type: addMessage})
export const updateNewMessageTextActionCreator = (message) => (
    {type: updateNewMessageText, newMessage: message})
export default dialogsReducer