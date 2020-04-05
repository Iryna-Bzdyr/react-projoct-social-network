import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


let DialogsData = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item 3'},
    {id: 4, name: 'Item 4'},
    {id: 5, name: 'Item 5'}
]


let MassageData = [
    {id: 1, text: 'Hello'},
    {id: 2, text: 'How are you'},
    {id: 3, text: 'What time is it'},
]


let postData = [
    {id:1, post:'Hi. how are you', likesCount:12},
    {id:2, post:'It"s my first post', likesCount:35}
]

ReactDOM.render(
  <React.StrictMode>
    <App DialogsData={DialogsData} MassageData={MassageData} postData={postData} />
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
