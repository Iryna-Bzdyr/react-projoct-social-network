import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {addPost, updateNewPostText} from "./Redux/state";

export  let renderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App  state={state} addPost={addPost} updateNewPostText={updateNewPostText} />
        </React.StrictMode>,
        document.getElementById('root')
    );

}

