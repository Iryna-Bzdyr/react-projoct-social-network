import React, {useEffect, useState} from "react";
import s from './Users.module.css'
import {NavLink} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Pagination from "@material-ui/lab/Pagination";
import PreLoader from "../../common/PreLoader/PreLoader";
import {useDispatch, useSelector} from "react-redux";
import { getUsersThunkCreator, setTotalUserCount} from "../../Redux/Reducer/user-reducer";

const Users = (props) => {
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.usersPage.users)
    const totalUserCount = useSelector(state => state.usersPage.totalUsersCount)
    let [pageSize,setpageSize]=useState(2)
    let [currentPage, setCurrentPage]=useState(1)
    let [pagesCount, setPagesCount] = useState(0)

    useEffect(() => {
        dispatch(getUsersThunkCreator(pageSize, currentPage))
        dispatch(setTotalUserCount())
       if (totalUserCount){
           setPagesCount(Math.ceil(totalUserCount / pageSize))
       }
    }, [totalUserCount, pageSize, dispatch])

    let onPageChange = (page) =>{
        // dispatch(changeUserPage(page,pageSize))
    }

    return (
        !pagesCount?<PreLoader></PreLoader>:
            <Container maxWidth="lg">

       <div className={s.pagination__block}>

               <Pagination count={pagesCount} color="secondary" onChange={(event, page) => onPageChange(`${page}`)}/>

       </div>

        <Container maxWidth="md" className={s.card__wrapper}>
            {
                usersData.map(u =>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <Paper elevation={3} className={s.user__card}>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <div className={s.user__avatar}>
                                            <NavLink to={`/profile/${u.id}/Photo`}>
                                                <img src={u.avatar.url}/>
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
