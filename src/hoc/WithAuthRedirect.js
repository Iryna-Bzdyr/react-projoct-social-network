import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        resultCode:state.auth.resultCode,
    }
}
export const withAuthRedirect = (Component)=>{
    class RedirectComponent extends React.Component{
        render() {
            if (!this.props.resultCode){
                return (
                    <Redirect to={`login/`}  />
                )
            }
            return <Component {...this.props}/>
        }
    }

    const ConnectRedirectComponent = connect(mapStateToProps)(RedirectComponent)
    return ConnectRedirectComponent
}
