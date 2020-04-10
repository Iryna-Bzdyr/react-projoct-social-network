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

const Profile = (props) => {
    let navigationElement = props.state.profilePage.searchBar.map((pathName,index)=><SearchBar key={index} pathName={pathName.name} />)
    return (
        <BrowserRouter>
            <div className={s.wrapper}>
                <div className={s.content__inner}>
                    <ProfileInfo state={props.state} />
                   <div className={s.nav__menu}>
                       <div className={s.link__wrapper}>
                           {navigationElement}
                       </div>
                   </div>
                    <div>
                        <Route path='/profile/Activity' render={()=> <Activity state={props.state}/>} />
                        <Route path='/profile/MyPost' render={()=> <MyPosts state={props.state} addPost={props.addPost}  updateNewPostText={props.updateNewPostText} />} />
                        <Route path='/profile/Friends' render={()=> <Friends state={props.state}/>} />
                        <Route path='/profile/Groups' render={()=> <Groups state={props.state}/>} />
                        <Route path='/profile/Forums' render={()=> <Forums state={props.state}/>} />

                    </div>
                </div>
            </div>
        </BrowserRouter>
    )
};

export default Profile
