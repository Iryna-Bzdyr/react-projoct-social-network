import React from "react";
import s from './Photo.module.css'

let Photo = (props)=>{
console.log(props)
    let photoElement = props.photoData.map(photo=><img src={photo.url}/>)

    return (
        <div className={s.photo__wrapper}>
            {
                photoElement
            }
        </div>
    )
}

export default Photo