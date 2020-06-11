import React, {useEffect} from "react";
import s from './Login.module.css'
import Container from '@material-ui/core/Container';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {FaInfoCircle} from "react-icons/fa";
import {Field, reduxForm} from "redux-form";
import validate from '../../common/Validate/Validate'
import {Link, Redirect} from "react-router-dom";
import {renderFilledInput} from "../../common/MaterialForm/MaterialForm";
import {useDispatch, useSelector} from "react-redux";
import {checkLogin} from "../../Redux/Reducer/auth-reducer";
import {checkRegistrationAC} from "../../Redux/Reducer/registration-reducer";



const LoginForm = (props) => {
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

const LoginReduxForm = reduxForm({form: 'LoginForm', validate})(LoginForm)


const Login = (props) => {
    const dispatch = useDispatch();
    const resultCode = useSelector(state => state.auth.resultCode)
    const userID = useSelector(state => state.auth.userID)

    useEffect(()=>{
        dispatch(checkRegistrationAC(false))
    })
    const onSubmit = (submitData) => {
        dispatch(checkLogin(submitData.login, submitData.password, 'LoginForm'))
}

if (resultCode==1){
    return (
        <Redirect to={`/profile/${userID}/Photo`}  />
    )
}
    return (
        <div className={s.wrapper}>
            <Container maxWidth="sm">
                <div className={s.form__block}>
                    <div className={s.background}></div>
                    <div className={s.form}>
                        <div className={s.form__headline}> Account Sign-in</div>
                        <LoginReduxForm onSubmit={onSubmit}/>
                        <div className={s.defolt__user}>
                            <p className={s.block__icon}>
                                <FaInfoCircle/>
                            </p>

                            <p>
                                Use the following credentials to log-in as user:
                                login: <span>b.pitt@gmail.com</span> password: <span>bpitt1234</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default Login
