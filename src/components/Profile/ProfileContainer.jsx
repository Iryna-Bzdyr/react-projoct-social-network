import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setProfileDataAC} from "../../Redux/Reducer/profile-reducer";
import database from "../../firebase";
import {setUsersAC} from "../../Redux/Reducer/user-reducer";


class ProfileApiContainer extends React.Component{
    componentDidMount() {
        database.ref('database/users/').orderByChild('id').equalTo(2).on('value', (snap) => {
            let user = []
            snap.forEach(u=>{
                user.push(u.val())
            })
            this.props.setUsers(user)
            this.props.setProfileData(this.props.searchBar)
        });
    }
    render() {
        return (
            <Profile searchBar={this.props.searchBar} userData={this.props.userData}/>
        )
    }
}



let  mapStateToProps = (state)=>{
    return {
        searchBar: state.profilePage.searchBar,
        userData: state.usersPage.users
    }
}

const ProfileContainer = connect(mapStateToProps, {
    setUsers: setUsersAC,
    setProfileData:setProfileDataAC

})(ProfileApiContainer)
export default ProfileContainer