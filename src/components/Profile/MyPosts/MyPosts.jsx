import React, {useEffect, useState} from 'react'
import s from './MyPosts.module.css'

import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import PostBlock from "../../../common/PostBlock/PostBlock";
import {addNewPostThunk} from "../../../Redux/Reducer/profile-reducer";


const MyPosts = React.memo(props => {
        let paramsData = useParams();
        let [id, setUserID] = useState('')
        const authUserID = useSelector(state => state.usersPage.currentUserId)
        const dispatch = useDispatch();
        const uploadFile = useSelector(state => state.uploadPhotoReducer.upLoadFile)
        const [newPostBlock, setNewPostBlock] = useState(false)

        useEffect(() => {
            if (!paramsData.userID) {
                setUserID(authUserID)
            } else {
                setUserID(+paramsData.userID)
            }
            if (authUserID == id) {
                setNewPostBlock(true)
                // setShowDeleteBtn(true)
            }
        },[id])
        let addNewPost = () => {
            dispatch(addNewPostThunk(authUserID, uploadFile))
        }

        return (
            <div>
                {setNewPostBlock ? <PostBlock addPost={addNewPost}></PostBlock> : <></>}

            </div>
        )
    }
)
export default MyPosts
