import React from 'react'
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
console.log(s);
const Profile = () => {
    return <div>
        <div className={s.content__background}>

        </div>
        <div className={s.content__inner}>
            <div>
                ava+description
            </div>
           <MyPosts/>
        </div>
    </div>
};

export default Profile