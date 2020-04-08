import React from 'react'
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return <div>      
        <div className={s.content__inner}>
           <ProfileInfo/>
           <MyPosts state={props.state} addPost={props.addPost}  updateNewPostText={props.updateNewPostText} />
        </div>
    </div>
};

export default Profile
