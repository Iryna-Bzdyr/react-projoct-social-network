import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getUserAvatar,
    getUserFirstName,
    getUserLastName,
} from "../../../Redux/Reducer/user-reducer";
import s from './MyPosts.module.css'
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import CommentLikeBtn from "./CommentLikeBtn";


const Comment = (props) => {
    let [id, setUserID] = useState('')
    let [avatar, setAvatar] = useState('')
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    const authUserID = useSelector(state => state.usersPage.currentUserId)

    useEffect(() => {
        setUserID(props.commentUserId)
        if (id) {
            setAvatar(getUserAvatar(id))
            setFirstName(getUserFirstName(id))
            setLastName(getUserLastName(id))
        }
    }, [id])

    return (
        <div>
            <Card className={s.comment__block}>
                <CardContent className={s.comment__content}>
                    <div className={s.comment__user__info}>
                        <Avatar src={avatar}/>
                        <div className={s.comment__user__name}>
                            <span className={s.name}>{firstName}</span><span>{lastName}</span>
                        </div>
                        <div className={s.comment__date}>{props.date}</div>

                    </div>
                    <div className={s.comment}>{props.comment}</div>
                    <div className={s.comment__btn__block}>
                        {authUserID === props.profileUserID || authUserID === props.commentUserId ?
                            <IconButton
                                onClick={() => props.deleteComment(props.profileUserID, props.postId, props.commentId, props.commentsCount)}
                                aria-label="delete post"
                            >
                                <DeleteIcon className={s.delete__btn}/>
                            </IconButton>
                            : <></>}
                        <IconButton aria-label="share">
                            <ShareIcon className={s.share__btn}/>
                        </IconButton>
                        <CommentLikeBtn id={props.profileUserID}
                                        postID={props.postId}
                                        commentId={props.commentId}
                                        authUserID={authUserID}
                                        postCommentLikes={props.likes}
                        ></CommentLikeBtn>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Comment
