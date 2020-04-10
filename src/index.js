import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import state from "./Redux/state";
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {addMessage, addPost, updateNewMessageText, updateNewPostText} from "./Redux/state";

export  let renderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App  state={state} addPost={addPost} updateNewPostText={updateNewPostText}  addMessage={addMessage} updateNewMessageText={updateNewMessageText}  />
        </React.StrictMode>,
        document.getElementById('root')
    );

}

renderEntireTree(state)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
