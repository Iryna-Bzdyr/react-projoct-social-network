import React from "react";
import s from './SearchBar.module.css'
import {useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from '@material-ui/icons/Restore';
import CommentIcon from '@material-ui/icons/Comment';
import GroupIcon from '@material-ui/icons/Group';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import {useSelector} from "react-redux";
const useStyles = makeStyles({
    root: {
        width: '100%',
        "&$selected": {
            color: "red"
        }
    },
});

export default function SearchBarNavigation(props) {
    const classes = useStyles();
    let history = useHistory();
    const [value, setValue] = React.useState('Photo');
    const authUserID = useSelector(state => state.usersPage.currentUserId)

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                history.push(`/profile/${props.currentUserId}/${newValue}`);
            }}
            showLabels
            className={classes.root}
        >
            {authUserID===props.currentUserId?<BottomNavigationAction  label="Activity" value='Activity'  icon={<RestoreIcon />}>
            </BottomNavigationAction>:<></>}
            <BottomNavigationAction label="Posts" value='MyPost'   icon={<CommentIcon />}>
            </BottomNavigationAction>
            <BottomNavigationAction label="Friends" value='Friends'  icon={<GroupIcon />}>
            </BottomNavigationAction>
            <BottomNavigationAction label="Photo" value='Photo'  icon={<PhotoLibraryIcon />}>
            </BottomNavigationAction>
        </BottomNavigation>
    );
}

