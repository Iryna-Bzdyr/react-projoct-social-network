import React from "react";
import s from './AuthBlock.module.css'
import {NavLink, useHistory} from "react-router-dom";
import {FiUserCheck, FiLogOut} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import {getUserAvatar, setCurrentUserIdAC} from "../../../Redux/Reducer/user-reducer";
import Avatar from "@material-ui/core/Avatar";
import {setResultCodeAC} from "../../../Redux/Reducer/auth-reducer";
import {setDialogUserIDAC} from "../../../Redux/Reducer/dialogs-reducer";


const AuthBlock =(props)=>{
    const authUserID = useSelector(state => state.usersPage.currentUserId)
    let history = useHistory();
    const dispatch = useDispatch();
    let onLogOut = (id)=>{
        dispatch(setCurrentUserIdAC(id))
        dispatch(setResultCodeAC(0))
        dispatch(setDialogUserIDAC(''))
        history.push(`/login`);

    }
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
                <button className={s.login__btn} onClick={()=>onLogOut(0)}><i><FiLogOut/> </i>
                    <NavLink to='/login' >
                        Log out
                    </NavLink>
                </button>
            </div>
        )
    }
}
export default AuthBlock
