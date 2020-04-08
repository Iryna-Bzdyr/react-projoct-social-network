import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import { BrowserRouter, Route } from "react-router-dom";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import Music from "./components/Music/Music";



const App = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header />
                <Navbar />
                <div className='app-wrapper-content'>
                    <div className='content__background'>
                    </div>
                    <Route path='/dialogs' render={()=> <Dialogs DialogsData={props.state.messagesPage.DialogsData} MassageData={props.state.messagesPage.MassageData} />} />
                    <Route path='/profile' render={()=><Profile state={props.state} addPost={props.addPost} updateNewPostText={props.updateNewPostText} />} />
                    <Route path='/news' component={News} />
                    <Route path='/music' component={Music} />
                    <Route path='/settings' component={Settings} />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
