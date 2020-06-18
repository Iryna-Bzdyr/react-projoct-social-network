import React, {useEffect, useState} from "react";
import s from './Photo.module.css'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {AutoRotatingCarousel, Slide} from 'material-auto-rotating-carousel'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {addNewPhotoThunk, setProfileDataAC, setUserPhotoThunk} from "../../../Redux/Reducer/profile-reducer";
import UploadPhoto from "../../../common/UploadPhoto/UploadPhoto";
import {setOpenModalAC} from "../../../Redux/Reducer/photo-reducer";
import PreLoader from "../../../common/PreLoader/PreLoader";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import GridListTileBar from "@material-ui/core/GridListTileBar";


let Photo = (props) => {
    let paramsData = useParams();
    let [id, setUserID] = useState('')
    const authUserID = useSelector(state => state.usersPage.currentUserId)
    const [sliderIsOpen, setSliderIsOpen] = useState(false)
    const [sliderAutoplay, setSliderAutoplay] = useState(false)
    const dispatch = useDispatch();
    const photoData = useSelector(state => state.profilePage.photoData)
    const [changePhotoBlock, setChangePhotoBlock] = useState(false)
    const uploadFile = useSelector(state => state.uploadPhotoReducer.upLoadFile)

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
            }
        }

    }, [id])

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

    return (
        !id ? <PreLoader></PreLoader> :
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
                    <GridList className={s.gridList} cols={4} cellHeight={350}>
                        {photoData.map((photo) => (
                            <GridListTile key={photo.id} cols={photo.rows || 2} >
                                <img src={photo.url} onClick={openSlider} lassName={s.img}/>
                                <GridListTileBar
                                    actionIcon={
                                        <IconButton
                                            aria-label="delete"  className={s.deleteBtn}>
                                            <DeleteIcon/>
                                        </IconButton>
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
