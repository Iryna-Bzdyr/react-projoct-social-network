import React, {useEffect, useState} from "react";
import s from './../../Users/Users.module.css'
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getCurrentFollowers, getCurrentFollowerUsersData} from "../../../Redux/Reducer/user-reducer";
import Avatar from "@material-ui/core/Avatar";
import FollowBtn from "../../Users/FollowBtn";
import EmailIcon from "@material-ui/icons/Email";
import IconButton from "@material-ui/core/IconButton";
import {setDialogUserIDAC} from "../../../Redux/Reducer/dialogs-reducer";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles({

    bigAvatar: {
        margin: 10,
        width: 80,
        height: 80,
    },
});



let Friends = (props) => {
    const classes = useStyles();
    let history = useHistory();
    let paramsData = useParams();
    const dispatch = useDispatch();
    const authUserID = useSelector(state => state.usersPage.currentUserId)
    const currentFollowUsers = useSelector(state => state.usersPage.currentFollowUsers)
    const currentFollowerUserData = useSelector(state => state.usersPage.currentFollowerUserData)
    let [id, setUserID] = useState('')


    useEffect(() => {
        if (!paramsData.userID) {
            setUserID(authUserID)
        } else {
            setUserID(+paramsData.userID)
        }
        if (id) {
            dispatch(getCurrentFollowers(id))
            dispatch(getCurrentFollowerUsersData(currentFollowUsers))
        }

    }, [currentFollowUsers.length, paramsData.userID, id])

    let onMessageClick = (id) => {
        dispatch(setDialogUserIDAC(id))
        history.push("/dialogs");
    }

    return (
        <div className={s.friends__wrapper}>
            <Container maxWidth="md" className={s.card__wrapper}>
                {
                    currentFollowerUserData.map(u =>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Paper elevation={3} className={s.user__card}>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <div className={s.user__avatar}>
                                                <NavLink to={`/profile/${u.id}/Photo`}>
                                                    <Grid container justify="center" alignItems="center">
                                                        <Avatar aria-label="recipe"
                                                                src={u.avatar.url}
                                                                className={classes.bigAvatar}
                                                        >
                                                        </Avatar>
                                                    </Grid>

                                                </NavLink>
                                                <div>
                                                    {authUserID===id?<FollowBtn id={u.id} authUserID={authUserID}></FollowBtn>:<></>}
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <div className={s.name}>
                                                <h3>{u.fullName.firstName} {u.fullName.lastName}</h3>
                                            </div>
                                            <div className={s.locotion}>
                                                <p>{u.location.city}, {u.location.country}</p>
                                            </div>
                                            <div className={s.status}>
                                                <p>{u.status}</p>
                                            </div>
                                            <div className={s.message__btn}>
                                                {authUserID===id?<IconButton color="primary" onClick={()=>onMessageClick(u.id)}>
                                                    <EmailIcon />
                                                </IconButton>:<></>}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                        </Grid>
                    )
                }
            </Container>
        </div>
    )
}

export default Friends
