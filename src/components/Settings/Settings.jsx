import React, {useState} from "react";
import s from './Settings.module.css'
import UploadPhoto from "../../common/UploadPhoto/UploadPhoto";
import {useDispatch, useSelector} from "react-redux";
import {setOpenModalAC} from "../../Redux/Reducer/photo-reducer";
import {addNewPhotoThunk, changeUserAvatar} from "../../Redux/Reducer/profile-reducer";

const Settings = (props) => {
    const dispatch = useDispatch();
    const uploadFile = useSelector(state => state.uploadPhotoReducer.upLoadFile)
    const authUserID = useSelector(state => state.usersPage.currentUserId)
    const currentUserLoginData = useSelector(state => state.auth.currentUserLoginData)
    const [modalLabel, setModalLabel] = useState('')

    let functionArr = []
    const addPhoto = () => {
        dispatch(setOpenModalAC(false));
        dispatch(addNewPhotoThunk(authUserID, uploadFile))
        setModalLabel('ADD PHOTO')
    }

    const changeAvatar = () => {
        dispatch(setOpenModalAC(false));
        dispatch(changeUserAvatar(authUserID, uploadFile, currentUserLoginData))
        setModalLabel('CHANGE AVATAR')
    }

    functionArr.push(addPhoto, changeAvatar)
    let newArr = []
    functionArr.forEach((u, index) => newArr.push({function: u, label: modalLabel}))
    console.log(newArr)

    let UploadPhotoElement=newArr.map(el=><UploadPhoto display={true} label={el.label} changePhoto={el.function}/>)
    console.log(UploadPhotoElement)
    return (
        <div className={s.block}>
            Settings
            {UploadPhotoElement}
            {/*<UploadPhoto display={true} backgroundColor="red" label='Add photo' changePhoto={addPhoto}/>*/}
            {/*<UploadPhoto display={true} backgroundColor="purple" label='Change avatar' changePhoto={changeAvatar}/>*/}
        </div>
    )
}


export default Settings
