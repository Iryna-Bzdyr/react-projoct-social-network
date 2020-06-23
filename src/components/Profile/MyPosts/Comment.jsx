import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserAvatar, setCurrentUserMainData} from "../../../Redux/Reducer/user-reducer";
import Typography from "@material-ui/core/Typography";
import s from './MyPosts.module.css'
import Avatar from "@material-ui/core/Avatar";
import {userAPI} from "../../../firebase";
import CardHeader from "@material-ui/core/CardHeader";

const Comment =(props)=>{
    let [id, setUserID] = useState('')
    const dispatch = useDispatch();
    let [avatar, setAvatar] = useState('')


    useEffect(() => {
        setUserID(props.commentUserId)
        if(id){
            dispatch(setAvatar(dispatch(getUserAvatar(id))))
        }
    },[id])

    return(
        <div>
            <Typography variant="body2" color="textSecondary" component="p" className={s.comment__block}>
                <div className={s.comment__user__info}>
                    {/*<CardHeader*/}
                    {/*    avatar={*/}
                    {/*        <Avatar aria-label="recipe" className={s.avatar} src={currentUserData[0].avatar.url}>*/}
                    {/*        </Avatar>*/}
                    {/*    }></CardHeader>*/}
                    <img src={avatar} alt=""/>
                    {/*<div className={s.comment__user__name}>*/}
                    {/*    <span>{currentUserData[0].fullName.firstName}</span>{currentUserData[0].fullName.lastName}<span></span>*/}
                    {/*</div>*/}
                </div>
                {/*{comment.comment}*/}
            </Typography>
        </div>
    )
}
export default Comment