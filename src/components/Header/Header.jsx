import React from 'react';
import s from './Header.module.css'
import {IoIosMenu, IoIosSearch} from "react-icons/io";
import AuthBlock from "./AuthBlock/AuthBlock";



const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.logo}>
                <img src='https://mk0dunhakdisdem7bjhx.kinstacdn.com/wp-content/themes/thrive-nouveau/logo.svg'
                     alt=''></img>
            </div>
            <div className={s.content}>
                <div className={s.menu__icon}><i><IoIosMenu/></i>
                </div>
                <div className={s.input__icon}>
                    <input/>
                    <i><IoIosSearch/></i>
                </div>
               <AuthBlock/>

            </div>
        </header>
    )
}

export default Header
