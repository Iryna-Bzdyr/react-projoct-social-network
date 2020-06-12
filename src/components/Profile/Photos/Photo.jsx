import React, {useEffect, useState} from "react";
import s from './Photo.module.css'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {AutoRotatingCarousel, Slide} from 'material-auto-rotating-carousel'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {setUserPhotoThunk} from "../../../Redux/Reducer/profile-reducer";


let Photo = (props) => {
    let paramsData = useParams();
    const [id, setID] = useState(+paramsData.userID)
    const [sliderIsOpen, setSliderIsOpen] = useState(false)
    const [sliderAutoplay, setSliderAutoplay] = useState(false)
    const dispatch = useDispatch();
    const photoData = useSelector(state => state.profilePage.photoData)

    useEffect(() => {
        setID(+paramsData.userID)
        dispatch(setUserPhotoThunk(id))
    }, [paramsData.userID])

    const openSlider = () => {
        setSliderIsOpen(true)
    }

    const closeSlider = () => {
        setSliderIsOpen(false)
    }

    return (
        <>
            <AutoRotatingCarousel
                label="Close"
                open={sliderIsOpen}
                autoplay={sliderAutoplay}
                onClose={closeSlider}
                onStart={closeSlider}
                style={{position: 'absolute'}}
            >
                {photoData.map((photo) => (
                    <Slide
                        media={<img src={photo.url} className={s.slider__photo}/>}
                        mediaBackgroundStyle={{ height:500 }}
                        style={{height:500}}
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
