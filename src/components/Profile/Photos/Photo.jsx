import React, {useEffect, useState} from "react";
import s from './Photo.module.css'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {AutoRotatingCarousel, Slide} from 'material-auto-rotating-carousel'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {
    addNewPhotoThunk,
    deleteCurrentUserPhoto,
    setUserPhotoThunk
} from "../../../Redux/Reducer/profile-reducer";
import UploadPhoto from "../../../common/UploadPhoto/UploadPhoto";
import {setOpenModalAC} from "../../../Redux/Reducer/photo-reducer";
import PreLoader from "../../../common/PreLoader/PreLoader";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import GridListTileBar from "@material-ui/core/GridListTileBar";
import {makeStyles} from '@material-ui/core';
import DeleteBtn from "../../../common/DeleteBtn/DeleteBtn";
import {setDeleteModalAC} from "../../../Redux/Reducer/process-reducer";

const useStyles = makeStyles((theme) => (
    {
        gridList:{
            width: '70%'
        },
        gridListTileBar: {
            backgroundColor: '#e6d2d1',
            opacity: 0.8
        },
    }
))

let Photo = (props) => {
    const classes = useStyles(props);
    let paramsData = useParams();
    let [id, setUserID] = useState('')
    const authUserID = useSelector(state => state.usersPage.currentUserId)
    const [sliderIsOpen, setSliderIsOpen] = useState(false)
    const [sliderAutoplay, setSliderAutoplay] = useState(false)
    const dispatch = useDispatch();
    const photoData = useSelector(state => state.profilePage.photoData)
    const [changePhotoBlock, setChangePhotoBlock] = useState(false)
    const uploadFile = useSelector(state => state.uploadPhotoReducer.upLoadFile)
    const [spinner, setSpinner] = useState(true);
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);

    useEffect(() => {
        if (!paramsData.userID) {
            setUserID(authUserID)
        } else {
            setUserID(+paramsData.userID)
        }
        if (id) {
            dispatch(setUserPhotoThunk(id))

            if (authUserID == id) {
                setChangePhotoBlock(true)
                setShowDeleteBtn(true)
            }
        }
        setTimeout(() => setSpinner(false), 1000)
    }, [id,setShowDeleteBtn])

    const openSlider = () => {
        setSliderIsOpen(true)
    }
    const closeSlider = () => {
        setSliderIsOpen(false)
    }

    const addPhoto = () => {
        dispatch(setOpenModalAC(false));
        dispatch(addNewPhotoThunk(id, uploadFile))
        dispatch(setUserPhotoThunk(id))
    }
    const deletePhoto = (userId,photoId,url)=>{
        dispatch(deleteCurrentUserPhoto(userId,photoId,url))
        dispatch(setUserPhotoThunk(id))
        dispatch(setDeleteModalAC(false))
    }
const deleteBtn = (userId,photoId,url)=>{
    return(
        showDeleteBtn? <DeleteBtn deleteItem={()=>{deletePhoto(userId,photoId,url)}} label='Do you want to delete this photo'></DeleteBtn>:<></>
    )
}

    return (
        spinner ? <PreLoader></PreLoader> :
            <>
                <div className={s.changePhotoBlock}>
                    <UploadPhoto display={changePhotoBlock} label='Add photo' changePhoto={addPhoto}/>
                </div>
                <AutoRotatingCarousel
                    label="Close"
                    open={sliderIsOpen}
                    autoplay={sliderAutoplay}
                    onClose={closeSlider}
                    onStart={closeSlider}
                    style={{position: 'absolute', height: 450}}
                >
                    {photoData.map((photo) => (
                        <Slide
                            media={<img src={photo.url} className={s.slider__photo}/>}
                            mediaBackgroundStyle={{height: 450}}
                            style={{height: 450}}
                        >

                        </Slide>))}
                </AutoRotatingCarousel>

                <div className={s.root}>
                    <GridList cols={4} cellHeight={280} className={classes.gridList}>
                        {photoData.map((photo) => (
                            <GridListTile key={photo.id} cols={photo.rows || 2} >
                                <img src={photo.url} onClick={openSlider} lassName={s.img}/>
                                <GridListTileBar className={classes.gridListTileBar}
                                                 actionIcon={
                                                    <div>
                                                        {deleteBtn(authUserID,photo.id,photo.url)}
                                                    </div>
                                                 }
                                />

                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </>
    )
}
export default Photo
