import React from "react";
import s from './AuthBlock.module.css'
import {NavLink} from "react-router-dom";
import {FiUserCheck} from "react-icons/fi";


const AuthBlock =(props)=>{
    if (!props.resultCode){
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
    // else {
    //
    //     return (
    //        <div className={s.user__block}>
    //            {/*<img src={props.userData[0].photo}/>*/}
    //        </div>
    //     )
    // }
}
export default AuthBlock
