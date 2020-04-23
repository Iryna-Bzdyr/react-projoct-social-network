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
import Users from "./Users";
import PreLoader from "../../common/PreLoader/PreLoader";
import database from "../../firebase";


class UsersAPIComponent extends React.Component {
    componentDidMount() {
        this.props.setToggleFetching(true)
        database.ref('database/users/').on('value', (snap)=> {
            let count = snap.numChildren()
            this.props.setTotalUsersCount(count)
            this.props.setToggleFetching(false)
        });

        database.ref('database/users/').orderByKey().startAt(`0`).limitToFirst(this.props.pageSize).on('value', (snap) => {
            this.props.setCurrentPage(1)
            let users = []
            snap.forEach(u=>{
                users.push(u.val())
            })
            this.props.setUsers(users)
        });
    }
    onPageChange = (page, index) => {
        this.props.setToggleFetching(true)
        let startPoint = index*this.props.pageSize+1
        database.ref('database/users/').orderByKey().startAt(`${startPoint}`).limitToFirst(this.props.pageSize).on('value', (snap) => {
            let users = []
            snap.forEach(u=>{
                users.push(u.val())
            })
            this.props.setCurrentPage(page)
            this.props.setUsers(users)
            this.props.setToggleFetching(false)
        });
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

const UserContainer = connect(mapStateToProps, {
    follow: followAC,
    unFollow: unfollowAC,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    setTotalUsersCount: setTotalUsersCountAC,
    setToggleFetching: toggleIsFetchingAC
})(UsersAPIComponent)
export default UserContainer


//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unFollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPageAC(currentPage))
//         },
//         setTotalUsersCount: (totalUsers) => {
//             dispatch(setTotalUsersCountAC(totalUsers))
//         },
//         setToggleFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }