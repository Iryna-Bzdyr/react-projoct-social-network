import React from "react";
import s from './Settings.module.css'
import UploadPhoto from "../../common/UploadPhoto/UploadPhoto";
import {useDispatch} from "react-redux";

const Settings = (props) => {
    const dispatch = useDispatch();

    return (
        <div className={s.block}>
            Settings
            <UploadPhoto display={true} backgroundColor="purple" width={800} label='Change avatar' changePhoto={()=>(console.log('Hello'))} />
        </div>
    )
}
export default Settings
