import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from "@material-ui/core/Paper";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteUploadPhoto, setFileRefAC,
    setOpenModalAC,
    setProgressAC,
    setUpLoadFileAC,
    uploadPhoto
} from "../../Redux/Reducer/photo-reducer";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import {PhotoCamera} from "@material-ui/icons";
import SaveIcon from '@material-ui/icons/Save';
import {addNewPostThunk, upDateNewPostTextActionCreator} from "../../Redux/Reducer/profile-reducer";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '2% 15%'
    },
    paper: {
        padding: '1% 3%',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: '5px 20px'

    },
    textArea: {
        width: '100%',
        borderRadius: 5,
        boxShadow: '0 3px 5px 2px #bbc0c7',
    },
    panel: {
        backgroundColor: 'white'
    },
    panelSummary: {
        backgroundColor: '#f9fbfe'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        padding: '4% 3%',
    },
    column: {
        flexBasis: '30%',
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        width: '100%',
    },
    inputArea: {
        display: 'none'
    },
    imageBlock: {
        height: 180,
        width: '100%',
        padding: '0px 60px'
    },

    img: {
        width: 180,
        height: 150,
        border: 0,
        borderRadius: 5,
        margin: '10px 50px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    progress: {
        height: 6,
        borderRadius: 5,
        margin: '10px 0px'
    }
}));

const PostBlock = (props) => {
    const classes = useStyles();
    const uploadFile = useSelector(state => state.uploadPhotoReducer.upLoadFile)
    const dispatch = useDispatch();
    const fileRef = useSelector(state => state.uploadPhotoReducer.fileRef)
    const progress = useSelector(state => state.uploadPhotoReducer.progress)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [buffer, setBuffer] = React.useState(10);
    const newPostText = useSelector(state => state.profilePage.newPostText)
    const [expanded, setExpanded] = React.useState(false);


    useEffect(() => {
        setUploadProgress(progress)
    }, [progress, newPostText]);

    const onPostChange = (e) => {
        dispatch(upDateNewPostTextActionCreator(e.target.value))
    };

    const getFile = (e) => {
        dispatch(uploadPhoto(e))
    }

    const deletePhoto = (photo) => {
        if (photo) {
            dispatch(deleteUploadPhoto(photo))
            document.getElementById('postPhoto').value = ''
            dispatch(setOpenModalAC(false));
            dispatch(setProgressAC(0))
            setBuffer(10)
            dispatch(setUpLoadFileAC(''))
            dispatch(setFileRefAC(''))
            setExpanded(false)
        }
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const uploadForm = (
        <Fab htmlFor="postPhoto" size="small" color="secondary" component="label" type={'submit'}
             aria-label="add"><AddIcon/></Fab>
    )

    let addNewPost = (authUserID) => {
        dispatch(addNewPostThunk(authUserID, uploadFile, newPostText))
        setExpanded(false)
        dispatch(upDateNewPostTextActionCreator(''))
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <TextField
                            className={classes.textArea}
                            multiline
                            rows={2}
                            placeholder={props.label}
                            variant="outlined"
                            onChange={onPostChange}
                            value={newPostText}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon/>}
                            disabled={!newPostText}
                            onClick={() => addNewPost(props.userID)}
                        >
                            Save
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <ExpansionPanel className={classes.panel} expanded={expanded === 'panel1'}
                            onChange={handleChange('panel1')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                    className={classes.panelSummary}
                >

                    <div className={classes.column}>
                        <Typography className={classes.heading}>
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera/>
                            </IconButton>
                        </Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>
                            Add photo to your post
                        </Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <div>
                        <form id='uploadForm'>
                            <input type="file" id="postPhoto" className={classes.inputArea}
                                   accept="image/x-png,image/gif,image/jpeg" onChange={getFile}
                            />
                            {uploadForm}
                        </form>
                    </div>
                    <div className={classes.imageBlock}>
                        <LinearProgress className={classes.progress} variant="buffer" value={uploadProgress}
                                        color="secondary"
                                        valueBuffer={buffer}/>
                        <img src={uploadFile} alt="" className={classes.img}/>
                    </div>
                </ExpansionPanelDetails>

                <Divider/>
                <ExpansionPanelActions>
                    <Button size="small" onClick={() => deletePhoto(fileRef)}
                            disabled={uploadProgress < 100}>Cancel</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        </div>
    );
}

export default PostBlock
