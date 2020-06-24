import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import { push } from 'react-router-redux';

let mapStateToProps = (state) => {
    return {
        resultCode:state.auth.resultCode,
    }
}

// const mapDispatchToProps = dispatch => bindActionCreators({
//     redirect: () => push('/signin')
// }, dispatch)

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


