import React from 'react'
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return <div>      
        <div className={s.content__inner}>
           <ProfileInfo/>
           <MyPosts postData={props.state.profilePage.postData} addPost={props.addPost} />
        </div>
    </div>
};

export default Profile
