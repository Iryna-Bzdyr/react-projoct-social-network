import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core';
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {useDispatch, useSelector} from "react-redux";
import {
    deleteUploadPhoto, setFileRefAC,
    setOpenModalAC,
    setProgressAC,
    setUpLoadFileAC,
    uploadPhoto
} from "../../Redux/Reducer/photo-reducer";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => (
    {
        root: {
            backgroundColor: props => props.backgroundColor,
            height: props => !props.height ? '100%' : props.height,
            width: props => !props.width ? '100%' : props.width,
            display: props => props.display===true?'flex':'none',
            alignItems: 'center',
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        input: {
            display: 'none'
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid transparent',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonBlock: {
            display: 'flex',
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0px 60px'
        },
        imageBlock: {
            width: 550,
            height: 420,
        },

        img: {
            width: '100%',
            height: '95%',
            border: 0,
            borderRadius: 5,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        progress: {
            height: 6,
            borderRadius: 5,
            margin: '10px 0px'
        }
    }))


const UploadPhoto = (props) => {
    const classes = useStyles(props);
    const uploadFile = useSelector(state => state.uploadPhotoReducer.upLoadFile)
    const dispatch = useDispatch();
    const fileRef = useSelector(state => state.uploadPhotoReducer.fileRef)
    const progress = useSelector(state => state.uploadPhotoReducer.progress)
    const openModal = useSelector(state => state.uploadPhotoReducer.openModal)
    const [open,setModalOpen]=useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [buffer, setBuffer] = React.useState(10);

    useEffect(() => {
        setUploadProgress(progress)
        setModalOpen(openModal)
    }, [progress, openModal]);

    const handleOpen = () => {
        dispatch(setOpenModalAC(true));
        dispatch(setProgressAC(0))
    };

    const handleClose = (photo) => {
        dispatch(setOpenModalAC(false));
        dispatch(setProgressAC(0))
        setBuffer(10)
        if (photo) {
            dispatch(deleteUploadPhoto(photo))
            document.getElementById('photo').value = ''
        }
    };

    const getFile = (e) => {
        dispatch(uploadPhoto(e))
    }


    const deletePhoto = (photo) => {
        if (photo) {
            dispatch(deleteUploadPhoto(photo))
            document.getElementById('photo').value = ''
            dispatch(setOpenModalAC(false));
            dispatch(setProgressAC(0))
            setBuffer(10)
            dispatch(setUpLoadFileAC(''))
            dispatch(setFileRefAC(''))
        }
    }


    const uploadForm = (
        <Fab htmlFor="photo" size="medium" component="label" type={'submit'} color="primary"
             aria-label="add" onClick={() => handleOpen()}><AddIcon/></Fab>
    )

    const body = (
        <div className={classes.paper}>
            <div className={classes.buttonBlock}>
                <Button variant="contained" color="secondary" onClick={() => deletePhoto(fileRef)}
                        disabled={uploadProgress < 100} startIcon={<DeleteIcon />}>
                    Delete
                </Button>
                <Button variant="contained" color="primary" onClick={props.changePhoto}
                        disabled={uploadProgress < 100} endIcon={<SaveIcon />}>
                    {props.label}
                </Button>
            </div>
            <div className={classes.imageBlock}>

                <LinearProgress className={classes.progress} variant="buffer" value={uploadProgress} color="secondary"
                                valueBuffer={buffer}/>
                <img src={uploadFile} alt="" className={classes.img}/>
            </div>
        </div>
    );

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <form id='uploadForm'
                >
                    <input type="file" id="photo" className={classes.input} onChange={getFile}
                           accept="image/x-png,image/gif,image/jpeg"
                    />
                    {uploadForm}
                </form>

                <Modal
                    open={open}
                    onClose={() => handleClose(fileRef)}
                    className={classes.modal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </div>
        </div>
    )
}

export default UploadPhoto



