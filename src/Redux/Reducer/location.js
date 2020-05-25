import {Query as countryAPI} from "firebase";

const setCountries = 'SET-COUNTRIES'
let initialState = {
    countries: []
}

let locationReducer = (state=initialState, action)=>{
    switch (action.type) {
        case setCountries:
            return {
                ...state,
                countries:[action.countries]
            }
        default:
            return state
    }
}

const setCountriesAC =  (countries) => ({type:setCountries, countries})

export const setCountriesThunk = ()=>(dispatch)=>{
    countryAPI.on('value', (snap)=> {
        let countries = []
        snap.forEach(u=>{
            countries.push(u.val())
        })
        dispatch(setCountriesAC(countries))
    });

}

export default locationReducer

