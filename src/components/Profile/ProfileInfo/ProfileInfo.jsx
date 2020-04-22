import React from "react";
import s from './ProfileInfo.module.css'
import PreLoader from "../../../common/PreLoader/PreLoader";



const ProfileInfo = (props) => {
    console.log(props)
if (props.userData.length==0){
   return <PreLoader/>
}
else {
    return (
        <div>
            <div className={s.wrapper}>
                <div className={s.background}>
                    <img src='https://i.pinimg.com/originals/a0/6d/06/a06d06c67ecb1edfeb40c5fa2995f318.jpg'/>
                    <div className={s.profile__info}>
                        <img src={props.userData[0].photo}/>
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

}


export default ProfileInfo
