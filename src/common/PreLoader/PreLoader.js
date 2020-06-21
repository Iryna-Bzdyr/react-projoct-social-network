import React from "react";
import Loader from "react-loader-spinner";
import s from './PreLoader.module.css'
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => (
    {
        root: {
            display:'flex',
            justifyContent: 'center',
            alignItems: "center",
            height: "80vh"
        }
    }))

const PreLoader = (props) => {
    const classes = useStyles(props);
    return (
        <div className={classes.root}>
            <Loader type="Bars" color="#fc03f0" height={500} width={100} secondaryColor="#2803fc"
                    timeout={3000}
            />
        </div>
    )
}

export default PreLoader
