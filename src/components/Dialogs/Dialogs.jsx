import React, {useEffect} from "react";
import s from "./Dialogs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getFollowerUsersData} from "../../Redux/Reducer/user-reducer";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {setDialogUserIDAC} from "../../Redux/Reducer/dialogs-reducer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DialogWindow from "./DialogItem/DialogWindow";


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));



const Dialogs = (props) =>{
    const dispatch = useDispatch();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const followUsers = useSelector(state => state.usersPage.followUsers)
    const friendsData = useSelector(state => state.usersPage.followerUserData)
    const dialogUserID = useSelector(state => state.messagesPage.dialogUserID)

    useEffect(() => {
        dispatch(getFollowerUsersData(followUsers))
    }, [followUsers.length, dialogUserID])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const setDialogUserId = (id)=>{
        dispatch(setDialogUserIDAC(id))
    }
    return (
        <Grid container spacing={0}>
            <Grid item xs={3}>

                        <div className={s.dialog__header}>
                            <IconButton aria-describedby={id}  onClick={handleClick}>
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
                                            friendsData.map(data=>(
                                                <ListItem button
                                                          onClick={() => setDialogUserId(data.id)}
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar src={data.avatar.url}></Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={`${data.fullName.firstName}   ${data.fullName.lastName}`}/>
                                                </ListItem>
                                            ))
                                        }
                                    </div>
                                </Typography>
                            </Popover>
                        </div>
            </Grid>
            <Grid item xs={9}>
                    <DialogWindow></DialogWindow>
            </Grid>
        </Grid>

    );
}


export default Dialogs
