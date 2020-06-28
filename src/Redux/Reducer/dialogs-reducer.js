import {currentDialogAPI, currentMessageAPI, userDialogsAPI} from "../../firebase";

const updateNewMessageText = 'UPDATE-NEW-MESSAGE-TEXT'
const setDialogUserID = 'SET-DIALOG-USER-ID'
const setMassagesData = 'SET-MESSAGES-DATA'
const setDialogsData = 'SET-DIALOGS-DATA'
let initialState = {
    DialogsData: [],
    MassagesData: [],
    newMessageText: '',
    dialogUserID: ''
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case updateNewMessageText:
            return {
                ...state,
                newMessageText: action.newMessage
            }
        case setDialogUserID:
            return {
                ...state,
                dialogUserID: action.dialogUserID
            }
        case setMassagesData:
            return {
                ...state,
                MassagesData: [...action.MassagesData]
            }
        case setDialogsData:
            return {
                ...state,
                DialogsData: [...action.DialogsData]
            }
        default:
            return state
    }
}


export const updateNewMessageTextAC = (message) => (
    {type: updateNewMessageText, newMessage: message})
export const setDialogUserIDAC = (dialogUserID) => ({type: setDialogUserID, dialogUserID: dialogUserID})
export const setMassagesDataAC = (MassagesData) => ({type: setMassagesData, MassagesData: MassagesData})
export const setDialogsDataAC = (DialogsData) => ({type: setDialogsData, DialogsData: DialogsData})


export const sendNewMessage = (authUserID, dialogUserID, messageText) => (dispatch) => {
    const messageID = 'MS' + Date.now()
    const date = (new Date()).toString().split(' ').splice(1, 3).join(' ');
    const time = new Date().toLocaleTimeString('en-GB', {hour: "numeric", minute: "numeric"});
    const fullDate = Date.now()

    currentMessageAPI(authUserID, dialogUserID, messageID).set({
        messageID: messageID,
        userID: authUserID,
        fullDate: fullDate,
        date: date,
        time: time,
        messageText: messageText,
        delete: false
    })

}

export const deleteMessage = (authUserID, dialogUserID, messageID) => (dispatch) => {
    currentMessageAPI(authUserID, dialogUserID, messageID).update({
            messageText: 'Message was deleted',
            delete: true
        }
    )
}

export const getMessagesData = (authUserID, dialogUserID) => (dispatch) => {
    let resultData = []
    currentDialogAPI(authUserID, dialogUserID).on('value', (snap) => {
        let outgoingData = []
        snap.forEach(u => {
            outgoingData.push(u.val())
        })
        currentDialogAPI(dialogUserID, authUserID).on('value', (snap) => {
            let incomingData = []
            snap.forEach(u => {
                incomingData.push(u.val())
            })
            resultData.push(...outgoingData,...incomingData)
            const sortPhotoData = resultData.sort((a, b) => a.fullDate - b.fullDate)
            dispatch(setMassagesDataAC(sortPhotoData))
            dispatch(getDialogsData(authUserID))
        })
    })
}

export const getDialogsData = (authUserID) => (dispatch) =>{

}


export default dialogsReducer


