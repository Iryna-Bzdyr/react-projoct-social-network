import React from 'react'
import s from './Profile.module.css'
import SearchBar from "./SearchBar/SearchBar";
import {Route} from "react-router-dom";
import Activity from "./Activity/Activity";
import Friends from "./Friends/Friends";
import Groups from "./Groups/Groups";
import Forums from "./Photos/Forums";
import MyPostsContainer from "./MyPosts/MyPostsConrainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {

    let navigationElement = props.searchBar.map((pathName, index) => <SearchBar key={index}
                                                                                pathName={pathName.name}
                                                                                currentUserId={props.currentUserId}
    />)
    return (
        <div className={s.wrapper}>
            <div className={s.content__inner}>
                <ProfileInfo userData={props.userData}/>
                <div className={s.nav__menu}>
                    <div className={s.link__wrapper}>
                        {navigationElement}
                    </div>
                </div>
                <div>
                    <Route path='/profile/:id?/Activity' render={() => <Activity/>}/>
                    <Route path={`/profile/:userID?/MyPost`} render={() => <MyPostsContainer/>}/>
                    <Route path='/profile/Friends' render={() => <Friends/>}/>
                    <Route path='/profile/Groups' render={() => <Groups/>}/>
                    <Route path='/profile/Forums' render={() => <Forums/>}/>

                </div>
            </div>
        </div>
    )

};

export default Profile
