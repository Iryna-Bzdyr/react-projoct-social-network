import React, {useEffect, useState} from "react";
import s from "../Login/Login.module.css";
import {Field, reduxForm} from "redux-form";
import {
    renderAutocompleteCities,
    renderFilledInput, renderFromHelper, renderSelectField
} from "../../common/MaterialForm/MaterialForm";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import validate from "../../common/Validate/Validate";
import Container from "@material-ui/core/Container";
import {useDispatch, useSelector} from "react-redux";
import {setCitiesThunk, setCountriesThunk, setCountryAC} from "../../Redux/Reducer/location-reducer";
import {Sugar} from "react-preloaders";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import {setNewUserDataThunk} from "../../Redux/Reducer/registration-reducer";
// import {FaInfoCircle} from "react-icons";


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
    const [val, setValue] = React.useState('');

    const {handleSubmit, pristine, reset, submitting, valid} = props


    // let onChange = (country) => {
    //     if (country) {
    //         console.log(country)
    //         props.dispatch(setCitiesThunk(country))
    //         setValue(country)
    //     }
    // }
    let optionCityElement  = props.cities[0].map((city,index)=>(<option value={city.city}>{city.city}</option>))
    let onChange = (event) => {
        props.dispatch(setCitiesThunk(event.target.value))

    }
   let resetValue = ()=>{
       setValue('')
   }
    let optionCountryElement = props.countries[0].map((country,index)=>(<option value={country.country}>{country.country}</option>))
     // = props.cities.map((city,index)=>(<option value={city.city}>{city.city}</option>))
console.log(props.cities)
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
                    <Field name="country" component={renderSelectField} label="Country" onChange={onChange}>
                        {optionCountryElement}
                    </Field>

                    <Field name="city" component={renderSelectField} label="City" disabled={!props.cities}>
                        {optionCityElement}
                    </Field>

                    {/*    <div className={s.location__block}>*/}


                    {/*    <Field options={props.countries[0]} name="country" component={({*/}
                    {/*                                                                       label,*/}
                    {/*                                                                       input,*/}
                    {/*                                                                       options,*/}
                    {/*                                                                       value,*/}
                    {/*                                                                       meta: {touched, invalid, error},*/}
                    {/*                                                                       ...custom*/}
                    {/*                                                                   }) => (*/}
                    {/*        <FormControl className={s.input__area}>*/}
                    {/*            <InputLabel htmlFor={label}>{label}</InputLabel>*/}
                    {/*            <Autocomplete*/}
                    {/*                id='countrySelect'*/}
                    {/*                options={options}*/}
                    {/*                inputValue={val}*/}
                    {/*                onOpen={()=>{resetValue()}}*/}
                    {/*                onInputChange={(event, value, reason) => (onChange(value))}*/}
                    {/*                getOptionLabel={(option) => option.country}*/}
                    {/*                style={{width: 200}}*/}
                    {/*                renderInput={(params) => (*/}
                    {/*                    <TextField {...params} label={label}/>*/}

                    {/*                )}*/}
                    {/*            />*/}
                    {/*            {renderFromHelper({touched, error, label})}*/}
                    {/*        </FormControl>*/}
                    {/*    )}*/}
                    {/*    />*/}

                    {/*    <Field options={props.cities[0]} name="city" component={({*/}
                    {/*                                                                 label,*/}
                    {/*                                                                 input,*/}
                    {/*                                                                 options,*/}
                    {/*                                                                 meta: {touched, invalid, error},*/}
                    {/*                                                                 ...custom*/}
                    {/*                                                             }) => (*/}
                    {/*        <FormControl className={s.input__area}>*/}
                    {/*            <InputLabel htmlFor={label}>{label}</InputLabel>*/}
                    {/*            <Autocomplete*/}
                    {/*                id='citySelect'*/}
                    {/*                options={options}*/}
                    {/*                disabled={!props.cities[0]}*/}
                    {/*                getOptionLabel={(option) => option.city}*/}
                    {/*                style={{width: 200}}*/}
                    {/*                renderInput={(params) => <TextField {...params} label={label}/>}*/}
                    {/*            />*/}
                    {/*            {renderFromHelper({touched, error, label})}*/}
                    {/*        </FormControl>*/}
                    {/*    )}*/}
                    {/*    />*/}
                    {/*</div>*/}
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
    const isFetching = useSelector(state => state.usersPage.isFetching)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCountriesThunk())
        dispatch(setCitiesThunk('Ukraine'))
    }, [dispatch])


    const onSubmit = (submitData) => {
        debugger
        dispatch(setNewUserDataThunk((submitData.login, submitData.password, submitData.firstName, submitData.lastName, submitData.country, submitData.city)))

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
                            <RegistrationForm onSubmit={onSubmit} countries={countries} cities={cities} country={country}
                                              dispatch={dispatch}/>
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

