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
    const [expanded, setExpanded] = React.useState(false);

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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    // const handleChange = (panel) => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // };
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
                                <ShareIcon/>
                            </IconButton>
                            <IconButton
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show comment"
                            >
                                <CommentIcon/>
                            </IconButton>
                            {authUserID === id ?
                                <IconButton
                                    onClick={() => deletePost(authUserID, post.id, post.url)}
                                    aria-label="delete post"
                                >
                                    <DeleteIcon/>
                                </IconButton>
                                : <></>}
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>
                                    <TextField
                                        className={s.textArea}
                                        multiline
                                        rows={2}
                                        placeholder='Write new comment'
                                        variant="outlined"
                                        // onChange={onPostChange}
                                        // value={newPostText}
                                    />
                                </Typography>
                                <Typography paragraph>
                                    <IconButton
                                        // onClick={() => deletePost(authUserID, post.id, post.url)}
                                        aria-label="add comment"
                                    >
                                        <PostAddIcon/>
                                    </IconButton>
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                                    chicken
                                    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                                    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                                    cook
                                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce
                                    heat to
                                    medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
                                    cook
                                    again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don’t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>

                ))}
            </div>
        </div>
    )
}


export default MyPosts
