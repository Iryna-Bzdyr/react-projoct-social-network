import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {
    addLikePost,
    deleteLikePost,
    postLikesData,
} from "../../../Redux/Reducer/profile-reducer";
import {makeStyles} from "@material-ui/core";
import {DisLikeBtn, LikeBtn} from "../../../common/LikeBtn/LikeBtn";

const useStyles = makeStyles((theme) => (
    {
        titleBlock: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        likesCount:{
            color: "#380f0b",
            fontSize:'12px',
            fontWeight:'bold',
            // position:'absolute',
            // left:'3px',
        }
    }
))


const PostLikeBtn = (props) => {

    const classes = useStyles(props);
    const dispatch = useDispatch();
    const [checkUserLike, setCheckUserLike] = useState(0)

    useEffect(() => {
        if (dispatch(postLikesData(props.id,props.postID,props.authUserID)) == props.authUserID) {
            setCheckUserLike(1)
        }
        else{setCheckUserLike(0)}
    }, [props.postLikes,checkUserLike])

    const addLike = () => {
        dispatch(addLikePost(props.id, props.postID, props.postLikes, props.authUserID))


    }

    const deleteLike = () => {
        dispatch(deleteLikePost(props.id, props.postID, props.postLikes, props.authUserID))

    }

    return (
        <div className={classes.titleBlock}>
            {checkUserLike?<DisLikeBtn disLike={deleteLike}></DisLikeBtn>:<LikeBtn like={addLike}></LikeBtn>}
            <span className={classes.likesCount}>{props.postLikes}</span>
        </div>
    )
}

export default PostLikeBtn
