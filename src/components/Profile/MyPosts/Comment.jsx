import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getUserAvatar,
    getUserFirstName,
    getUserLastName,
    setCurrentUserMainData
} from "../../../Redux/Reducer/user-reducer";
import Typography from "@material-ui/core/Typography";
import s from './MyPosts.module.css'
import Avatar from "@material-ui/core/Avatar";
import {userAPI} from "../../../firebase";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const Comment = (props) => {
    let [id, setUserID] = useState('')
    const dispatch = useDispatch();
    let [avatar, setAvatar] = useState('')
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')

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
                </CardContent>
            </Card>
        </div>
    )
}
export default Comment
