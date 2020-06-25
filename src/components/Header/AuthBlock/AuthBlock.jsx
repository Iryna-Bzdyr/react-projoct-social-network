import React from "react";
import s from './AuthBlock.module.css'
import {NavLink} from "react-router-dom";
import {FiUserCheck, FiLogOut} from "react-icons/fi";
import {useSelector} from "react-redux";
import {getUserAvatar} from "../../../Redux/Reducer/user-reducer";
import Avatar from "@material-ui/core/Avatar";


const AuthBlock =(props)=>{
    const authUserID = useSelector(state => state.usersPage.currentUserId)

    if (!authUserID){
        return (
            <div className={s.button}>

                <button className={s.login__btn}><i><FiUserCheck/> </i>
                    <NavLink to='/login'>
                        Login
                    </NavLink>
                </button>

                <button className={s.sing__btn}>
                    <NavLink to='/registration'>
                        Sing up
                    </NavLink>

                    </button>
            </div>
        )
    }
    else {

        return (
            <div className={s.auth__user__block}>
                <Avatar aria-label="recipe" className={s.avatar}
                        src={getUserAvatar(authUserID)}
                >
                </Avatar>
                <button className={s.login__btn}><i><FiLogOut/> </i>
                    <NavLink to='/login'>
                        Log out
                    </NavLink>
                </button>
            </div>
        )
    }
}
export default AuthBlock
