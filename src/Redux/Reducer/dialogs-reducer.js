const addMessage = 'ADD-MESSAGE'
const updateNewMessageText = 'UPDATE-NEW-MESSAGE-TEXT'
let initialState = {
    DialogsData: [],
    MassageData: [],
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