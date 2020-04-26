import React from "react";
import Users from "../Users/Users";
import {connect} from "react-redux";
import {setUserLoginAC} from "../../Redux/Reducer/auth-reducer";

class userAPIContainer extends React.Component{

    render() {
        return (
            <Users/>
        );
    }
}

let mapStateToProps= (state)=>{
    return{
        login:state.auth.login
    }
}

const UserContainer = connect(mapStateToProps, {
    setUserLogin: setUserLoginAC
})(userAPIContainer)
