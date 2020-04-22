import React from "react";
import s from './ProfileInfo.module.css'



const ProfileInfo = (props) => {

    return (
        <div>
            <div className={s.wrapper}>
                <div className={s.background}>
                    <img src='https://i.pinimg.com/originals/a0/6d/06/a06d06c67ecb1edfeb40c5fa2995f318.jpg'/>
                    <div className={s.profile__info}>
                        {/*<img src={props.usersInfo[0].photo}/>*/}
                        <div>
                            <h4>
                                justin timberlake
                            </h4>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default ProfileInfo