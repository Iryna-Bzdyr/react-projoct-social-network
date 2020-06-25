import React, {useEffect, useState} from "react";
import s from './ProfileInfo.module.css'
import Status from "./Status/Status";
import StatusWithHooks from "./Status/StatusWithHooks";
import PreLoader from "../../../common/PreLoader/PreLoader";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({

    bigAvatar: {
        margin: 10,
        width: 200,
        height: 200,
    },
});
const ProfileInfo = (props) => {
    const classes = useStyles();
    let [id, setUserID] = useState('')
    const currentUserData = useSelector(state => state.usersPage.currentUserData)
    useEffect(() => {
        setUserID(props.currentUserId)
    })

    if (!id) {
        return <PreLoader></PreLoader>
    } else {
        return (
            <div>
                <div className={s.wrapper}>
                    <div className={s.background}>
                        <img src='https://i.pinimg.com/originals/a0/6d/06/a06d06c67ecb1edfeb40c5fa2995f318.jpg'/>
                        <div className={s.profile__info}>
                            <Grid container justify="center" alignItems="center">
                                <Avatar aria-label="recipe"
                                        src={currentUserData[0].avatar.url}
                                        className={classes.bigAvatar}
                                >
                                </Avatar>
                            </Grid>

                            <div>
                                <h4>
                                    {currentUserData[0].fullName.firstName} {currentUserData[0].fullName.lastName}
                                </h4>
                            </div>
                            <div>
                                <span>{currentUserData[0].location.city}</span>
                                <span>{currentUserData[0].location.country}</span>
                            </div>
                            {/*<StatusWithHooks userStatus={props.userStatus} updateStatus={props.updateStatus} currentID={props.userData[0].id}/>*/}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default ProfileInfo
