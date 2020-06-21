import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addLikePhoto, deleteLikePhoto, photoLikesData} from "../../../Redux/Reducer/profile-reducer";
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
            position:'absolute',
            left:'55px',
        }
    }
))


const PhotoLikeBtn = (props) => {

    const classes = useStyles(props);
    const dispatch = useDispatch();
    const [checkUserLike, setCheckUserLike] = useState(0)

    useEffect(() => {
        if (dispatch(photoLikesData(props.id,props.photoID,props.authUserID)) == props.authUserID) {
            setCheckUserLike(1)
        }
        else{setCheckUserLike(0)}
    }, [props.photoLikes, setCheckUserLike])

    const addLike = () => {
        dispatch(addLikePhoto(props.id, props.photoID, props.photoLikes, props.authUserID))
        console.log(props.photoID,)

    }

    const deleteLike = () => {
        dispatch(deleteLikePhoto(props.id, props.photoID, props.photoLikes, props.authUserID))
        console.log(props.photoID,)
    }

    return (
        <div className={classes.titleBlock}>
            {checkUserLike?<DisLikeBtn disLike={deleteLike}></DisLikeBtn>:<LikeBtn like={addLike}></LikeBtn>}
            <span className={classes.likesCount}>{props.photoLikes}</span>
        </div>
    )
}

export default PhotoLikeBtn
