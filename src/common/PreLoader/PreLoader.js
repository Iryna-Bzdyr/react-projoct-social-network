import React from "react";
import Loader from "react-loader-spinner";
import s from './PreLoader.module.css'

const PreLoader = (props)=>{
    return (
        <div className={s.spinner}>
            <Loader
                type="Bars" color="#fc03f0" height={100} width={100} secondaryColor="#2803fc"
            />
        </div>
    )
}

export default PreLoader
