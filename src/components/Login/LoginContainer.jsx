import React from "react";
import {connect} from "react-redux";
import {checkLogin} from "../../Redux/Reducer/auth-reducer";
import Login from "./Login";

class userAPIContainer extends React.Component{

    componentDidMount(){
    }

   setUserLogin = (login, password, formName)=>{
       this.props.checkLogin(login, password, formName)
   }
    render() {
        return (
            <Login setUserLogin={this.setUserLogin}
                   userID={this.props.userID}
                   resultCode={this.props.resultCode}
            />
        );
    }
}

let mapStateToProps= (state)=>{
    return{
        resultCode:state.auth.resultCode,
        userID:state.auth.userID,
    }
}

const LoginContainer = connect(mapStateToProps, {
    checkLogin
})(userAPIContainer)

export default LoginContainer
