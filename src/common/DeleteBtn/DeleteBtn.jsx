import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import s from "../../components/Profile/Photos/Photo.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import {useDispatch, useSelector} from "react-redux";
import {setOpenModalAC} from "../../Redux/Reducer/photo-reducer";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => (
    {
        root:{
            display: props => props.display===true?'flex':'none',
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }
))

const DeleteBtn = (props) =>{
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const openModal = useSelector(state => state.uploadPhotoReducer.openModal)
    const [openModal2,setModalOpen]=useState(false)
    useEffect(() => {
        setModalOpen(openModal)
    }, [openModal]);
    const handleOpen = () => {
        setModalOpen(true)
    };
    const handleClose = () => {
        setModalOpen(false)}

    return (
        <div onClick={()=>{handleOpen()}}>
            <IconButton color='#de2694'
                        aria-label="delete" className={s.deleteBtn}>
                <DeleteIcon/>
            </IconButton>
            <Modal
                open={openModal2}
                onClose={() => handleClose()}
                className={classes.modal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    <Button variant="contained" color="secondary" onClick={() => handleClose()}>
                       NO
                    </Button>
                    <Button variant="contained" color="primary" onClick={props.deleteItem}
                            >
                       YES
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default DeleteBtn
