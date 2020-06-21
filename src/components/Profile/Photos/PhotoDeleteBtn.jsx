import React, {useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import DeleteBtn from "../../../common/DeleteBtn/DeleteBtn";
import {deleteCurrentUserPhoto} from "../../../Redux/Reducer/profile-reducer";


const PhotoDeleteBtn = (props) => {
    const dispatch = useDispatch();
    const [checkUser, setCheckUser] = useState(false)

    useEffect(() => {
        if (props.authUserID == props.currentUserID) {
            setCheckUser(true)
        } else {
            setCheckUser(false)
        }
    },[props.photoID])

    const deletePhoto = (userId, photoId, url) => {
        dispatch(deleteCurrentUserPhoto(userId, photoId, url))
        console.log(photoId)
    }

    return (
        checkUser ? <DeleteBtn deleteItem={() => {
            deletePhoto(props.authUserID, props.photoID, props.photoUrl)
        }} label='Do you want to delete this photo'></DeleteBtn> : <></>
    )
}

export default PhotoDeleteBtn
