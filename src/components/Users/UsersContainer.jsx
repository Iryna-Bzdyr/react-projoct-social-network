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

    render() {
        return <>
                <PreLoader></PreLoader>:
                <Users
                />
            }

        </>
    }
}


export default compose(
    withAuthRedirect
)(UsersComponent)



