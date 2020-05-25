import React from 'react'
import s from './Profile.module.css'
import SearchBarNavigation from "./SearchBar/SearchBarNavigation";
import {Redirect, Route} from "react-router-dom";
import Activity from "./Activity/Activity";
import Friends from "./Friends/Friends";
import Groups from "./Groups/Groups";
import MyPostsContainer from "./MyPosts/MyPostsConrainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PhotoContainer from "./Photos/PhotoContainer";

const Profile = (props) => {

    let navigationElement = props.searchBar.map((pathName, index) => <SearchBarNavigation key={index}
                                                                                          pathName={pathName.name}
                                                                                          currentUserId={props.currentUserId}
    />)
    return (
        <div className={s.wrapper}>
            <div className={s.content__inner}>
                <ProfileInfo userData={props.userData} userStatus={props.userStatus} updateStatus={props.updateStatus}/>
                <div className={s.nav__menu}>
                    <div className={s.link__wrapper}>
                        {navigationElement}
                    </div>
                </div>
                <div>
                    <Route path='/profile/:userID?/Activity' render={() => <Activity/>}/>
                    <Route path={`/profile/:userID?/MyPost`} render={() => <MyPostsContainer/>}/>
                    <Route path='/profile/:userID?/Friends' render={() => <Friends/>}/>
                    <Route path='/profile/:userID?/Groups' render={() => <Groups/>}/>
                    <Route path='/profile/:userID?/Photo' render={() => <PhotoContainer/>}/>

                </div>
            </div>
        </div>
    )

};

export default Profile
