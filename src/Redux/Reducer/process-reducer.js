import {profilePhotoBase} from "../../firebase";

let setDeleteModal = 'SET-DELETE-MODAL'
let setFetching = 'SET-FETCHING'
let initialState = {
    deleteModalStage:false,
    fetching:true,
}

let processReducer = (state=initialState,action)=>{
    switch (action.type) {
        case setDeleteModal:
            return {
                ...state,
                deleteModalStage:action.deleteModalStage
            }
        case setFetching:
            return {
                ...state,
                fetching:action.fetching
            }
        default: {
                return state
         }
    }
}


export const setDeleteModalAC = (deleteModalStage) => ({type:setDeleteModal,deleteModalStage:deleteModalStage})
export const setSetFetchingAC = (fetching) => ({type:setFetching,fetching:fetching})

export default processReducer
