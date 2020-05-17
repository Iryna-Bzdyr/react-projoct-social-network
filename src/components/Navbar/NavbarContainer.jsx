import React from "react";
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {setUserNavsAC} from "../../Redux/Reducer/sidebar-reducer";
import database from "../../firebase";



class NavbarIPIContainer extends React.Component {
    componentDidMount() {
        // axios.get(`http://localhost:3000/users?_page=${this.props.currentPage}&_limit=${this.props.pageSize}`).then(responce => {
        //     this.props.getUsers(responce.data)
        // })
        database.ref('database/users/').on('value', (snap) => {
            let users = []
            snap.forEach(u => {
                users.push(u.val())
            })
            this.props.getUsers(users)
        });
    }
    render(){

        return(
            <Navbar users={this.props.users} userID={this.props.userID}/>
        )
    }
}



let mapStateToProps = (state) =>{
    return {
        users: state.sideBar.users,
        resultCode:state.auth.resultCode,
        userID:state.auth.userID,
    }
}

let mapDispatchToProps = (dispatch)=>{
    return {
        getUsers: (users)=>{
            dispatch(setUserNavsAC(users))
        }
    }
}


const  NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(NavbarIPIContainer)
export default NavbarContainer
