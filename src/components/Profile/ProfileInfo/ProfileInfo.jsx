import React from "react";
import s from './ProfileInfo.module.css'


const ProfileInfo = (props) => {
    return (
        <div>
            <div className={s.wrapper}>
                <div className={s.background}>
                    <img src='https://i.pinimg.com/originals/a0/6d/06/a06d06c67ecb1edfeb40c5fa2995f318.jpg'/>
                </div>
                <div className={s.profile__info}>
                    <img src='https://mvclip.ru/content/images/artists/1/5327124a3ee946e2a6ebcd9b1f9164f4.jpg '/>
                    <div>
                        <h4>
                            justin timberlake
                        </h4>
                    </div>
                </div>
                <div className={s.navigation}></div>
            </div>
        </div>
    )
}
export default ProfileInfo