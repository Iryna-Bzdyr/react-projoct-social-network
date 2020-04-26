import React from 'react';
import s from './Header.module.css'
import {IoIosMenu, IoIosSearch} from "react-icons/io";
import {FiUserCheck} from "react-icons/fi";
import {NavLink} from "react-router-dom";


const Header = () => {
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
                <div className={s.button}>

                        <button className={s.login__btn}><i><FiUserCheck/> </i>
                            <NavLink to='/login'>
                            Login
                            </NavLink>
                        </button>

                    <button className={s.sing__btn}>Sing up</button>
                </div>


            </div>
        </header>
    )
}

export default Header
