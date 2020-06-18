import React, {useEffect, useState} from 'react'
import s from './Profile.module.css'
import SearchBarNavigation from "./SearchBar/SearchBarNavigation";
import {Redirect, Route} from "react-router-dom";
import Activity from "./Activity/Activity";
import Friends from "./Friends/Friends";
import Groups from "./Groups/Groups";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import Photo from "./Photos/Photo";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUserMainData} from "../../Redux/Reducer/user-reducer";
import {setCurrentUserProfileData} from "../../Redux/Reducer/profile-reducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import PreLoader from "../../common/PreLoader/PreLoader";

const Profile = (props) => {
    let paramsData = useParams();
    const dispatch = useDispatch();
    let [id, setUserID] = useState('')
    const authUserID = useSelector(state => state.usersPage.currentUserId)
    const searchBar = useSelector(state => state.profilePage.searchBar)
    const [ spinner, setSpinner ] = useState(true);

    useEffect(() => {
        if (!paramsData.userID) {
            setUserID(authUserID)
        } else {
            setUserID(+paramsData.userID)
        }
        dispatch(setCurrentUserMainData(id))
        dispatch(setCurrentUserProfileData(id))
        setTimeout(() => setSpinner(false), 1000)
    }, [id])

    let navigationElement = searchBar.map((pathName, index) => <SearchBarNavigation key={index}
                                                                                    pathName={pathName.name}
                                                                                    currentUserId={id}
    />)
    return (
        spinner ? <PreLoader></PreLoader> :
        <div className={s.wrapper}>
            <div className={s.content__inner}>
                <ProfileInfo currentUserId={id}/>
                <div className={s.nav__menu}>
                    <div className={s.link__wrapper}>
                        {navigationElement}
                    </div>
                </div>
                <div>
                    <Route path='/profile/:userID?/Activity' render={() => <Activity/>}/>
                    {/*<Route path={`/profile/:userID?/MyPost`} render={() => <MyPosts/>}/>*/}
                    <Route path='/profile/:userID?/Friends' render={() => <Friends/>}/>
                    <Route path='/profile/:userID?/Groups' render={() => <Groups/>}/>
                    <Route path='/profile/:userID?/Photo' render={() => <Photo/>}/>

                </div>
            </div>
        </div>
    )

};

export default compose(
    withAuthRedirect
)(Profile)

