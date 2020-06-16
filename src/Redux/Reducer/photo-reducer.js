import {photoStorageRef} from "../../firebase";

const setUpLoadFile = 'SET-LOAD-FILE'
const setFileRef = 'SET-FILE-REF'
const setProgress = 'SET-PROGRESS'
const setOpenModal= 'SET-OPEN-MODAL'
const initialState = {
    upLoadFile: '',
    fileRef: '',
    progress:0,
    openModal:false
}

let uploadPhotoReducer = (state = initialState, action) => {
    switch (action.type) {
        case setUpLoadFile:
            return {
                ...state,
                upLoadFile: action.upLoadFile
            }
        case setFileRef:
            return {
                ...state,
                fileRef: action.fileRef
            }
        case setProgress:
            return {
                ...state,
                progress: action.progress
            }
        case setOpenModal:
            return {
                ...state,
                openModal: action.openModal
            }
        default:
            return state
    }
}

export const setFileRefAC = (fileRef) => ({type: setFileRef, fileRef: fileRef})
export const setUpLoadFileAC = (upLoadFile) => ({type: setUpLoadFile, upLoadFile: upLoadFile})
export const setProgressAC = (progress) => ({type: setProgress, progress: progress})
export const setOpenModalAC = (openModal) => ({type: setOpenModal, openModal: openModal})

export const uploadAvatar = (event) => (dispatch) => {
    const file = event.target.files[0]
    const fileName ="123" + Date.now() + '.' + file.type.split('/')[1]
    const filePath = photoStorageRef(fileName)
    filePath.put(file).then(function (snapshot) {
        let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        dispatch(setProgressAC(percent))

        filePath.getDownloadURL().then(function (url) {
            dispatch(setUpLoadFileAC(url))
            dispatch(setFileRefAC(filePath))
        });
    });
}

export const deleteUploadAvatar = (desertRef) => (dispatch) => {
    desertRef.delete().then(function () {
        console.log('File was deleted')

    }).catch(function (error) {
        // Uh-oh, an error occurred!
    });
}

export default uploadPhotoReducer
