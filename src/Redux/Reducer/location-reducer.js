import  {countryAPI} from "../../firebase";
import {toggleIsFetchingAC} from "./user-reducer";

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

const setCountriesAC =  (countries) => ({type:setCountries, countries:countries})

export const setCountriesThunk = ()=>(dispatch)=>{
    let countries = []
    let newCountries = []
    countryAPI.on('value', (snap)=> {
        let countriesArray = []
        snap.forEach(u=>{
            countriesArray.push(u.val())
        })
        newCountries = countriesArray
       countriesArray.forEach(el=>{

               countries.push({country:el.country})

       })
        dispatch(setCountriesAC(countries))

    });
    if(countries.length>0){
        dispatch(toggleIsFetchingAC(false))
    }
    else{
        dispatch(toggleIsFetchingAC(true))
    }
}

export default locationReducer

