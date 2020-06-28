import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
//
// let mapStateToProps = (state) => {
//     return {
//         resultCode:state.auth.resultCode,
//     }
// }
// export const withAuthRedirect = (Component)=>{
//
//     class RedirectComponent extends React.Component{
//         componentDidMount(){
//             let history = useHistory();
//             if (!this.props.resultCode){
//                 this.history.push("/login");
//             }
//
//         }
//         render() {
//             if (!this.props.resultCode){
//                 return (
//                     <Redirect to={`login/`}  />
//                 )
//             }
//             return <Component {...this.props}/>
//         }
//     }
//
//     const ConnectRedirectComponent = connect(mapStateToProps)(RedirectComponent)
//     return ConnectRedirectComponent
// }
export const withAuthRedirect=Component =>props=>{
    const resultCode = useSelector(state => state.auth.resultCode)
    let history = useHistory();
    useEffect(()=>{
        if(!resultCode){
            history.push("/login");
        }
    })
    return (
        !resultCode? <Redirect to={`login/`}  />:<Component {...props}/>
    )
}


