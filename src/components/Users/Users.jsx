import React from "react";
import s from './Users.module.css'
import {NavLink} from "react-router-dom";

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pagesArray = []
    for (let i = 1; i <= pagesCount; i++) {
        pagesArray.push(i)
    }
    return (
        <div>
            <div className={s.pages__block}>
                {pagesArray.map((page, index) =>
                    <button onClick={() => props.onPageChange(page, index)}
                            className={props.currentPage === page ? s.activePage : ''}
                    >{page}</button>)
                }
            </div>
            {
                props.users.map(u =>

                        <div className={s.user__card}>
                            <div className={s.user__avatar}>
                                <NavLink to={`/profile/${u.id}/Photo`}>
                                <img src={u.photo}/>
                                </NavLink>
                                <div>
                                    {u.followed
                                        ? <button onClick={() => {
                                            props.unFollow(u.id)
                                        }} className={s.unfollow__btn}>UNFOLLOW</button>
                                        : <button onClick={() => {
                                            props.follow(u.id)
                                        }} className={s.follow__btn}>FOLLOW</button>
                                    }
                                </div>
                            </div>
                            <div className={s.user__description}>
                                <div className={s.name}>
                                    <h3>{u.fullName.firstName} {u.fullName.lastName}</h3>
                                </div>
                                <div className={s.locotion}>
                                    <p>{u.location.city}, {u.location.country}</p>
                                </div>
                                <div className={s.status}>
                                    <p>{u.status}</p>
                                </div>
                            </div>
                        </div>

                )

            }
        </div>
    )
}
export default Users
