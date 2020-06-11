import React from "react";
import s from './Photo.module.css'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'

let Photo = (props) => {
    return (
        <>
            <AutoRotatingCarousel
                open={props.sliderIsOpen}
                autoplay = {props.sliderAutoplay}
                onClose={() => props.setSlider({ open: false })}
                onStart={() => props.setSlider({ open: false })}
                style={{ position: 'absolute' }}
                >
                {props.photoData.map((photo) =>(
                        <Slide
                            media={<img src={photo.url} className={s.slider__photo}/>}
                        >
                            <button onClick={() => props.setSlider({ open: false })}>Close</button>
                        </Slide>))}

            </AutoRotatingCarousel>
    
        <div className={s.root}>
            <GridList className={s.gridList} cols={4}>
                {props.photoData.map((photo) => (
                    <GridListTile key={photo.id} cols={photo.rows || 2}>
                        <img src={photo.url} onClick={() => props.setSlider({ open: true })}/>
                    </GridListTile>
                ))}
            </GridList>
        </div>
</>
    )
}

export default Photo
