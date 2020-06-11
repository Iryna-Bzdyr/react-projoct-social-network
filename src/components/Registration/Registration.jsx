import React, {useEffect} from "react";
import s from "../Login/Login.module.css";
import {Field, reduxForm} from "redux-form";
import {
    renderFilledInput, renderSelectField
} from "../../common/MaterialForm/MaterialForm";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import validate from "../../common/Validate/Validate";
import Container from "@material-ui/core/Container";
import {useDispatch, useSelector} from "react-redux";
import {setCitiesThunk, setCountriesThunk} from "../../Redux/Reducer/location-reducer";
import {setNewUserDataThunk} from "../../Redux/Reducer/registration-reducer";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {Redirect} from "react-router-dom";
import PreLoader from "../../common/PreLoader/PreLoader";

let RegistrationForm = (props) => {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };
    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword}
        );
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const {handleSubmit, pristine, reset, submitting, valid} = props

    let optionCityElement = props.cities[0].map((city, index) => (<option value={city.city}>{city.city}</option>))
    let optionCountryElement = props.countries[0].map((country, index) => (
        <option value={country.country}>{country.country}</option>))


    let onChange = (event) => {
        props.dispatch(setCitiesThunk(event.target.value))
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={s.form__wrapper}>
                    <Field
                        name="email"
                        component={renderFilledInput}
                        label="Email"
                    />

                    <Field
                        name="password"
                        component={renderFilledInput}
                        label="Password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Field name="firstName" component={renderFilledInput} label="First Name"
                    />
                    <Field name="lastName" component={renderFilledInput} label="Last Name"
                    />
                    <Field name="country" component={renderSelectField} label="Country" onChange={onChange}>
                        <option value=""/>
                        {optionCountryElement}
                    </Field>

                    <Field name="city" component={renderSelectField} label="City" disabled={!props.country}>
                        <option value=""/>
                        {optionCityElement}
                    </Field>

                </div>

                <div className={s.button__area}>
                    <Button variant="contained" color="secondary" type="submit"
                            disabled={!props.valid}

                    >
                        Login
                    </Button>
                    <Button variant="contained" color="primary" type="button"
                            disabled={props.pristine}
                            onClick={props.reset}
                    >
                        Reset
                    </Button>
                </div>
                <div className={s.error__block}>
                    {props.error && <div>{props.error}</div>}
                </div>
            </form>

        </>
    )
}

RegistrationForm = reduxForm({form: 'RegistrationForm', validate})(RegistrationForm)

const Registration = (props) => {
    const countries = useSelector(state => state.location.countries)
    const cities = useSelector(state => state.location.cities)
    const country = useSelector(state => state.location.country)
    const correctRegistration = useSelector(state => state.registration.correctRegistration)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCountriesThunk())
        dispatch(setCitiesThunk('Ukraine'))

    }, [dispatch])

    const onSubmit = (submitData) => {
        dispatch(setNewUserDataThunk(submitData.email, submitData.password, submitData.firstName, submitData.lastName, submitData.country, submitData.city))
    }
    if (correctRegistration) {
        return (
            <Redirect to={`/login/`}/>
        )
    }
    return (
        countries.length <= 0 ?
            <PreLoader></PreLoader>
            : <div className={s.wrapper}>
                <Container maxWidth="sm">
                    <div className={s.form__block__registration}>
                        <div className={s.background}></div>
                        <div className={s.form}>
                            <div className={s.form__headline}> Account Sign-in</div>
                            <RegistrationForm onSubmit={onSubmit} countries={countries} cities={cities} country={country}
                                              dispatch={dispatch}/>
                        </div>
                    </div>
                </Container>
            </div>
    )
}
export default Registration

