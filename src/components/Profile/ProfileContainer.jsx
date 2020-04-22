import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setProfileDataAC} from "../../Redux/Reducer/profile-reducer";
import database from "../../firebase";
import {setCurrentUserIdAC, setUsersAC} from "../../Redux/Reducer/user-reducer";
import {withRouter} from "react-router-dom";


class ProfileApiContainer extends React.Component{

    componentDidMount() {
        console.log(this.props)
        let userID = +this.props.match.params.userID
        if(!userID){
            userID =1
        }
        database.ref('database/users/').orderByChild('id').equalTo(userID).on('value', (snap) => {
            let user = []
            snap.forEach(u=>{
                user.push(u.val())
            })
            this.props.setUsers(user)
            this.props.setCurrentUserId(userID)
            this.props.setProfileData(this.props.searchBar)
        });
    }
    render() {
        return (
            <Profile searchBar={this.props.searchBar} userData={this.props.userData} currentUserId={this.props.currentUserId}/>
        )
    }
}



let  mapStateToProps = (state)=>{
    return {
        searchBar: state.profilePage.searchBar,
        userData: state.usersPage.users,
        currentUserId:state.usersPage.currentUserId
    }
}

let WithURLProfileApiContainer = withRouter(ProfileApiContainer)
const ProfileContainer = connect(mapStateToProps, {
    setUsers: setUsersAC,
    setProfileData:setProfileDataAC,
    setCurrentUserId:setCurrentUserIdAC
})(WithURLProfileApiContainer)
export default ProfileContainer
