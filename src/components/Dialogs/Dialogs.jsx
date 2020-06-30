import React, {useEffect, useState} from "react";
import s from "./Dialogs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getFollowerUsersData} from "../../Redux/Reducer/user-reducer";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {getDialogsData, getDialogsUserData, setDialogUserIDAC} from "../../Redux/Reducer/dialogs-reducer";
import Grid from "@material-ui/core/Grid";
import DialogWindow from "./DialogItem/DialogWindow";
import DialogItem from "./DialogItem/DialogItem";
import PreLoader from "../../common/PreLoader/PreLoader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));


const Dialogs = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const followUsers = useSelector(state => state.usersPage.followUsers)
    const friendsData = useSelector(state => state.usersPage.followerUserData)
    const dialogUserID = useSelector(state => state.messagesPage.dialogUserID)
    const DialogsUserData = useSelector(state => state.messagesPage.DialogsUserData)
    const authUserID = useSelector(state => state.usersPage.currentUserId)
    const messagesData = useSelector(state => state.messagesPage.MassagesData)
    const [spinner, setSpinner] = useState(true);
    const DialogsData = useSelector(state => state.messagesPage.DialogsData)

    useEffect(() => {
        dispatch(getFollowerUsersData(followUsers))
        dispatch(getDialogsUserData(authUserID))
      // if(DialogsUserData.length>0){
      //     DialogsUserData.forEach(d=>dispatch(getDialogsData(authUserID,d.dialogUserID,DialogsData)))
      // }
        setTimeout(() => setSpinner(false), 1000)
    }, [followUsers.length, dialogUserID, DialogsUserData.length, messagesData.length])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const setDialogUserId = (id) => {
        dispatch(setDialogUserIDAC(id))
        handleClose()
    }
    return (
        spinner ? <PreLoader></PreLoader> :
        <div className={s.container}>
            <div  className={s.dialog__left__pane}>

                <div className={s.dialog__header}>
                    <IconButton aria-describedby={id} onClick={handleClick}>
                        <PeopleAltIcon></PeopleAltIcon>
                    </IconButton>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Typography className={classes.typography}>
                            <div className={s.wrapper}>
                                {
                                    friendsData.map(data => (
                                        <ListItem button
                                                  onClick={() => setDialogUserId(data.id)}
                                        >
                                            <ListItemAvatar>
                                                <Avatar src={data.avatar.url}></Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={`${data.fullName.firstName}   ${data.fullName.lastName}`}/>
                                        </ListItem>
                                    ))
                                }
                            </div>
                        </Typography>
                    </Popover>
                </div>
                <div className={s.dialog__users__wrapper}>
                    {DialogsUserData.map(d=>(<DialogItem dialogUserID={d.userID} >
                    </DialogItem>))}
                </div>
            </div>
            <div  className={s.dialog__right__pane}>
                <DialogWindow></DialogWindow>
            </div>
        </div>

    );
}


export default compose(
    withAuthRedirect
)(Dialogs)
