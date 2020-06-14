import React, {useEffect, useState} from "react";
import s from './Photo.module.css'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {AutoRotatingCarousel, Slide} from 'material-auto-rotating-carousel'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {addNewPhotoThunk, setUserPhotoThunk} from "../../../Redux/Reducer/profile-reducer";
import UploadPhoto from "../../../common/UploadPhoto/UploadPhoto";
import {setOpenModalAC} from "../../../Redux/Reducer/photo-reducer";


let Photo = (props) => {
    let paramsData = useParams();
    const [id, setID] = useState(+paramsData.userID)
    const authUserID = useSelector(state => state.auth.userID)
    const [sliderIsOpen, setSliderIsOpen] = useState(false)
    const [sliderAutoplay, setSliderAutoplay] = useState(false)
    const dispatch = useDispatch();
    const photoData = useSelector(state => state.profilePage.photoData)
    const [changePhotoBlock, setChangePhotoBlock] = useState(false)
    const uploadFile = useSelector(state => state.uploadPhotoReducer.upLoadFile)

    useEffect(() => {
        setID(+paramsData.userID)
        dispatch(setUserPhotoThunk(id))
        if (authUserID == id) {
            setChangePhotoBlock(true)
        }
    }, [paramsData.userID])

    const openSlider = () => {
        setSliderIsOpen(true)
    }
    const closeSlider = () => {
        setSliderIsOpen(false)
    }
    const addPhoto = () => {
        dispatch(setOpenModalAC(false));
        dispatch(addNewPhotoThunk(id,uploadFile))
    }

    return (
        <>
            <div className={s.changePhotoBlock}>
                <UploadPhoto display={changePhotoBlock} label='Add photo' changePhoto={addPhoto} />
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
                <GridList className={s.gridList} cols={4}>
                    {photoData.map((photo) => (
                        <GridListTile key={photo.id} cols={photo.rows || 2}>
                            <img src={photo.url} onClick={openSlider}/>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </>
    )
}
export default Photo
