import React, {useEffect} from "react";
import s from "./Dialogs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getFollowerUsersData} from "../../Redux/Reducer/user-reducer";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    list: {
        margin: '10px 0px'
    },
}));


const SetDialogsUser = (props) => {
    const classes = useStyles();
    const followUsers = useSelector(state => state.usersPage.followUsers)
    const dispatch = useDispatch();
    const friendsData = useSelector(state => state.usersPage.followerUserData)
    const { onClose, selectedValue, open } = props;
    const [scroll, setScroll] = React.useState('paper');

    useEffect(() => {
        dispatch(getFollowerUsersData(followUsers))
    }, [followUsers.length])


    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
    <Dialog onClose={handleClose}  open={open}
            aria-labelledby="scroll-dialog-title"
            fullWidth={true}
            scroll="paper"
            maxWidth="sm"
    >
        <DialogTitle  id="scroll-dialog-title" >Set backup account</DialogTitle>
        <List scroll="paper"  className={classes.list}>
            {
                friendsData.map(data=>(
                    <ListItem button
                              // onClick={() => handleListItemClick(email)}
                    >
                        <ListItemAvatar>
                            <Avatar src={data.avatar.url}></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`${data.fullName.firstName}   ${data.fullName.lastName}`}/>
                    </ListItem>
                ))
            }
        </List>
    </Dialog>
    )
}


const Dialogs = (props) =>{
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        // setSelectedValue(value);
    };
    return (
        <div>
            <Typography variant="subtitle1">
                {/*Selected: {selectedValue}*/}
            </Typography>
            <br />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open simple dialog
            </Button>
            <SetDialogsUser
                // selectedValue={selectedValue}
                open={open} onClose={handleClose} />
        </div>
    );
}


export default Dialogs