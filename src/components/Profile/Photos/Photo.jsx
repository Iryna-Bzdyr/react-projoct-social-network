import React, {useEffect, useState} from "react";
import s from './Photo.module.css'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {AutoRotatingCarousel, Slide} from 'material-auto-rotating-carousel'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {
    addNewPhotoThunk,
    deleteCurrentUserPhoto, setPhotoDataAC,
    setUserPhotoThunk
} from "../../../Redux/Reducer/profile-reducer";
import UploadPhoto from "../../../common/UploadPhoto/UploadPhoto";
import PreLoader from "../../../common/PreLoader/PreLoader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import {makeStyles} from '@material-ui/core';
import DeleteBtn from "../../../common/DeleteBtn/DeleteBtn";
import PhotoLikeBtn from "./PhotoLikeBtn";
import LikePhotoUsers from "./LikePhotoUsers";
import *as AOS from "aos";
import "aos/dist/aos.css";
import PhotoDeleteBtn from "./PhotoDeleteBtn";

const useStyles = makeStyles((theme) => (
    {
        gridList: {
            width: '70%'
        },
        gridListTileBar: {
            backgroundColor: '#bdbfbd',
            opacity: 0.8,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin:'0px',
            padding:'0px'
        },
        titleBlock: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        gridPhoto:{
            height: '100%'
        }
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

        AOS.init();
        AOS.refresh();
        setTimeout(() => setSpinner(false), 1000)
    }, [ id])

    const openSlider = () => {
        setSliderIsOpen(true)
    }
    const closeSlider = () => {
        setSliderIsOpen(false)
    }
    const addPhoto = () => {
        dispatch(addNewPhotoThunk(id, uploadFile))
    }
    const deletePhoto = (userId, photoId, url) => {

        dispatch(deleteCurrentUserPhoto(userId, photoId, url))
        console.log(photoId)
    }

    const deleteBtn = (userId, photoId, url) => {
        return (
            showDeleteBtn ? <DeleteBtn deleteItem={
                deletePhoto(userId, photoId, url)
            } label='Do you want to delete this photo'></DeleteBtn> : <></>
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
                    <GridList cols={4} cellHeight={250} className={classes.gridList}>
                        {photoData.map((photo,index) => (
                            <GridListTile key={photo.id} cols={photo.rows || 2} >
                                <img className={classes.gridPhoto} src={photo.url} onClick={openSlider} lassName={s.img}/>
                                <GridListTileBar className={classes.gridListTileBar}
                                                 title={

                                                     <PhotoLikeBtn id={id} photoID={photo.id} photoLikes={photo.likes} authUserID={authUserID}/>

                                                 }
                                                 subtitle={<LikePhotoUsers photoID={photo.id} id={id} photoLikes={photo.likes}></LikePhotoUsers>}
                                                 actionIcon={
                                                     // <button onClick={()=>deletePhoto(authUserID,photo.id,photo.url)}>DELETE</button>
                                                     <PhotoDeleteBtn authUserID={authUserID}
                                                                     currentUserID={id}
                                                                     photoID={photo.id}
                                                                     photoUrl={photo.url}
                                                     ></PhotoDeleteBtn>

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
