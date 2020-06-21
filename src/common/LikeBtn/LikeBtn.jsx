import React from "react";
import IconButton from "@material-ui/core/IconButton";

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
                aria-label="delete">
               <i className={classes.disLikeBtn}>
                   <AiOutlineHeart/>
               </i>
            </IconButton>
        </div>
    )
}

export const DisLikeBtn = (props) => {
    const classes = useStyles(props);
    return (
        <div onClick={props.disLike} >
            <IconButton
                aria-label="delete">
                <i className={classes.disLikeBtn}>
                    <AiFillHeart/>
                </i>
            </IconButton>
        </div>
    )
}

