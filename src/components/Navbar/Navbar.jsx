import React from 'react'
import s from './Navbar.module.css'
import {NavLink} from  'react-router-dom'
import { FaHome, FaRegNewspaper, FaUsers } from "react-icons/fa";
import { MdMessage, MdSettings } from "react-icons/md";
import {IoIosMusicalNotes} from "react-icons/io";
import MyFriends from "./MyFriends/MyFriends";
import * as axios from 'axios'

class Navbar extends React.Component{
    componentDidMount() {
        axios.get(`http://localhost:3000/users?_page=${this.props.currentPage}&_limit=${this.props.pageSize}`).then(responce => {
            this.props.getUsers(responce.data)
        })
    }
    render() {
        let friendsElement = this.props.users.map((friend, index)=><MyFriends key={index} id={friend.id}  imageUrl={friend.photo} />)
        return (
            <div className={s.nav}>
                <div >
                    <div >
                        <div className={`${s.item}`} >
                            <i className={s.home}>
                                <FaHome/>
                            </i>
                            <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
                        </div>
                        <div className={`${s.item}`}>
                            <i className={s.message}>
                                <MdMessage/>
                            </i>
                            <NavLink to='/dialogs' activeClassName={s.active}>Messages</NavLink>
                        </div>
                        <div className={`${s.item}`}>
                            <i className={s.news}>
                                <FaRegNewspaper/>
                            </i>
                            <NavLink to="/news" activeClassName={s.active}>News</NavLink>
                        </div>
                        <div className={`${s.item}`}>
                            <i className={s.music}>
                                <IoIosMusicalNotes/>
                            </i>
                            <NavLink to="/music" activeClassName={s.active}>Music</NavLink>
                        </div>
                        <div className={`${s.item}`}>
                            <i className={s.settings}>
                                <MdSettings/>
                            </i>
                            <NavLink to="/settings" activeClassName={s.active}>Settings</NavLink>
                        </div>
                        <div className={`${s.item}`}>
                            <i className={s.users}>
                                <FaUsers/>
                            </i>
                            <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
                        </div>
                    </div>
                </div>
                <div className={s.friend__block}>
                    {friendsElement}
                </div>
            </div>
        )
    }
}


export default Navbar
