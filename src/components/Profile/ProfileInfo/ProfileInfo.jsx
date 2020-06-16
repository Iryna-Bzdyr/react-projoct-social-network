import React from "react";
import s from './ProfileInfo.module.css'
import Status from "./Status/Status";
import StatusWithHooks from "./Status/StatusWithHooks";
import PreLoader from "../../../common/PreLoader/PreLoader";
import {useSelector} from "react-redux";


const ProfileInfo = (props) => {
    const currentUserData = useSelector(state => state.usersPage.currentUserData)

    if (!currentUserData) {
        return <PreLoader></PreLoader>
    } else {
        return (
            <div>
                <div className={s.wrapper}>
                    <div className={s.background}>
                        <img src='https://i.pinimg.com/originals/a0/6d/06/a06d06c67ecb1edfeb40c5fa2995f318.jpg'/>
                        <div className={s.profile__info}>
                            <img src={currentUserData.avatar.url}/>
                            <div>
                                <h4>
                                    {currentUserData.fullName.firstName} {currentUserData.fullName.lastName}
                                </h4>
                            </div>
                            <div>
                                <span>{currentUserData.location.city}</span>
                                <span>{currentUserData.location.country}</span>
                            </div>
                            {/*<StatusWithHooks userStatus={props.userStatus} updateStatus={props.updateStatus} currentID={props.userData[0].id}/>*/}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default ProfileInfo
