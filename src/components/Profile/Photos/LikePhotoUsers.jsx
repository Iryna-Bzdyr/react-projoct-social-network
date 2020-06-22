import React, {useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import {useDispatch} from "react-redux";
import { photoLikesUserData} from "../../../Redux/Reducer/profile-reducer";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        position:'absolute',
        left:'65px',
        bottom:'15px',
        '& > *': {
            padding:'0px'
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

const LikePhotoUsers = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [usersData, setUsersData] = useState([])

    useEffect(() => {
        setUsersData(dispatch(photoLikesUserData(props.id,props.photoID)))
    }, [props.photoLikes])

    let avatarUnit = usersData.map(u => (
        <Avatar src={u.avatar.url} className={classes.small}></Avatar>
    ))

    return (
        usersData.length>0?<AvatarGroup max={4} className={classes.root}>
            {avatarUnit}
        </AvatarGroup>:<></>
    )
}
export default LikePhotoUsers
