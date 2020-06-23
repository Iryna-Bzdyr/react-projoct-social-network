import React, {useEffect, useState} from 'react'
import s from './MyPosts.module.css'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import PostBlock from "../../../common/PostBlock/PostBlock";
import {
    deleteCurrentUserPost,
    setUserPostThunk
} from "../../../Redux/Reducer/profile-reducer";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import {setCurrentUserMainData} from "../../../Redux/Reducer/user-reducer";
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import PostLikeBtn from "./PostLikeBtn";
import PreLoader from "../../../common/PreLoader/PreLoader";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CommentsBlock from "./CommentsBlock";



const useStyles = makeStyles((theme) => ({

    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

}));

const MyPosts = (props) => {
    let paramsData = useParams();
    let [id, setUserID] = useState('')
    const authUserID = useSelector(state => state.usersPage.currentUserId)
    const dispatch = useDispatch();
    const postData = useSelector(state => state.profilePage.postData)
    const currentUserData = useSelector(state => state.usersPage.currentUserData)
    const [spinner, setSpinner] = useState(true);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(-1);

    useEffect(() => {
        if (!paramsData.userID) {
            setUserID(authUserID)
        } else {
            setUserID(+paramsData.userID)
        }
        if (id) {
            dispatch(setUserPostThunk(id))
            dispatch(setCurrentUserMainData(id))
        }
        setTimeout(() => setSpinner(false), 1000)
    }, [id])


    const handleExpandClick = i => {
        setExpanded(expanded === i ? -1 : i);
    };

    const deletePost = (authUserID, postID, url) => {
        dispatch(deleteCurrentUserPost(authUserID, postID, url))
        dispatch(setUserPostThunk(id))
    }

    return (
        spinner ? <PreLoader></PreLoader> :
        <div>
            {authUserID === id ? <PostBlock label={`What's new ${currentUserData[0].fullName.firstName}`}
                                            userID={authUserID}></PostBlock> : <></>}

            <div className={s.postBlock}>
                {postData.map((post, index) => (
                    <Card className={s.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={s.avatar} src={currentUserData[0].avatar.url}>
                                </Avatar>
                            }
                            title={<p>
                                <span>{currentUserData[0].fullName.firstName}</span>{currentUserData[0].fullName.lastName}<span></span>
                            </p>}
                            subheader={post.date}
                        />
                        {post.url ? <CardMedia
                                className={s.media}
                                image={post.url}
                            /> :
                            <></>
                        }

                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {post.post}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>

                            <PostLikeBtn className={s.like__block} id={id} postID={post.id} authUserID={authUserID}
                                         postLikes={post.likes}></PostLikeBtn>
                            <IconButton aria-label="share">
                                <ShareIcon className={s.share__btn}/>
                            </IconButton>
                            <IconButton

                                onClick={() => handleExpandClick(index)}
                                aria-expanded={expanded === index}
                                aria-label="show comment"
                            >
                                <CommentIcon className={s.comment__btn}/>
                            </IconButton>
                            {authUserID === id ?
                                <IconButton
                                    onClick={() => deletePost(authUserID, post.id, post.url)}
                                    aria-label="delete post"
                                >
                                    <DeleteIcon className={s.delete__btn}/>
                                </IconButton>
                                : <></>}
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={() => handleExpandClick(index)}
                                aria-expanded={expanded === index}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                            <CardContent>

                               <CommentsBlock id={id} postId={post.id} authUserID={authUserID}></CommentsBlock>

                            </CardContent>
                        </Collapse>
                    </Card>

                ))}
            </div>
        </div>
    )
}


export default MyPosts
