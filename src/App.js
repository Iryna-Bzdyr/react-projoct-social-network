import React, {useEffect, useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import {Route} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import Profile from "./components/Profile/Profile";
import PreLoader from "./common/PreLoader/PreLoader";
import Dialogs from "./components/Dialogs/Dialogs";
import {ConfirmProvider} from "material-ui-confirm";


const App = (props) => {
    const [spinner, setSpinner] = useState(true);
    useEffect(() => {
        setTimeout(() => setSpinner(false), 2000)
    }, []);

    return (
        <ConfirmProvider>
            <div className='app-wrapper'>
                <PreLoader display={spinner}></PreLoader>
                <Header/>
                <NavbarContainer/>

                <div className='app-wrapper-content'>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/registration' render={() => <Registration/>}/>
                    <Route path='/dialogs' render={() => <Dialogs/>}/>
                    <Route path='/profile/:userID?' render={() => <Profile/>}/>
                    <Route path='/news:userID?' render={() => <News/>}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/users' render={() => <Users/>}/>
                </div>
            </div>
        </ConfirmProvider>
    );
}
export default App;
