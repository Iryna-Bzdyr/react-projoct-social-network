import React, {useState} from "react";
import s from './Settings.module.css'
import UploadPhoto from "../../common/UploadPhoto/UploadPhoto";
import {useDispatch, useSelector} from "react-redux";
import {setOpenModalAC} from "../../Redux/Reducer/photo-reducer";
import {addNewPhotoThunk, changeUserAvatar} from "../../Redux/Reducer/profile-reducer";
import PostBlock from "../../common/PostBlock/PostBlock";
import EmojiWindow from "../../common/EmojiWindow/EmojiWindow";

const Settings = (props) => {
    const dispatch = useDispatch();
    const uploadFile = useSelector(state => state.uploadPhotoReducer.upLoadFile)
    const authUserID = useSelector(state => state.usersPage.currentUserId)
    const currentUserLoginData = useSelector(state => state.usersPage.currentUserData)


    const addPhoto = () => {
        dispatch(setOpenModalAC(false));
        dispatch(addNewPhotoThunk(authUserID, uploadFile))

    }

    const changeAvatar = () => {
        dispatch(setOpenModalAC(false));
        dispatch(changeUserAvatar(authUserID, uploadFile, currentUserLoginData))
    }


return (
    <div className={s.block}>
        Settings
        <EmojiWindow></EmojiWindow>
        {/*<UploadPhoto display={true} backgroundColor="red" label='Add photo' changePhoto={addPhoto}/>*/}
        {/*<UploadPhoto display={true} backgroundColor="purple" label='Change avatar' changePhoto={changeAvatar}/>*/}
        <PostBlock></PostBlock>
    </div>
)
}


export default Settings
