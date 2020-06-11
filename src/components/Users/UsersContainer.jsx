import React from "react";
import {connect} from "react-redux";
import {
    changeUserPage,
    followAC, getUsersThunkCreator,
    unfollowAC
} from "../../Redux/Reducer/user-reducer";
import Users from "./Users";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUsersSelector
} from "../../Redux/Selectors/user-selectors";
import PreLoader from "../../common/PreLoader/PreLoader";



class UsersComponent extends React.Component {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.pageSize, this.props.currentPage)
    }

    onPageChange = (page) => {
        this.props.changeUserPage(page, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching?
                <PreLoader></PreLoader>:
                <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.users} follow={this.props.follow} unFollow={this.props.unFollow}
                       onPageChange={this.onPageChange}
                />
            }

        </>
    }
}



let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        follow: followAC,
        unFollow: unfollowAC,
        getUsersThunkCreator,
        changeUserPage
    }),
    withAuthRedirect
)(UsersComponent)



// let mapStateToProps = (state) => {
// //     return {
// //         users: state.usersPage.users,
// //         pageSize: state.usersPage.pageSize,
// //         totalUsersCount: state.usersPage.totalUsersCount,
// //         currentPage: state.usersPage.currentPage,
// //         isFetching: state.usersPage.isFetching,
// //     }
// // }


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
