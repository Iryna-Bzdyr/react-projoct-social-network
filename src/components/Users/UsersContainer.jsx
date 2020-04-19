import React from "react";
import s from './Users.module.css'
import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC, toggleIsFetchingAC,
    unfollowAC
} from "../../Redux/Reducer/user-reducer";
import * as axios from "axios";
import Users from "./Users";
import loaderImg from './../../assets/images/ajax-loader (1).gif'
import PreLoader from "../../common/PreLoader/PreLoader";

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        this.props.setToggleFetching(true)
        axios.get(`http://localhost:3000/users?_page=${this.props.currentPage}&_limit=${this.props.pageSize}`).then(responce => {
            this.props.setUsers(responce.data)
            let count = responce.headers["x-total-count"];
            this.props.setTotalUsersCount(count)
            this.props.setToggleFetching(false)
        })
    }

    onPageChange = (page) => {
        this.props.setCurrentPage(page)
        this.props.setToggleFetching(true)
        axios.get(`http://localhost:3000/users?_page=${page}&_limit=${this.props.pageSize}`).then(responce => {
            this.props.setUsers(responce.data)
            let count = responce.headers["x-total-count"];
            this.props.setToggleFetching(false)
        })
    }

    render() {

        return <>
            <div className={this.props.isFetching === true ? s.preLoader__block : s.preLoader__none}>
               <PreLoader/>
            </div>

            <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users} follow={this.props.follow} unFollow={this.props.unFollow}
                   onPageChange={this.onPageChange}

            />
        </>
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersCount: (totalUsers) => {
            dispatch(setTotalUsersCountAC(totalUsers))
        },
        setToggleFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }
    }
}

const UserContainer = connect(mapStateToProps, {
    follow: followAC,
    unFollow: unfollowAC,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    setTotalUsersCount: setTotalUsersCountAC,
    setToggleFetching: toggleIsFetchingAC
})(UsersAPIComponent)
export default UserContainer
