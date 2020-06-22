import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {makeStyles} from "@material-ui/core";
import { AiOutlineHeart, AiFillHeart} from "react-icons/ai";

const useStyles = makeStyles((theme) => (
    {
        disLikeBtn: {
            color: "#f40000",
        },
    }
))

export const LikeBtn = (props) => {
    const classes = useStyles(props);
    return (
        <div onClick={props.like}>
            <IconButton
                aria-label="like">
                <FavoriteBorderIcon className={classes.disLikeBtn}></FavoriteBorderIcon>

            </IconButton>
        </div>
    )
}

export const DisLikeBtn = (props) => {
    const classes = useStyles(props);
    return (
        <div onClick={props.disLike} >
            <IconButton
                aria-label="dislike">
                <FavoriteIcon className={classes.disLikeBtn}></FavoriteIcon>
            </IconButton>
        </div>
    )
}

