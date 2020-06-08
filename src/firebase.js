import * as firebase from 'firebase'
import firestore from 'firebase/firestore'

export const config = {
    apiKey: "AIzaSyBIsTbTS3lfVW9in5zxYq2oqvYF2S_bhN8",
    authDomain: "react-social-network-a5dc0.firebaseapp.com",
    databaseURL: "https://react-social-network-a5dc0.firebaseio.com",
    projectId: "react-social-network-a5dc0",
    storageBucket: "react-social-network-a5dc0.appspot.com",
    messagingSenderId: "403301898250",
    appId: "1:403301898250:web:9409a7e449fdcdd3e7e7f3"
};


const fire = firebase.initializeApp(config);

const database = fire.database();
export const usersAPI =  database.ref('database/users/')
export const profileAPI =  database.ref('database/profile/')
export const userLogin = database.ref('database/loginData/')
export const countryAPI =  database.ref('citiesData/')
export const userAPI = (id)=>{
    return (
     usersAPI.orderByChild('id').equalTo(id)
    )
}

export const currentUserAPI = (id) => {
    return (
        database.ref(`database/users/${id}`)
    )
}

export const citiesAPI = (country) => {
    return (
        countryAPI.orderByChild('country').equalTo(country)
    )
}

export default database;
