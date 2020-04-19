import React from "react";
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {setUserNavsAC} from "../../Redux/Reducer/sidebar-reducer";



let mapStateToProps = (state) =>{
    return {
        users: state.sideBar.users,
    }
}

let mapDispatchToProps = (dispatch)=>{
    return {
        getUsers: (users)=>{
            dispatch(setUserNavsAC(users))
        }
    }
}


const  NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar)
export default NavbarContainer
