import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from "./Redux/redux-store";
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

let renderEntireTree = (store) => {
    ReactDOM.render(
        <React.StrictMode>
            <App  store={store}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
store.subscribe(()=>{
    renderEntireTree(store)
})

renderEntireTree(store)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
