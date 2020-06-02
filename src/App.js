import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Route } from "react-router-dom";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import UserContainer from "./components/Users/UsersContainer";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";



const App = (props) => {
    return (
            <div className='app-wrapper'>
                <Header />
                <NavbarContainer/>

                <div className='app-wrapper-content'>
                    <Route path='/login' render={()=> <Login/>} />
                    <Route path='/registration' render={()=> <Registration/>} />
                    <Route path='/dialogs' render={()=> <DialogsContainer/>} />
                    <Route path='/profile/:userID?' render={()=><ProfileContainer/>} />
                    <Route path='/news' component={News} />
                    <Route path='/music' component={Music} />
                    <Route path='/settings' component={Settings} />
                    <Route path='/users' render={()=><UserContainer/>}/>
                </div>
            </div>
    );
}
export default App;
