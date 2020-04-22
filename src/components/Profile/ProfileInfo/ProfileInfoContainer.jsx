import React from "react";
import ProfileInfo from "./ProfileInfo";
import {connect} from "react-redux";
import {setUsersAC} from "../../../Redux/Reducer/user-reducer";
import database from "../../../firebase";

class ProfileInfoApiContainer extends React.Component{
    componentDidMount() {
        database.ref('database/users/').orderByChild('id').equalTo(2).on('value', (snap) => {
            let user = []
            snap.forEach(u=>{
                user.push(u.val())
            })
            this.props.setUsers(user)

        });
    }

    render() {
        return (
            <ProfileInfo usersInfo={this.props.userData}/>
        )
    }
}

let mapStateToProps=(state)=>{
    return {
        userData: state.usersPage.users
    }
}

const ProfileInfoContainer = connect(mapStateToProps, {
    setUsers: setUsersAC
})(ProfileInfoApiContainer)

export default ProfileInfoContainer