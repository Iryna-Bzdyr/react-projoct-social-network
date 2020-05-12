import React from "react";
import {connect} from "react-redux";
import {setUserThunk} from "../../../Redux/Reducer/user-reducer";
import AuthBlock from "./AuthBlock";

class AuthBlockAPIContainer extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <AuthBlock {...this.props}/>
        );
    }

}

let  mapStateToProps = (state)=>{
    return {
        resultCode: state.auth.resultCode,
        userData: state.auth.currentUser

    }
}

const AuthBlockContainer = connect(mapStateToProps, {
    setUserThunk
})(AuthBlockAPIContainer)

export  default  AuthBlockContainer