import {citiesAPI, countryAPI} from "../../firebase";
import {toggleIsFetchingAC} from "./user-reducer";

const setCountries = 'SET-COUNTRIES'
const setCountry = 'SET-COUNTRY'
const setCities = 'SET-CITIES'
let initialState = {
    countries: [],
    cities: [],
    country:''
}

let locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case setCountries:
            return {
                ...state,
                countries: [action.countries]
            }
        case setCountry:
            return {
                ...state,
                country: action.country
            }
        case setCities:
            return {
                ...state,
                cities: [action.cities]
            }
        default:
            return state
    }
}

const setCountriesAC = (countries) => ({type: setCountries, countries: countries})
const setCitiesAC = (cities) => ({type: setCities, cities: cities})
export const setCountryAC = (country) => ({type: setCountry, cities: country})
export const setCountriesThunk = () => (dispatch) => {
    let countries = []
    let newCountries = []
    countryAPI.on('value', (snap) => {
        let countriesArray = []
        snap.forEach(u => {
            countriesArray.push(u.val())
        })
        countriesArray.map(el => {
            if (!countries.map(c => (c.country)).includes(el.country)) {
                countries.push({country: el.country})
            }
            countries.sort((a, b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0))
        })
        dispatch(setCountriesAC(countries))

    });
    if (countries.length > 0) {
        dispatch(toggleIsFetchingAC(false))
    } else {
        dispatch(toggleIsFetchingAC(true))
    }
}

export const setCitiesThunk = (country) => (dispatch) => {
    let cities = []
    citiesAPI(country).on('value', (snap) => {
        snap.forEach(u => {
            cities.push(u.val())
        })
    })
    dispatch(setCitiesAC(cities))
}

export default locationReducer

