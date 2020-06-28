import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import s from './EmojiWindow.module.css'
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function EmojiWindow(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [emojiData, setEmojiData] = React.useState([]);
    const [startPoint, setStartPoint] = React.useState(0);
    const [endPoint, setEndPoint] = React.useState(99);

    useEffect(() => {
        setEmojiData(require('emoji.json/emoji-compact.json').slice(startPoint,endPoint))
        // emojiData.slice(startPoint,endPoint)
    }, [emojiData.length, startPoint,endPoint])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setStartPoint(0)
        setEndPoint(99)
    };

    const handleClose = () => {
        setAnchorEl(null);
        setStartPoint(0)
        setEndPoint(99)

    };

    const next = () => {
        setStartPoint(startPoint+100)
        setEndPoint(endPoint+100)
    };
    const prev = () => {
        setStartPoint(startPoint-100)
        setEndPoint(endPoint-100)
    };
const getEmoji=(string,emoji,action)=>{
    dispatch(action(string+emoji))
}

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton aria-describedby={id} color="primary" onClick={handleClick}>
                <SentimentVerySatisfiedIcon></SentimentVerySatisfiedIcon>
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
                <div className={s.button__block}>
                    <IconButton  color="primary" disabled={!startPoint} onClick={()=>prev()}>
                        <ArrowBackIosIcon fontSize="small"></ArrowBackIosIcon>
                    </IconButton>
                    <IconButton  color="primary" onClick={()=>next()}>
                        <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                    </IconButton>
                </div>
                <Typography className={classes.typography}>
                   <div className={s.wrapper}>
,                       {emojiData.map((emoji) => <span className={s.emojiIcon} onClick={()=>getEmoji(props.value,emoji,props.action)}>{emoji}</span>)}
                   </div>
                </Typography>
            </Popover>
        </div>
    );
}
