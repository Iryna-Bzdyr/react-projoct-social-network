import React from "react";
import s from './ProfileInfo.module.css'
import PreLoader from "../../../common/PreLoader/PreLoader";
import {Lines} from "react-preloaders";


const ProfileInfo = (props) => {
    if (props.userData.length == 0) {
        return <Lines background="blur"/>
    } else {
        return (
            <div>
                <div className={s.wrapper}>
                    <div className={s.background}>
                        <img src='https://i.pinimg.com/originals/a0/6d/06/a06d06c67ecb1edfeb40c5fa2995f318.jpg'/>
                        <div className={s.profile__info}>
                            <img src={props.userData[0].photo}/>
                            <div>
                                <h4>
                                    {props.userData[0].fullName.firstName} {props.userData[0].fullName.lastName}
                                </h4>
                            </div>
                            <div>
                                <span>{props.userData[0].location.city}</span>
                                <span>{props.userData[0].location.country}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default ProfileInfo
