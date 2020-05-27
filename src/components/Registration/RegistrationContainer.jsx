import React from "react";
import {connect} from "react-redux";
import Registration from "./Registration";
import {setNewUserDataThunk} from "../../Redux/Reducer/registration-reducer";
import {setCountriesThunk} from "../../Redux/Reducer/location-reducer";
import {Sugar} from "react-preloaders";


class registrationAPIContainer extends React.Component {

    componentDidMount() {
        this.props.setCountriesThunk()
    }

    setNewUserData = (login, password, firsName, lastName) => {
        this.props.setNewUserDataThunk(login, password, firsName, lastName)
    }

    render() {
        return (
            <>
                <Sugar customLoading={this.props.isFetching} background="blur"/>
               <Registration
                        setNewUserData={this.setNewUserData} countries={this.props.countries}
                        setCountries={this.props.setCountriesThunk}
                        isFetching = {this.props.isFetching}
                    />

            </>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isFetching: state.usersPage.isFetching,
        countries: state.location.countries
    }
}

const RegistrationContainer = connect(mapStateToProps, {
    setNewUserDataThunk,
    setCountriesThunk
})(registrationAPIContainer)

export default RegistrationContainer
