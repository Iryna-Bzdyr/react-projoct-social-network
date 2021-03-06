import React from 'react'
import s from './Navbar.module.css'
import {NavLink, useHistory} from 'react-router-dom'
import {FaHome, FaRegNewspaper, FaUsers} from "react-icons/fa";
import {MdMessage, MdSettings} from "react-icons/md";
import {IoIosMusicalNotes} from "react-icons/io";
import MyFriends from "./MyFriends/MyFriends";
import {useSelector} from "react-redux";




const Navbar = (props) => {
    const authUserID = useSelector(state => state.usersPage.currentUserId)
    let history = useHistory();

    let onProfileClick = ()=>{
        history.push(`/profile/${authUserID}/Photo`);
    }

    return (
        <div className={s.nav}>
            <div>

                <NavLink to={`/profile/${authUserID}/Photo`} activeClassName={s.active} className={s.nav__wrapper}
                >
                    <div className={`${s.item}`} onClick={()=>onProfileClick()}>
                        <i className={s.home}>
                            <FaHome/>
                        </i>
                        <a> Profile</a>
                    </div>
                </NavLink>

                <NavLink to='/dialogs' activeClassName={s.active} className={s.nav__wrapper}>
                    <div className={`${s.item}`}>
                        <i className={s.message}>
                            <MdMessage/>
                        </i>
                        <a> Messages</a>
                    </div>
                </NavLink>


                <NavLink to={`/news/${authUserID}`} activeClassName={s.active} className={s.nav__wrapper}>
                    <div className={`${s.item}`}>
                        <i className={s.news}>
                            <FaRegNewspaper/>
                        </i>
                        <a>News</a>
                    </div>
                </NavLink>


                <NavLink to="/music" activeClassName={s.active} className={s.nav__wrapper}>
                    <div className={`${s.item}`}>
                        <i className={s.music}>
                            <IoIosMusicalNotes/>
                        </i>
                        <a>Music</a>
                    </div>
                </NavLink>

                <NavLink to="/settings" activeClassName={s.active} className={s.nav__wrapper}>
                    <div className={`${s.item}`}>
                        <i className={s.settings}>
                            <MdSettings/>
                        </i>
                        <a>Settings</a>
                    </div>
                </NavLink>


                <NavLink to="/users" activeClassName={s.active} className={s.nav__wrapper}>
                    <div className={`${s.item}`}>
                        <i className={s.users}>
                            <FaUsers/>
                        </i>
                        <a>Users</a>
                    </div>
                </NavLink>


            </div>


            <div className={s.friend__block}>
                <MyFriends/>
            </div>
        </div>
    )
}


export default Navbar
