import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {useDispatch, useSelector} from "react-redux";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import  {setDeleteModalAC} from "../../Redux/Reducer/process-reducer";

const useStyles = makeStyles((theme) => (
    {
        root: {
            alignItems: 'center',
        },
        modal: {
            opacity:0.4,
            display: 'flex',
            padding: theme.spacing(1),
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },

        btnBlock: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0px 60px'
        },
    }
))

const DeleteBtn = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles(props);
    const modalStage = useSelector(state => state.processReducer.deleteModalStage)
    const [openModal, setModalOpen] = useState(false)

    useEffect(() => {
        setModalOpen(modalStage)
    }, [modalStage]);

    const handleOpen = () => {
        dispatch(setDeleteModalAC(true))
        console.log(openModal)
    };
    const handleClose = () => {
        dispatch(setDeleteModalAC(false))
        console.log(openModal)
    }
const body =(
    <div className={classes.paper}>

        <div>
            <h3>{props.label}</h3>
        </div>
        <div className={classes.btnBlock}>
            <Button variant="contained" color="secondary" onClick={() => {
                handleClose()
            }}>
                NO
            </Button>
            <Button variant="contained" color="primary" onClick={()=>props.deleteItem}
            >
                YES
            </Button>
        </div>

    </div>
)
    return (
        <div className={classes.root}>
            <div onClick={() => {
                handleOpen()
            }}>
                <IconButton color='#de2694'
                            aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </div>

            <div>
                <Modal className={classes.modal}
                       open={openModal}
                       onClose={() => {
                           handleClose()
                       }}
                       aria-labelledby="simple-modal-title"
                       aria-describedby="simple-modal-description"

                >
                    {body}
                </Modal>
            </div>
        </div>
    )
}

export default DeleteBtn
