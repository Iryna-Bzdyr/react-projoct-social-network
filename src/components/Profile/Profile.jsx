import React from 'react'
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";
import {Route} from "react-router-dom";
import Activity from "./Activity/Activity";
import Friends from "./Friends/Friends";
import Groups from "./Groups/Groups";
import Forums from "./Forums/Forums";
import MyPostsContainer from "./MyPosts/MyPostsConrainer";
import StoreContext from "../../StoreContext";

const Profile = (props) => {
    return <StoreContext.Consumer>
        {store=>{
            let state = store.getState()
            let navigationElement = state.profilePage.searchBar.map((pathName,index)=><SearchBar key={index} pathName={pathName.name} />)
            return (
                    <div className={s.wrapper}>
                        <div className={s.content__inner}>
                            <ProfileInfo state={props.store} />
                           <div className={s.nav__menu}>
                               <div className={s.link__wrapper}>
                                   {navigationElement}
                               </div>
                           </div>
                            <div>
                                <Route path='/profile/Activity' render={()=> <Activity/>} />
                                <Route path='/profile/MyPost' render={()=> <MyPostsContainer />} />
                                <Route path='/profile/Friends' render={()=> <Friends/>} />
                                <Route path='/profile/Groups' render={()=> <Groups/>} />
                                <Route path='/profile/Forums' render={()=> <Forums/>} />

                            </div>
                        </div>
                    </div>
            )
        }}
    </StoreContext.Consumer>
};

export default Profile
