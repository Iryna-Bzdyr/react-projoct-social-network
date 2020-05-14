import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setProfileDataAC} from "../../Redux/Reducer/profile-reducer";
import {setUserThunk} from "../../Redux/Reducer/user-reducer";
import {Redirect, withRouter} from "react-router-dom";


class ProfileApiContainer extends React.Component{
    componentDidMount() {
        let userID = +this.props.match.params.userID
        console.log(this.props.match.params)
        if(!userID){
            userID =1
        }
        this.props.setUserThunk(userID)
        this.props.setProfileData(this.props.searchBar)
    }
    render() {
        if (!this.props.resultCode){
            return (
                <Redirect to={`login/`}  />
            )
        }
        return (
            <Profile searchBar={this.props.searchBar} userData={this.props.userData} currentUserId={this.props.currentUserId}/>
        )
    }
}



let  mapStateToProps = (state)=>{
    return {
        searchBar: state.profilePage.searchBar,
        userData: state.usersPage.users,
        currentUserId:state.usersPage.currentUserId,
        resultCode:state.auth.resultCode,
    }
}

let WithURLProfileApiContainer = withRouter(ProfileApiContainer)
const ProfileContainer = connect(mapStateToProps, {
    setUserThunk,
    setProfileData:setProfileDataAC,
})(WithURLProfileApiContainer)
export default ProfileContainer
