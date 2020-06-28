import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import s from "./MyPosts.module.css";
import IconButton from "@material-ui/core/IconButton";
import PostAddIcon from "@material-ui/icons/PostAdd";
import {useDispatch, useSelector} from "react-redux";
import {
    addPostComment, deletePostComment,
    setNewPostCommentAC,
    setUserPostCommentThunk, upDateNewPostTextActionCreator,

} from "../../../Redux/Reducer/profile-reducer";
import Comment from "./Comment";
import EmojiWindow from "../../../common/EmojiWindow/EmojiWindow";


const CommentsBlock = (props) => {
    const dispatch = useDispatch();
    const comment = useSelector(state => state.profilePage.newPostComment)
    const postCommentData = useSelector(state => state.profilePage.postCommentData)

    useEffect(() => {
        dispatch(setUserPostCommentThunk(props.id, props.postId,))

    }, [props.commentsCount])

    const onCommentChange = (e) => {
        dispatch(setNewPostCommentAC(e.target.value))
    }

    const addComment = (id, postId, commentsCount, authUserID) => {
        dispatch(addPostComment(id, postId, commentsCount, comment, authUserID))
        dispatch(setNewPostCommentAC(''))
        dispatch(setUserPostCommentThunk(props.id, props.postId,))
    }
    const deleteComment = (id, postId, commentId,commentsCount) => {
        dispatch(deletePostComment(id, postId, commentId,commentsCount))
        dispatch(setUserPostCommentThunk(props.id, props.postId,))
    }

    return (
        <>
            <Typography paragraph className={s.comment__input}>
                <TextField
                    className={s.textArea}
                    multiline
                    rows={2}
                    placeholder='Write new comment'
                    variant="outlined"
                    onChange={onCommentChange}
                    value={comment}
                />
                <EmojiWindow className={s.emoji} action={setNewPostCommentAC}
                             value={comment}></EmojiWindow>
            </Typography>
            <Typography paragraph>
                <IconButton
                    aria-label="add comment"
                    disabled={!comment}
                    className={s.add__comment__btn}
                    onClick={() => addComment(props.id, props.postId,props.commentsCount, props.authUserID)}
                >
                    <PostAddIcon/>
                </IconButton>
            </Typography>
            <Typography className={s.comment__area}>
                {postCommentData.map((comment, index) => (
                    <Comment
                        profileUserID={props.id}
                        comment={comment.comment} commentUserId={comment.userID}
                        date={comment.date}
                        postId={props.postId}
                        commentId={comment.id}
                        commentsCount={props.commentsCount}
                        likes={comment.likes}
                        deleteComment={deleteComment}
                    ></Comment>
                ))}
            </Typography>
        </>
    )
}

export default CommentsBlock
