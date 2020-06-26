import React, {useEffect, useState} from "react";
import s from './Users.module.css'
import {NavLink} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Pagination from "@material-ui/lab/Pagination";
import PreLoader from "../../common/PreLoader/PreLoader";
import {useDispatch, useSelector} from "react-redux";
import {
    changeUserPage, getFollowers, getUserAvatar,
    setTotalUserCount
} from "../../Redux/Reducer/user-reducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import FollowBtn from "./FollowBtn";
import *as AOS from "aos";
import "aos/dist/aos.css";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({

    bigAvatar: {
        margin: 10,
        width: 80,
        height: 80,
    },
});

const Users = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const authUserID = useSelector(state => state.usersPage.currentUserId)
    const usersData = useSelector(state => state.usersPage.users)
    // const followUsers = useSelector(state => state.usersPage.followUsers)
    const totalUserCount = useSelector(state => state.usersPage.totalUsersCount)
    let [currentPage, setCurrentPage] = useState(1)
    let [pageSize] = useState(4)
    let [pagesCount, setPagesCount] = useState(0)
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {

        dispatch(setTotalUserCount())

        if (totalUserCount) {
            setPagesCount(Math.ceil(totalUserCount / pageSize))
            dispatch(changeUserPage(currentPage, pageSize))
            // dispatch(getFollowers(authUserID))
        }
        setTimeout(() => setSpinner(false), 1000)
        AOS.init();
        AOS.refresh();
    }, [totalUserCount, currentPage])

    let onPageChange = (page) => {
        setCurrentPage(page)
    }


    return (
        spinner ? <PreLoader></PreLoader> :
            <Container maxWidth="lg">

                <div className={s.pagination__block}>
                    <Pagination count={pagesCount} color="secondary" onChange={(event, page) => onPageChange(page)}/>
                </div>

                <Container maxWidth="md" className={s.card__wrapper}>
                    {
                        usersData.map(u =>
                            <Grid container spacing={5} data-aos="fade-up" data-aos-duration="2000">
                                <Grid item xs={12}>
                                    <Paper elevation={3} className={s.user__card}>
                                        <Grid container>
                                            <Grid item xs={3}>
                                                <div className={s.user__avatar}>
                                                    <NavLink to={`/profile/${u.id}/Photo`}>
                                                        <Grid container justify="center" alignItems="center">
                                                            <Avatar aria-label="recipe"
                                                                    src={u.avatar.url}
                                                                    className={classes.bigAvatar}
                                                            >
                                                            </Avatar>
                                                        </Grid>

                                                    </NavLink>
                                                    <div>
                                                        <FollowBtn id={u.id}
                                                            // followUsers={followUsers}
                                                                   authUserID={authUserID}
                                                        >


                                                        </FollowBtn>
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


export default compose(
    withAuthRedirect
)(Users)

// export default Users
