import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setProfileDataAC, setUserStatusThunk, updateStatusThunk} from "../../Redux/Reducer/profile-reducer";
import {setUserThunk} from "../../Redux/Reducer/user-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {getIsFetching} from "../../Redux/Selectors/user-selectors";
import PreLoader from "../../common/PreLoader/PreLoader";


class ProfileContainer extends React.Component{
    componentDidMount() {
        let userID = +this.props.match.params.userID

        if(!userID){
            userID =this.props.userID
        }
        this.props.setUserThunk(userID)
        this.props.setProfileData(this.props.searchBar)
        this.props.setUserStatusThunk(userID)
    }
    render() {

        return (
            <>
            {this.props.isFetching?<PreLoader/>:<Profile searchBar={this.props.searchBar} userData={this.props.userData} currentUserId={this.props.currentUserId} userStatus={this.props.userStatus} updateStatus={this.props.updateStatusThunk}/>}
       </>
        )
    }
}
let  mapStateToProps = (state)=>{
    return {
        searchBar: state.profilePage.searchBar,
        userData: state.usersPage.users,
        currentUserId:state.usersPage.currentUserId,
        resultCode:state.auth.resultCode,
        userID:state.auth.userID,
        userStatus:state.profilePage.userStatus,
        isFetching: getIsFetching(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        setUserThunk,
        setProfileData:setProfileDataAC,
        updateStatusThunk,
        setUserStatusThunk
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)






// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
//
//
// let WithURLProfileApiContainer = withRouter(AuthRedirectComponent)
// const ProfileContainer = connect(mapStateToProps, {
//     setUserThunk,
//     setProfileData:setProfileDataAC,
// })(WithURLProfileApiContainer)
//
// export default ProfileContainer
