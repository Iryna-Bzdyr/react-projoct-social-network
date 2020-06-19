
let setDeleteModal = 'SET-DELETE-MODAL'

let initialState = {
    deleteModalStage:false
}

let processReducer = (state=initialState,action)=>{
    switch (action.type) {
        case setDeleteModal:
            return {
                ...state,
                deleteModalStage:action.deleteModalStage
            }
        default: {
                return state
         }
    }
}


export const setDeleteModalAC = (deleteModalStage) => ({type:setDeleteModal,deleteModalStage:deleteModalStage})

export default processReducer