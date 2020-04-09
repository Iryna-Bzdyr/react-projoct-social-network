import React from 'react'
import s from './Navbar.module.css'
import {NavLink} from  'react-router-dom'
import { FaHome, FaRegNewspaper, FaMusic } from "react-icons/fa";
import { MdMessage, MdSettings } from "react-icons/md";
import {IoIosMusicalNotes} from "react-icons/io";


const Navbar = (props) => {
    return (

      <div className={s.nav}>
      <div >
        <div className={`${s.item}`}>
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
      </div>
    </div>
    )
}

export default Navbar