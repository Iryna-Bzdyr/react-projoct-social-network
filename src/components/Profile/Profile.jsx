import React from 'react'
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";
import {BrowserRouter, Route} from "react-router-dom";
import Dialogs from "../Dialogs/Dialogs";
import Activity from "./Activity/Activity";
import Friends from "./Friends/Friends";
import Groups from "./Groups/Groups";
import Forums from "./Forums/Forums";
import MyPostsContainer from "./MyPosts/MyPostsConrainer";

const Profile = (props) => {
    let state = props.store.getState()
    let navigationElement = state.profilePage.searchBar.map((pathName,index)=><SearchBar key={index} pathName={pathName.name} />)
    return (
        <BrowserRouter>
            <div className={s.wrapper}>
                <div className={s.content__inner}>
                    <ProfileInfo state={props.store} />
                   <div className={s.nav__menu}>
                       <div className={s.link__wrapper}>
                           {navigationElement}
                       </div>
                   </div>
                    <div>
                        <Route path='/profile/Activity' render={()=> <Activity state={props.store}/>} />
                        <Route path='/profile/MyPost' render={()=> <MyPostsContainer store={props.store} />} />
                        <Route path='/profile/Friends' render={()=> <Friends state={props.store}/>} />
                        <Route path='/profile/Groups' render={()=> <Groups state={props.store}/>} />
                        <Route path='/profile/Forums' render={()=> <Forums state={props.store}/>} />

                    </div>
                </div>
            </div>
        </BrowserRouter>
    )
};

export default Profile
