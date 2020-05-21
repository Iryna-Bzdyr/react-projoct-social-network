import React from "react";
import s from "../Login/Login.module.css";
import {Field, reduxForm} from "redux-form";
import {renderFilledInput} from "../../common/MaterialForm/MaterialForm";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import validate from "../../common/Validate/Validate";
import {Redirect} from "react-router-dom";
import Container from "@material-ui/core/Container";
// import {FaInfoCircle} from "react-icons";




const RegistrationForm = (props) => {
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
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const {handleSubmit, pristine, reset, submitting, valid} = props
    return (
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
                <Field
                    name="firstName"
                    component={renderFilledInput}
                    label="First Name"
                />
                <Field
                    name="lastName"
                    component={renderFilledInput}
                    label="Last Name"
                />
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
                {props.error&&<div>{props.error}</div>}
            </div>
        </form>
    )
}

const RegistrationReduxForm = reduxForm({form: 'RegistrationForm', validate})(RegistrationForm)

const Registration = (props) => {
    const onSubmit = (submitData) => {
        props.setNewUserData(submitData.login, submitData.password, submitData.firstName, submitData.lastName)

    }

    // if (props.resultCode==1){
    //     return (
    //         <Redirect to={`/profile/${props.userID}/Photo`}  />
    //     )
    // }
    return (
        <div className={s.wrapper}>
            <Container maxWidth="sm">
                <div className={s.form__block}>
                    <div className={s.background}></div>
                    <div className={s.form}>
                        <div className={s.form__headline}> Account Sign-in</div>
                        <RegistrationReduxForm onSubmit={onSubmit}/>
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