import React from "react";
import s from './Settings.module.css'
import UploadPhoto from "../../common/UploadPhoto/UploadPhoto";
import {useDispatch, useSelector} from "react-redux";
import {setOpenModalAC} from "../../Redux/Reducer/photo-reducer";
import {addNewPhotoThunk} from "../../Redux/Reducer/profile-reducer";

const Settings = (props) => {
    const dispatch = useDispatch();
    const uploadFile = useSelector(state => state.uploadPhotoReducer.upLoadFile)
    const authUserID = useSelector(state => state.auth.userID)
    const addPhoto = () => {
        dispatch(setOpenModalAC(false));
        dispatch(addNewPhotoThunk(authUserID,uploadFile))
    }

    return (
        <div className={s.block}>
            Settings
            <UploadPhoto display={true} backgroundColor="purple" width={800} label='Change avatar' changePhoto={addPhoto} />
        </div>
    )
}
export default Settings
