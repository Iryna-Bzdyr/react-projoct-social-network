import React, {useEffect, useState} from "react";
import s from './Users.module.css'
import {NavLink} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Pagination from "@material-ui/lab/Pagination";
import PreLoader from "../../common/PreLoader/PreLoader";

const Users = (props) => {
    let [pagesCount, setPagesCount] = useState(Math.ceil(props.totalUsersCount / props.pageSize))

    useEffect(() => {
        setPagesCount(Math.ceil(props.totalUsersCount / props.pageSize))
    }, [props.totalUsersCount])


    return (
        !pagesCount?<PreLoader></PreLoader>:
            <Container maxWidth="lg">

       <div className={s.pagination__block}>

               <Pagination count={pagesCount} color="secondary" onChange={(event, page) => props.onPageChange(page)}/>

       </div>

        <Container maxWidth="md" className={s.card__wrapper}>
            {
                props.users.map(u =>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <Paper elevation={3} className={s.user__card}>
                                <Grid container>
                                    <Grid item xs={3}>
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
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div className={s.name}>
                                            <h3>{u.fullName.firstName} {u.fullName.lastName}</h3>
                                        </div>
                                        <div className={s.locotion}>
                                            <p>{u.location.city}, {u.location.country}</p>
                                        </div>
                                        <div className={s.status}>
                                            <p>{u.status}</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                    </Grid>
                )
            }
        </Container>
    </Container>
    )
}
export default Users
