import React from "react";
import {connect} from "react-redux";
import Registration from "./Registration";
import {setNewUserDataThunk} from "../../Redux/Reducer/registration-reducer";


class registrationAPIContainer extends React.Component{

    componentDidMount(){
    }

    setNewUserData = (login, password, firsName, lastName)=>{
        this.props.setNewUserDataThunk(login, password, firsName, lastName)
    }
    render() {
        return (
            <Registration
                setNewUserData={this.setNewUserData}
            />
        );
    }
}

let mapStateToProps= (state)=>{
    return{
    }

}

const RegistrationContainer = connect(mapStateToProps, {
    setNewUserDataThunk
})(registrationAPIContainer)

export default RegistrationContainer
