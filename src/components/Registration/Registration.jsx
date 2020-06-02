import React, {useEffect} from "react";
import s from "../Login/Login.module.css";
import {Field, reduxForm} from "redux-form";
import {
    renderAutocompleteCities,
    renderAutocompleteCountries,
    renderFilledInput
} from "../../common/MaterialForm/MaterialForm";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import validate from "../../common/Validate/Validate";
import Container from "@material-ui/core/Container";
import {connect, useDispatch, useSelector} from "react-redux";
import {setCitiesThunk, setCountriesThunk} from "../../Redux/Reducer/location-reducer";
import {Sugar} from "react-preloaders";
// import {FaInfoCircle} from "react-icons";


let RegistrationForm = (props) => {
    const dispatch = useDispatch();

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        country:'',
        showCities:false
    });

    const handleChangeCountry = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };


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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={s.form__wrapper}>
                    <Field
                        name="login"
                        component={renderFilledInput}
                        label="Login"
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
                    <div className={s.location__block}>
                        <Field options={props.countries[0]} name="country" component={renderAutocompleteCountries}
                               onChange={()=>dispatch(setCitiesThunk('Urraine'))}
                        />
                        <Field name="city" component={renderAutocompleteCities} options={props.countries[0]}

                        />
                    </div>

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
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCountriesThunk())
    }, [dispatch])

    const countries = useSelector(state => state.location.countries)
    const isFetching = useSelector(state => state.usersPage.isFetching)

    const onSubmit = (submitData) => {
        props.setNewUserData(submitData.login, submitData.password, submitData.firstName, submitData.lastName)

    }

    return (
        countries.length <= 0 ?
            <Sugar customLoading={isFetching} background="blur"/>
            : <div className={s.wrapper}>
                <Container maxWidth="sm">
                    <div className={s.form__block}>
                        <div className={s.background}></div>
                        <div className={s.form}>
                            <div className={s.form__headline}> Account Sign-in</div>
                            <RegistrationForm onSubmit={onSubmit} countries={countries}/>
                            <div className={s.defolt__user}>
                                <p className={s.block__icon}>
                                    {/*<FaInfoCircle/>*/}
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
    )
}
export default Registration
