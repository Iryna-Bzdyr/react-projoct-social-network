import React, {useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import s from "./MyPosts.module.css";
import IconButton from "@material-ui/core/IconButton";
import PostAddIcon from "@material-ui/icons/PostAdd";
import {useDispatch, useSelector} from "react-redux";
import {
    addPostComment,
    setNewPostCommentAC,
    setUserPostCommentThunk,
    setUserPostThunk
} from "../../../Redux/Reducer/profile-reducer";
import Comment from "./Comment";



const CommentsBlock = (props)=>{
    const dispatch = useDispatch();
    const comment = useSelector(state => state.profilePage.newPostComment)
    const postCommentData = useSelector(state => state.profilePage.postCommentData)

    useEffect(()=>{
        dispatch(setUserPostCommentThunk(props.id, props.postId,))
    },[props.postId])

    const onCommentChange =(e)=>{
        dispatch(setNewPostCommentAC(e.target.value))
    }

    const addComment = (id, postId,authUserID)=>{
        dispatch(addPostComment(id, postId,comment,authUserID))
        dispatch(setNewPostCommentAC(''))
        dispatch(setUserPostCommentThunk(props.id, props.postId,))
        dispatch(setUserPostThunk(props.id))
    }


    return(
        <>
            <Typography paragraph>
                <TextField
                    className={s.textArea}
                    multiline
                    rows={2}
                    placeholder='Write new comment'
                    variant="outlined"
                    onChange={onCommentChange}
                    value={comment}
                />
            </Typography>
            <Typography paragraph>
                <IconButton
                    aria-label="add comment"
                    disabled={!comment}
                    className={s.add__comment__btn}
                    onClick={() => addComment(props.id, props.postId, props.authUserID)}
                >
                    <PostAddIcon/>
                </IconButton>
            </Typography>
            <Typography className={s.comment__area}>
                {postCommentData.map((comment,index)=>(
                        <Comment comment={comment.comment} commentUserId={comment.userID}
                        date={comment.date}
                        ></Comment>
                ))}
            </Typography>
            </>
    )
}

export default CommentsBlock
